import { describe, it } from 'node:test';
import assert from 'node:assert';
import { EncryptionService } from '../services/encryptionService';

describe('Phase 2 Security & AES-256-GCM Cryptographic Tests', () => {
  it('should encrypt a Meta OAuth token and decrypt it back to original value', () => {
    const rawMetaToken = 'EAABsbCS1iHgBAO6ZB17c9ZACXy81jFp002jVbA9ZBxyzMetaAccessToken';
    
    // Encrypt
    const encrypted = EncryptionService.encrypt(rawMetaToken);
    assert.ok(encrypted.includes(':'), 'Encrypted string must contain colon delimiters for iv:authTag:ciphertext');
    
    const parts = encrypted.split(':');
    assert.strictEqual(parts.length, 3, 'Must have exactly 3 parts (iv, authTag, ciphertext)');
    assert.strictEqual(parts[0].length, 24, 'IV must be 12 bytes = 24 hex chars');
    assert.strictEqual(parts[1].length, 32, 'AuthTag must be 16 bytes = 32 hex chars');
    assert.ok(parts[2].length > 0, 'Ciphertext must not be empty');

    // Decrypt
    const decrypted = EncryptionService.decrypt(encrypted);
    assert.strictEqual(decrypted, rawMetaToken, 'Decrypted token must exactly match original plaintext');
  });

  it('should throw an error and refuse to decrypt if ciphertext is tampered with', () => {
    const rawMetaToken = 'valid_token_string_12345';
    const encrypted = EncryptionService.encrypt(rawMetaToken);
    const parts = encrypted.split(':');

    // Tamper with the ciphertext byte
    const tamperedCiphertext = parts[2].substring(0, parts[2].length - 2) + 'ff';
    const tamperedPayload = `${parts[0]}:${parts[1]}:${tamperedCiphertext}`;

    assert.throws(
      () => {
        EncryptionService.decrypt(tamperedPayload);
      },
      /Unsupported state or unable to authenticate data|bad decrypt/i,
      'Must detect cryptographic tampering and reject decipher'
    );
  });

  it('should throw an error if authTag is forged or altered', () => {
    const rawMetaToken = 'valid_token_string_12345';
    const encrypted = EncryptionService.encrypt(rawMetaToken);
    const parts = encrypted.split(':');

    // Tamper with auth tag
    const forgedAuthTag = '00000000000000000000000000000000';
    const tamperedPayload = `${parts[0]}:${forgedAuthTag}:${parts[2]}`;

    assert.throws(
      () => {
        EncryptionService.decrypt(tamperedPayload);
      },
      /Unsupported state or unable to authenticate data|bad decrypt/i,
      'Must detect forged authentication tags'
    );
  });
});
