import * as Crypto from "expo-crypto";

export async function generateUUID(): Promise<string> {
  const randomBytes = Math.random().toString();
  const uuid = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    randomBytes,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  return uuid.slice(0, 36);
}
