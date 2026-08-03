// Strips // and /* */ comments from JSONC, returns parsed object.
// Safe: only removes comments outside of string literals.

export function stripJsoncComments(src: string): string {
  let out = '';
  let inString = false;
  let stringChar = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (inString) {
      out += c;
      if (c === '\\') {
        out += src[i + 1] ?? '';
        i += 2;
        continue;
      }
      if (c === stringChar) inString = false;
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      inString = true;
      stringChar = c;
      out += c;
      i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

export function parseJsonc(src: string): unknown {
  return JSON.parse(stripJsoncComments(src));
}
