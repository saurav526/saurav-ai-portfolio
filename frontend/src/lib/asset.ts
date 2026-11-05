/**
 * Resolves a public asset path so it works both when served over http(s)
 * (absolute "/file") and when index.html is opened directly from disk via
 */
export const IS_FILE_PROTOCOL =
  typeof window !== 'undefined' && window.location.protocol === 'file:';

export const asset = (path: string): string =>
  IS_FILE_PROTOCOL && path.startsWith('/') ? `.${path}` : path;
