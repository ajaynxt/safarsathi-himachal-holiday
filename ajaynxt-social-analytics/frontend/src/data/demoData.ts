import { DailyMetric, MediaItem, AccountOverviewMetrics, ContentSummaryMetrics } from '../types/analytics';
import { Workspace } from '../types/workspace';
import { PlatformStats, AuditLogEntry } from '../types/admin';

// Helper to generate 90 days of realistic daily metrics
function generate90DaysData(): DailyMetric[] {
  const data: DailyMetric[] = [];
  const baseFollowers = 48500;
  let currentFollowers = baseFollowers;
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Day of week factor (weekends see higher engagement)
    const dayOfWeek = d.getDay();
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.35 : 1.0;

    // Simulate occasional viral post spikes on days 12, 38, 71
    const isSpike = i === 12 || i === 38 || i === 71;
    const spikeMultiplier = isSpike ? 2.8 : 1.0;

    const followersGained = Math.floor((35 + Math.sin(i / 5) * 15 + Math.random() * 20) * spikeMultiplier);
    const followersLost = Math.floor(8 + Math.random() * 8);
    const netFollowers = followersGained - followersLost;
    currentFollowers += netFollowers;

    const reach = Math.floor((4800 + Math.sin(i / 4) * 1200 + Math.random() * 800) * weekendMultiplier * spikeMultiplier);
    const views = Math.floor(reach * (1.6 + Math.random() * 0.4)); // views are impressions/plays
    const accountsEngaged = Math.floor(reach * (0.07 + Math.random() * 0.03));
    
    const likes = Math.floor(accountsEngaged * (0.65 + Math.random() * 0.15));
    const comments = Math.floor(likes * (0.08 + Math.random() * 0.04));
    const saves = Math.floor(likes * (0.18 + Math.random() * 0.06));
    const shares = Math.floor(likes * (0.12 + Math.random() * 0.08));
    const totalInteractions = likes + comments + saves + shares;
    
    const engagementRate = Number(((totalInteractions / reach) * 100).toFixed(2));

    data.push({
      date: dateStr,
      totalFollowers: currentFollowers,
      followersGained,
      followersLost,
      netFollowers,
      following: 842,
      reach,
      views,
      accountsEngaged,
      totalInteractions,
      likes,
      comments,
      saves,
      shares,
      engagementRate,
    });
  }

  return data;
}

export const DEMO_DAILY_METRICS: DailyMetric[] = generate90DaysData();

export const DEMO_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'ig_media_101',
    caption: 'Sunset over Rohtang Pass 🏔️ The golden hour hits differently at 13,058 ft. Which mountain pass is on your 2026 bucket list? #Himalayas #Rohtang #TravelIndia #MountainVibes',
    mediaType: 'REEL',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    permalink: 'https://instagram.com/p/C9x81_vR',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    reach: 48920,
    views: 82400,
    likes: 4120,
    comments: 298,
    saves: 1450,
    shares: 980,
    engagementRate: 13.98,
    durationSeconds: 28,
  },
  {
    id: 'ig_media_102',
    caption: '5 Essential packing tips for high altitude trekking in Spiti Valley. Save this carousel for your upcoming expedition! 🎒🥾 Swipe left for gear checklist. #SpitiValley #TrekkingTips #AdventureGuide',
    mediaType: 'CAROUSEL',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
    permalink: 'https://instagram.com/p/C8y29_tM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
    reach: 34200,
    views: 49100,
    likes: 2480,
    comments: 174,
    saves: 2190,
    shares: 640,
    engagementRate: 16.03,
  },
  {
    id: 'ig_media_103',
    caption: 'Morning mist swirling around the cedar forests of Manali. Nature’s quiet luxury. 🌲☕ #Manali #HimachalDiaries #NatureLovers #IncredibleIndia',
    mediaType: 'POST',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 68).toISOString(),
    permalink: 'https://instagram.com/p/C7z12_kN',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    reach: 22100,
    views: 31200,
    likes: 1840,
    comments: 89,
    saves: 610,
    shares: 230,
    engagementRate: 12.53,
  },
  {
    id: 'ig_media_104',
    caption: 'Behind the scenes: Scouting fresh offbeat homestays in Tirthan Valley! Rivers, fresh trout and pure peace. 🏡✨ #TirthanValley #OffbeatTravel #Homestays',
    mediaType: 'REEL',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 110).toISOString(),
    permalink: 'https://instagram.com/p/C6a04_pL',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    reach: 61400,
    views: 114500,
    likes: 5630,
    comments: 412,
    saves: 2980,
    shares: 1820,
    engagementRate: 17.65,
    durationSeconds: 45,
  },
  {
    id: 'ig_media_105',
    caption: 'Quick poll: Sunrise over Kangra Valley or Stargazing at Chandratal? Tap your vote in our story highlights! 🌌☀️',
    mediaType: 'STORY',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    permalink: 'https://instagram.com/stories/ajaynxt.official/38917264',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    reach: 8450,
    views: 9200,
    likes: 310,
    comments: 42,
    saves: 15,
    shares: 88,
    engagementRate: 5.38,
  },
  {
    id: 'ig_media_106',
    caption: 'Traditional Himachali architecture: The ancient Kath-Kuni wood and stone temples of Naggar. Craftsmanship that has stood for over 500 years. 🏛️ #HeritageArchitecture #Naggar #History',
    mediaType: 'POST',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 160).toISOString(),
    permalink: 'https://instagram.com/p/C5b38_wQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80',
    reach: 19400,
    views: 26800,
    likes: 1420,
    comments: 65,
    saves: 530,
    shares: 140,
    engagementRate: 11.11,
  },
  {
    id: 'ig_media_107',
    caption: 'Drone hyperlapse: Driving through the iconic Atal Tunnel towards the Lahaul plateau. Engineering marvel amidst eternal snow. ❄️🚗 #AtalTunnel #Lahaul #DroneVideo',
    mediaType: 'REEL',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 210).toISOString(),
    permalink: 'https://instagram.com/p/C4c79_zS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&auto=format&fit=crop&q=80',
    reach: 78900,
    views: 148200,
    likes: 7210,
    comments: 540,
    saves: 3840,
    shares: 2450,
    engagementRate: 17.79,
    durationSeconds: 32,
  },
  {
    id: 'ig_media_108',
    caption: 'Autumn colours in Kinnaur apple orchards 🍎🍁 Swipe to see the harvest season in full bloom! #Kinnaur #AppleHarvest #AutumnInHimalayas',
    mediaType: 'CAROUSEL',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 280).toISOString(),
    permalink: 'https://instagram.com/p/C3d10_xT',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=80',
    reach: 28400,
    views: 39500,
    likes: 2150,
    comments: 112,
    saves: 940,
    shares: 310,
    engagementRate: 12.36,
  }
];

export const DEMO_WORKSPACES: Workspace[] = [
  {
    workspaceId: 'ws_ajaynxt_media',
    name: 'AJAYNXT Creative Media',
    slug: 'ajaynxt-media',
    ownerUid: 'usr_ajay_001',
    createdAt: '2026-01-15T10:00:00Z',
    plan: 'pro_agency',
    connectedAccountsCount: 2,
    monthlySyncQuota: 300,
    monthlySyncsUsed: 42,
    members: [
      {
        uid: 'usr_ajay_001',
        email: 'ajay@ajaynxt.com',
        displayName: 'Ajay Sharma',
        role: 'workspace_owner',
        joinedAt: '2026-01-15T10:00:00Z',
      },
      {
        uid: 'usr_priya_002',
        email: 'priya.s@ajaynxt.com',
        displayName: 'Priya Sen',
        role: 'workspace_admin',
        joinedAt: '2026-01-20T14:30:00Z',
      },
      {
        uid: 'usr_rohit_003',
        email: 'rohit.k@ajaynxt.com',
        displayName: 'Rohit Kumar',
        role: 'workspace_member',
        joinedAt: '2026-02-01T09:15:00Z',
      }
    ],
    connections: [
      {
        connectionId: 'conn_ig_01',
        instagramUserId: '17841405829103982',
        username: 'ajaynxt.creative',
        name: 'AJAYNXT Studios & Design',
        profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        accountType: 'BUSINESS',
        facebookPageId: '109283746592019',
        facebookPageName: 'AJAYNXT Studios Official',
        connectedAt: '2026-02-10T12:00:00Z',
        lastSyncedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
        tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 52).toISOString(),
        status: 'ACTIVE',
        scopes: ['instagram_basic', 'instagram_manage_insights', 'pages_show_list', 'pages_read_engagement'],
      },
      {
        connectionId: 'conn_ig_02',
        instagramUserId: '17841409283746194',
        username: 'ajay.dev.insights',
        name: 'Ajay Dev & Architecture',
        profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        accountType: 'CREATOR',
        facebookPageId: '109283746592020',
        facebookPageName: 'Ajay Tech Channel',
        connectedAt: '2026-02-18T16:20:00Z',
        lastSyncedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 48).toISOString(),
        status: 'ACTIVE',
        scopes: ['instagram_basic', 'instagram_manage_insights'],
      }
    ]
  },
  {
    workspaceId: 'ws_himachal_tours',
    name: 'Himachal Heritage Luxury Tours',
    slug: 'himachal-heritage',
    ownerUid: 'usr_ajay_001',
    createdAt: '2026-02-05T08:00:00Z',
    plan: 'starter',
    connectedAccountsCount: 1,
    monthlySyncQuota: 100,
    monthlySyncsUsed: 19,
    members: [
      {
        uid: 'usr_ajay_001',
        email: 'ajay@ajaynxt.com',
        displayName: 'Ajay Sharma',
        role: 'workspace_owner',
        joinedAt: '2026-02-05T08:00:00Z',
      },
      {
        uid: 'usr_neha_004',
        email: 'neha.guide@himachaltours.in',
        displayName: 'Neha Verma',
        role: 'workspace_admin',
        joinedAt: '2026-02-06T11:20:00Z',
      }
    ],
    connections: [
      {
        connectionId: 'conn_ig_03',
        instagramUserId: '17841407812930491',
        username: 'himachal.heritage',
        name: 'Himachal Heritage Tours',
        profilePictureUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&auto=format&fit=crop&q=80',
        accountType: 'BUSINESS',
        facebookPageId: '109283746592021',
        facebookPageName: 'Himachal Heritage Page',
        connectedAt: '2026-02-08T09:30:00Z',
        lastSyncedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
        status: 'ACTIVE',
        scopes: ['instagram_basic', 'instagram_manage_insights', 'pages_show_list'],
      }
    ]
  },
  {
    workspaceId: 'ws_zenith_fit',
    name: 'Zenith Performance Apparel',
    slug: 'zenith-fit',
    ownerUid: 'usr_karan_005',
    createdAt: '2026-02-12T11:00:00Z',
    plan: 'starter',
    connectedAccountsCount: 1,
    monthlySyncQuota: 100,
    monthlySyncsUsed: 8,
    members: [
      {
        uid: 'usr_karan_005',
        email: 'karan@zenithfit.co',
        displayName: 'Karan Mehra',
        role: 'workspace_owner',
        joinedAt: '2026-02-12T11:00:00Z',
      }
    ],
    connections: [
      {
        connectionId: 'conn_ig_04',
        instagramUserId: '17841406718293847',
        username: 'zenith.fit',
        name: 'Zenith Activewear',
        profilePictureUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80',
        accountType: 'BUSINESS',
        facebookPageId: '109283746592022',
        facebookPageName: 'Zenith Athletics',
        connectedAt: '2026-02-15T15:45:00Z',
        lastSyncedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35).toISOString(),
        status: 'ACTIVE',
        scopes: ['instagram_basic', 'instagram_manage_insights'],
      }
    ]
  }
];

export const DEMO_PLATFORM_STATS: PlatformStats = {
  totalUsers: 84,
  totalWorkspaces: 38,
  activeIgConnections: 52,
  monthlyApiRequests: 142800,
  cloudRunInvocations: 38400,
  firestoreReadsWrites: 89200,
  estimatedGcpCostInr: 340, // ₹340 out of ₹1,000 monthly ceiling
  monthlyBudgetCapInr: 1000,
  budgetUsedPercent: 34.0,
  systemHealth: 'HEALTHY',
  metaApiStatus: 'OPERATIONAL',
};

export const DEMO_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    actorEmail: 'ajay@ajaynxt.com',
    actorRole: 'workspace_owner',
    workspaceName: 'AJAYNXT Creative Media',
    action: 'INSTAGRAM_INSIGHTS_SYNC',
    details: 'Synced 90 days insights for @ajaynxt.creative (Meta API v21.0)',
    ipAddress: '103.24.12.89',
    status: 'SUCCESS',
  },
  {
    id: 'log_002',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    actorEmail: 'priya.s@ajaynxt.com',
    actorRole: 'workspace_admin',
    workspaceName: 'AJAYNXT Creative Media',
    action: 'REPORT_EXPORT_PDF',
    details: 'Generated 30-day Instagram Evolution Executive Summary PDF',
    ipAddress: '157.34.88.12',
    status: 'SUCCESS',
  },
  {
    id: 'log_003',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    actorEmail: 'ajay@ajaynxt.com',
    actorRole: 'platform_super_admin',
    workspaceName: 'System Platform',
    action: 'SECURITY_AUDIT_CHECK',
    details: 'Verified zero cross-tenant access violations across 38 workspaces',
    ipAddress: '103.24.12.89',
    status: 'SUCCESS',
  },
  {
    id: 'log_004',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    actorEmail: 'rohit.k@ajaynxt.com',
    actorRole: 'workspace_member',
    workspaceName: 'AJAYNXT Creative Media',
    action: 'CONTENT_FILTER_APPLIED',
    details: 'Filtered Reels media performance table with engagement rate > 12%',
    ipAddress: '182.73.49.10',
    status: 'SUCCESS',
  },
  {
    id: 'log_005',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    actorEmail: 'neha.guide@himachaltours.in',
    actorRole: 'workspace_admin',
    workspaceName: 'Himachal Heritage Luxury Tours',
    action: 'MEMBER_INVITE_SENT',
    details: 'Invited rahul.tours@gmail.com with role workspace_member',
    ipAddress: '49.207.210.45',
    status: 'SUCCESS',
  }
];

// Helper to calculate filtered metrics based on selected date range and specific account handle
export function getFilteredMetrics(days: number = 30, accountHandle?: string) {
  let multiplier = 1.0;
  if (accountHandle) {
    let hashVal = 0;
    const clean = accountHandle.replace(/^@/, '');
    for (let i = 0; i < clean.length; i++) {
      hashVal = (hashVal << 5) - hashVal + clean.charCodeAt(i);
      hashVal |= 0;
    }
    const seed = Math.abs(hashVal);
    multiplier = 0.65 + ((seed % 110) / 100);
  }

  const rawSlice = DEMO_DAILY_METRICS.slice(-days);
  const slice = rawSlice.map((d) => ({
    ...d,
    totalFollowers: Math.floor(d.totalFollowers * multiplier),
    followersGained: Math.floor(d.followersGained * multiplier),
    followersLost: Math.floor(d.followersLost * multiplier),
    netFollowers: Math.floor(d.netFollowers * multiplier),
    reach: Math.floor(d.reach * multiplier),
    views: Math.floor(d.views * multiplier),
    accountsEngaged: Math.floor(d.accountsEngaged * multiplier),
    totalInteractions: Math.floor(d.totalInteractions * multiplier),
  }));

  const totalFollowers = slice[slice.length - 1].totalFollowers;
  const initialFollowers = slice[0].totalFollowers - slice[0].netFollowers;
  const followersGained = slice.reduce((acc, curr) => acc + curr.followersGained, 0);
  const followersLost = slice.reduce((acc, curr) => acc + curr.followersLost, 0);
  const netFollowerGrowth = followersGained - followersLost;
  const followersGrowthRate = Number(((netFollowerGrowth / (initialFollowers || 1)) * 100).toFixed(2));

  const accountReach = slice.reduce((acc, curr) => acc + curr.reach, 0);
  const views = slice.reduce((acc, curr) => acc + curr.views, 0);
  const accountsEngaged = slice.reduce((acc, curr) => acc + curr.accountsEngaged, 0);
  const totalInteractions = slice.reduce((acc, curr) => acc + curr.totalInteractions, 0);

  const overallEngagementRate = Number(((totalInteractions / (accountReach || 1)) * 100).toFixed(2));

  const overview: AccountOverviewMetrics = {
    totalFollowers,
    followersGrowthRate,
    followersGained,
    followersLost,
    netFollowerGrowth,
    following: Math.floor(842 * (multiplier > 1 ? 1.1 : 0.9)),
    accountReach,
    reachChange: Number((14.8 * (multiplier > 1 ? 1.2 : 0.9)).toFixed(1)),
    views,
    viewsChange: Number((18.2 * (multiplier > 1 ? 1.1 : 0.8)).toFixed(1)),
    accountsEngaged,
    engagedChange: 11.4,
    totalInteractions,
    interactionsChange: 16.5,
    overallEngagementRate,
  };

  const contentSummary: ContentSummaryMetrics = {
    feedPostsCount: Math.floor(14 * multiplier),
    reelsCount: Math.floor(9 * multiplier),
    storiesCount: Math.floor(42 * multiplier),
    totalLikes: Math.floor(totalInteractions * 0.68),
    totalComments: Math.floor(totalInteractions * 0.08),
    totalSaves: Math.floor(totalInteractions * 0.16),
    totalShares: Math.floor(totalInteractions * 0.08),
    avgReachPerPost: Math.floor(24500 * multiplier),
    avgReachPerReel: Math.floor(63100 * multiplier),
    avgReachPerStory: Math.floor(8900 * multiplier),
    avgEngagementRate: overallEngagementRate,
  };

  return {
    dailyData: slice,
    overview,
    contentSummary,
  };
}

export function getMediaItemsForAccount(accountHandle?: string): MediaItem[] {
  const handle = accountHandle ? accountHandle.replace(/^@/, '') : 'ajaynxt.official';
  return DEMO_MEDIA_ITEMS.map((item) => ({
    ...item,
    caption: item.caption
      .replace(/ajaynxt\.official/g, handle)
      .replace(/@ajaynxt/g, `@${handle}`),
    permalink: item.permalink.replace(/ajaynxt\.official/g, handle),
  }));
}
