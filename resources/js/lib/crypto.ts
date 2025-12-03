// IMPORTANT: no comments per code style
export type EncPayload = { iv: string; salt: string; cipher: string };

const textEnc = new TextEncoder();
const textDec = new TextDecoder();

function bufToB64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function b64ToBuf(b64: string) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKey(passphrase: string, salt: ArrayBuffer) {
  const baseKey = await crypto.subtle.importKey("raw", textEnc.encode(passphrase), { name: "PBKDF2" }, false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text: string, passphrase: string): Promise<EncPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12)).buffer;
  const salt = crypto.getRandomValues(new Uint8Array(16)).buffer;
  const key = await deriveKey(passphrase, salt);
  const cipherBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, textEnc.encode(text));
  return { iv: bufToB64(iv), salt: bufToB64(salt), cipher: bufToB64(cipherBuf) };
}

export async function decrypt(payload: EncPayload, passphrase: string): Promise<string> {
  const iv = b64ToBuf(payload.iv);
  const salt = b64ToBuf(payload.salt);
  const key = await deriveKey(passphrase, salt);
  const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, b64ToBuf(payload.cipher));
  return textDec.decode(plainBuf);
}

export function makeCsv(rows: Array<{ date: string; type: string; content: string }>) {
  const header = "date,type,content";
  const esc = (s: string) => '"' + s.replace(/"/g, '""') + '"';
  const body = rows.map(r => [r.date, r.type, esc(r.content)].join(",")).join("\n");
  return header + "\n" + body;
}
