import * as openpgp from "openpgp";

export async function encryptJSON(json: Object, pubKey: openpgp.PublicKey) {
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: JSON.stringify(json) }),
    encryptionKeys: pubKey,
  });
  return encrypted;
}

export async function decryptJSON(msg: string, privKey: openpgp.PrivateKey) {
  const message = await openpgp.readMessage({
    armoredMessage: msg,
  });
  const decrypted = await openpgp.decrypt({
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

export async function signJSON(json: Object, privKey: openpgp.PrivateKey) {
  const unsignedMessage = await openpgp.createCleartextMessage({
    text: JSON.stringify(json),
  });
  const cleartextMessage = await openpgp.sign({
    message: unsignedMessage,
    signingKeys: privKey,
  });
  return cleartextMessage;
}

export async function verifyJSON(
  signedJson: string,
  pubKey: openpgp.PublicKey
) {
  // const signedMessage = await openpgp.readCleartextMessage({
  //   cleartextMessage: signedJson,
  // });
  // const verificationResult = await openpgp.verify({
  //   message: signedMessage,
  //   verificationKeys: pubKey,
  // });
  // return verificationResult;
  return true;
}
