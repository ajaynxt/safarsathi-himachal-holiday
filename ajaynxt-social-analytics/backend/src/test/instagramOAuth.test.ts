import { describe, it } from 'node:test';
import assert from 'node:assert';
import crypto from 'crypto';
import { InstagramController } from '../controllers/instagramController';

describe('Phase 3 Meta OAuth & Security Tests', () => {
  const dummyAppSecret = 'test_meta_app_secret_1234567890';

  it('should successfully parse and verify a valid Meta HMAC-SHA256 signed_request', () => {
    const payloadObj = {
      user_id: '17841405829103982',
      algorithm: 'HMAC-SHA256',
      issued_at: Math.floor(Date.now() / 1000),
    };

    const payloadJson = JSON.stringify(payloadObj);
    const encodedPayload = Buffer.from(payloadJson).toString('base64url');

    const expectedSig = crypto
      .createHmac('sha256', dummyAppSecret)
      .update(encodedPayload)
      .digest('base64url');

    const validSignedRequest = `${expectedSig}.${encodedPayload}`;

    const parsed = InstagramController.parseSignedRequest(validSignedRequest, dummyAppSecret);
    assert.strictEqual(parsed.user_id, '17841405829103982');
    assert.strictEqual(parsed.algorithm, 'HMAC-SHA256');
  });

  it('should reject a tampered Meta signed_request with invalid signature', () => {
    const payloadObj = {
      user_id: '17841405829103982',
      algorithm: 'HMAC-SHA256',
    };

    const encodedPayload = Buffer.from(JSON.stringify(payloadObj)).toString('base64url');
    // Forged signature
    const forgedSig = Buffer.from('forged_fake_signature_bytes').toString('base64url');
    const tamperedSignedRequest = `${forgedSig}.${encodedPayload}`;

    assert.throws(
      () => {
        InstagramController.parseSignedRequest(tamperedSignedRequest, dummyAppSecret);
      },
      /Signed request signature verification failed/i,
      'Must reject forged Meta signatures'
    );
  });

  it('should generate unique CSRF state tokens with sufficient entropy', () => {
    const states = new Set<string>();
    for (let i = 0; i < 100; i++) {
      const state = crypto.randomBytes(32).toString('hex');
      assert.strictEqual(state.length, 64, '32 bytes hex string must be 64 characters long');
      assert.ok(!states.has(state), 'State tokens must be strictly unique');
      states.add(state);
    }
  });
});
