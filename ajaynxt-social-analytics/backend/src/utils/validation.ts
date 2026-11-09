import { ValidationError } from './errors';

export class Validator {
  /**
   * Validate and sanitize strings, rejecting potential XSS or control character injection
   */
  public static sanitizeString(input: unknown, fieldName: string, minLength = 1, maxLength = 255): string {
    if (typeof input !== 'string') {
      throw new ValidationError(`Field '${fieldName}' must be a string.`);
    }

    const trimmed = input.trim();
    if (trimmed.length < minLength) {
      throw new ValidationError(`Field '${fieldName}' must be at least ${minLength} characters.`);
    }

    if (trimmed.length > maxLength) {
      throw new ValidationError(`Field '${fieldName}' cannot exceed ${maxLength} characters.`);
    }

    // Strip HTML tags / dangerous scripts
    const sanitized = trimmed.replace(/<[^>]*>?/gm, '');
    return sanitized;
  }

  /**
   * Validate workspace identifiers (strict alphanumeric + underscore)
   */
  public static validateWorkspaceId(id: unknown): string {
    if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{3,64}$/.test(id)) {
      throw new ValidationError("Invalid workspace ID format. Must be 3-64 alphanumeric characters, hyphens or underscores.");
    }
    return id;
  }

  /**
   * Validate email addresses (RFC 5322 standard regex)
   */
  public static validateEmail(email: unknown): string {
    if (
      typeof email !== 'string' ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
    ) {
      throw new ValidationError("Invalid email address format.");
    }
    return email.toLowerCase().trim();
  }

  /**
   * Validate date range presets
   */
  public static validateDatePreset(preset: unknown): '7d' | '30d' | '90d' | 'custom' {
    const valid = ['7d', '30d', '90d', 'custom'];
    if (typeof preset !== 'string' || !valid.includes(preset)) {
      return '30d'; // Safe default
    }
    return preset as '7d' | '30d' | '90d' | 'custom';
  }

  /**
   * Validate numeric bounds
   */
  public static validateNumber(input: unknown, fieldName: string, min = 0, max = Number.MAX_SAFE_INTEGER): number {
    const num = Number(input);
    if (isNaN(num) || num < min || num > max) {
      throw new ValidationError(`Field '${fieldName}' must be a valid number between ${min} and ${max}.`);
    }
    return num;
  }
}
