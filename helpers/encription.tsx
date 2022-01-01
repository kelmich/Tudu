import {
  encrypt,
  createMessage,
  readMessage,
  decrypt,
  readCleartextMessage,
  createCleartextMessage,
  PublicKey,
  PrivateKey,
  CleartextMessage,
  sign,
  verify,
} from "openpgp";

export async function encryptJSON(json: Object, pubKey: PublicKey) {
  const encrypted = await encrypt({
    message: await createMessage({ text: JSON.stringify(json) }),
    encryptionKeys: pubKey,
  });
  return encrypted;
}

export async function decryptJSON(msg: string, privKey: PrivateKey) {
  const message = await readMessage({
    armoredMessage: msg,
  });
  const decrypted = await decrypt({
    message,
    decryptionKeys: privKey,
  });
  const chunks = [];
  for await (const chunk of decrypted.data) {
    chunks.push(chunk);
  }
  const plaintext = chunks.join("");
  return JSON.parse(plaintext);
}

export async function signJSON(json: Object, privKey: PrivateKey) {
  const unsignedMessage = await createCleartextMessage({
    text: JSON.stringify(json),
  });
  const cleartextMessage = await sign({
    message: unsignedMessage,
    signingKeys: privKey,
  });
  return cleartextMessage;
}

export async function verifyJSON(
  signedMessage: CleartextMessage,
  pubKey: PublicKey
) {
  const verificationResult = await verify({
    message: signedMessage,
    verificationKeys: pubKey,
  });
  const { verified } = verificationResult.signatures[0];
  try {
    await verified;
    return true;
  } catch (e) {
    return false;
  }
}
