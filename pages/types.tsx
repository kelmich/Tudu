import { PublicKey, PrivateKey } from "openpgp";

export interface Task {
  id: string;
  title: string;
  description?: string;
  date?: Date;
}

export interface User {
  username: string;
  pubKey: PublicKey;
  privKey: PrivateKey;
}

export interface EncUser {
  username: string;
  pubKey: string;
  encPrivKey: string;
}

export interface SignedRequest {
  username: string;
  data: Object;
  signature: string;
}
