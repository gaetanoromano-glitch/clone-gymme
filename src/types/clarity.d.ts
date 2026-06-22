// "set" is the correct Clarity CDN method for custom tags.
// The @microsoft/clarity npm package's Clarity.setTag() maps to window.clarity("set", ...).
// "setTag" does NOT exist in the CDN method map and causes "apply of undefined" errors.

interface ClarityFunction {
  (method: "identify", userId: string, sessionId?: string, pageId?: string): void;
  (method: "set", key: string, value: string): void;
  (method: "event", eventName: string): void;
  (method: "consent", consent?: boolean): void;
  (method: "upgrade", reason: string): void;
  // Allow the queue stub shape: function with optional .q array
  q?: IArguments[];
}

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

export {};
