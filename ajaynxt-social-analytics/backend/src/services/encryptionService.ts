import crypto from 'crypto';
import { config } from '../config/environment';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Recommended 96 bits for GCM

export class EncryptionService {
  private static getKey(): Buffer {
    const hexKey = config.encryption.masterKey;
    if (hexKey.length !== 64) {
      throw new Error('ENCRYPTION_MASTER_KEY must be a 64-character hex string (32 bytes).');
    }
    return Buffer.from(hexKey, 'hex');
  }

  /**
   * Encrypts plaintext using AES-256-GCM.
   * Returns a colon-delimited string: iv:authTag:ciphertext (all hex encoded)
   */
  public static encrypt(plaintext: string): string {
    const key = this.getKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
    ciphertext += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${ciphertext}`;
  }

  /**
   * Decrypts an AES-256-GCM encrypted payload.
   * Format: iv:authTag:ciphertext
   */
  public static decrypt(payload: string): string {
    const parts = payload.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted payload format.');
    }

    const [ivHex, authTagHex, ciphertextHex] = parts;
    const key = this.getKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertextHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
