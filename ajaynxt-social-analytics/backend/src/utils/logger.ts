/**
 * Google Cloud Logging compatible structured JSON logger.
 * In Cloud Run, stdout/stderr JSON is automatically parsed into severity levels and structured payload fields.
 */

type LogSeverity = 'DEFAULT' | 'DEBUG' | 'INFO' | 'NOTICE' | 'WARNING' | 'ERROR' | 'CRITICAL';

interface StructuredLogPayload {
  message: string;
  severity: LogSeverity;
  component?: string;
  workspaceId?: string;
  actorUid?: string;
  traceId?: string;
  [key: string]: any;
}

export class Logger {
  private static log(payload: StructuredLogPayload) {
    const entry = {
      timestamp: new Date().toISOString(),
      ...payload,
    };

    if (payload.severity === 'ERROR' || payload.severity === 'CRITICAL') {
      console.error(JSON.stringify(entry));
    } else if (payload.severity === 'WARNING') {
      console.warn(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }
  }

  public static info(message: string, meta: Record<string, any> = {}) {
    this.log({ message, severity: 'INFO', ...meta });
  }

  public static warn(message: string, meta: Record<string, any> = {}) {
    this.log({ message, severity: 'WARNING', ...meta });
  }

  public static error(message: string, error?: any, meta: Record<string, any> = {}) {
    this.log({
      message,
      severity: 'ERROR',
      errorMessage: error?.message,
      stack: error?.stack,
      ...meta,
    });
  }
}
