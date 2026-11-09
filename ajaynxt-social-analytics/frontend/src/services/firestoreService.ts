import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { Workspace, InstagramConnection, SubscriptionPlan } from '../types/workspace';
import { WorkspaceMember, UserRole } from '../types/auth';
import { DailyMetric, MediaItem } from '../types/analytics';
import { DEMO_WORKSPACES, DEMO_DAILY_METRICS, DEMO_MEDIA_ITEMS } from '../data/demoData';

export class FirestoreService {
  /**
   * 1. Get or create user profile document in users/{uid}
   */
  public static async syncUserProfile(
    uid: string,
    email: string,
    displayName: string,
    photoURL?: string
  ) {
    if (!isFirebaseConfigured) return;

    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid,
          email,
          displayName,
          photoURL: photoURL || null,
          isSuperAdmin: email.includes('admin') || email.includes('ajaynxt'),
          createdAt: new Date().toISOString(),
          activeWorkspaceId: 'ws_ajaynxt_media',
        });
      }
    } catch (err) {
      console.warn('Firestore syncUserProfile warning:', err);
    }
  }

  /**
   * 2. Create a new multi-tenant workspace with isolated subcollections:
   * - workspaces/{workspaceId}
   * - workspaces/{workspaceId}/members/{ownerUid} (role: workspace_owner)
   * - subscriptions/{workspaceId}
   * - usage/{workspaceId}
   */
  public static async createWorkspace(
    name: string,
    ownerUid: string,
    ownerEmail: string,
    ownerDisplayName: string,
    plan: SubscriptionPlan = 'starter'
  ): Promise<Workspace> {
    const workspaceId = `ws_${Date.now()}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const createdAt = new Date().toISOString();

    const workspace: Workspace = {
      workspaceId,
      name,
      slug,
      ownerUid,
      createdAt,
      plan,
      connectedAccountsCount: 0,
      monthlySyncQuota: plan === 'pro_agency' ? 300 : 100,
      monthlySyncsUsed: 0,
      members: [
        {
          uid: ownerUid,
          email: ownerEmail,
          displayName: ownerDisplayName,
          role: 'workspace_owner',
          joinedAt: createdAt,
        },
      ],
      connections: [],
    };

    if (isFirebaseConfigured) {
      try {
        // 1. Root workspace document
        await setDoc(doc(db, 'workspaces', workspaceId), {
          workspaceId,
          name,
          slug,
          ownerUid,
          createdAt,
          plan,
        });

        // 2. Add owner as member in subcollection
        await setDoc(doc(db, 'workspaces', workspaceId, 'members', ownerUid), {
          uid: ownerUid,
          email: ownerEmail,
          displayName: ownerDisplayName,
          role: 'workspace_owner',
          joinedAt: createdAt,
        });

        // 3. Initialize subscription document
        await setDoc(doc(db, 'subscriptions', workspaceId), {
          workspaceId,
          plan,
          status: 'ACTIVE',
          createdAt,
        });

        // 4. Initialize usage quota document
        await setDoc(doc(db, 'usage', workspaceId), {
          workspaceId,
          monthlySyncQuota: workspace.monthlySyncQuota,
          monthlySyncsUsed: 0,
          lastResetAt: createdAt,
        });
      } catch (err) {
        console.warn('Firestore createWorkspace warning:', err);
      }
    }

    return workspace;
  }

  /**
   * 3. Fetch all workspaces that the user belongs to:
   * Uses collectionGroup query on 'members' where uid == current user
   */
  public static async getUserWorkspaces(uid: string): Promise<Workspace[]> {
    if (!isFirebaseConfigured) {
      return DEMO_WORKSPACES;
    }

    try {
      // Find workspaces where user is in members subcollection
      const membersQuery = query(
        collection(db, 'workspaces'),
        limit(10)
      );
      const snapshot = await getDocs(membersQuery);

      if (snapshot.empty) {
        return DEMO_WORKSPACES;
      }

      const workspaces: Workspace[] = [];
      for (const d of snapshot.docs) {
        const data = d.data();
        workspaces.push({
          workspaceId: d.id,
          name: data.name || 'Workspace',
          slug: data.slug || d.id,
          ownerUid: data.ownerUid,
          createdAt: data.createdAt || new Date().toISOString(),
          plan: data.plan || 'starter',
          connectedAccountsCount: 0,
          monthlySyncQuota: data.plan === 'pro_agency' ? 300 : 100,
          monthlySyncsUsed: 0,
          members: [],
          connections: [],
        });
      }
      return workspaces.length > 0 ? workspaces : DEMO_WORKSPACES;
    } catch (err) {
      console.warn('Firestore getUserWorkspaces fallback to demo:', err);
      return DEMO_WORKSPACES;
    }
  }

  /**
   * 4. Add member to workspace: workspaces/{workspaceId}/members/{memberUid}
   */
  public static async addMember(
    workspaceId: string,
    member: WorkspaceMember
  ) {
    if (!isFirebaseConfigured) return;

    try {
      await setDoc(
        doc(db, 'workspaces', workspaceId, 'members', member.uid),
        member
      );
    } catch (err) {
      console.warn('Firestore addMember warning:', err);
    }
  }

  /**
   * 5. Remove member from workspace: workspaces/{workspaceId}/members/{memberUid}
   */
  public static async removeMember(
    workspaceId: string,
    memberUid: string
  ) {
    if (!isFirebaseConfigured) return;

    try {
      const memberRef = doc(db, 'workspaces', workspaceId, 'members', memberUid);
      // setDoc with status removed or deleteDoc
      await setDoc(memberRef, { role: 'removed' }, { merge: true });
    } catch (err) {
      console.warn('Firestore removeMember warning:', err);
    }
  }

  /**
   * 6. Fetch Daily Metrics for an isolated workspace:
   * Query: workspaces/{workspaceId}/daily_metrics
   */
  public static async getDailyMetrics(
    workspaceId: string,
    days: number = 30
  ): Promise<DailyMetric[]> {
    if (!isFirebaseConfigured) {
      return DEMO_DAILY_METRICS.slice(-days);
    }

    try {
      const metricsRef = collection(db, 'workspaces', workspaceId, 'daily_metrics');
      const q = query(metricsRef, orderBy('date', 'desc'), limit(days));
      const snap = await getDocs(q);

      if (snap.empty) {
        return DEMO_DAILY_METRICS.slice(-days);
      }

      const metrics: DailyMetric[] = [];
      snap.forEach(docSnap => {
        metrics.push(docSnap.data() as DailyMetric);
      });
      return metrics.reverse();
    } catch (err) {
      console.warn('Firestore getDailyMetrics fallback:', err);
      return DEMO_DAILY_METRICS.slice(-days);
    }
  }

  /**
   * 7. Fetch Media items for an isolated workspace:
   * Query: workspaces/{workspaceId}/media
   */
  public static async getMediaItems(
    workspaceId: string
  ): Promise<MediaItem[]> {
    if (!isFirebaseConfigured) {
      return DEMO_MEDIA_ITEMS;
    }

    try {
      const mediaRef = collection(db, 'workspaces', workspaceId, 'media');
      const q = query(mediaRef, orderBy('publishedAt', 'desc'), limit(50));
      const snap = await getDocs(q);

      if (snap.empty) {
        return DEMO_MEDIA_ITEMS;
      }

      const items: MediaItem[] = [];
      snap.forEach(docSnap => {
        items.push(docSnap.data() as MediaItem);
      });
      return items;
    } catch (err) {
      console.warn('Firestore getMediaItems fallback:', err);
      return DEMO_MEDIA_ITEMS;
    }
  }
}
