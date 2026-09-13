import logger from "../../../config/logger";
import Environment from "../../../helper/constan/environment";
import { EncryptCredentialParam } from "./type";
import * as crypto from "crypto";

export function encryptCredentials(data: EncryptCredentialParam): string {
  const key = Buffer.from(Environment.ENCRYPT_KEY, 'hex');
  const iv = crypto.randomBytes(12);

  const dataToEncrypt = {
    ...data,
    created_dt: new Date(),
  };
  const cipher = crypto.createCipheriv(
    Environment.ALGORITHM_ENCRYPT,
    key,
    iv,
  ) as crypto.CipherGCM;
  let encrypted = cipher.update(JSON.stringify(dataToEncrypt), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}.${authTag}.${encrypted}`;
}

export function decyptCredentials(data: string): EncryptCredentialParam {
  try {
    const key = Buffer.from(Environment.ENCRYPT_KEY, 'hex');
    const [ivHex, authTagHex, encrypted] = data.split('.');

    if (!ivHex || !authTagHex || !encrypted) {
      throw new Error('Invalid encrypted credential format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(
      Environment.ALGORITHM_ENCRYPT,
      key,
      iv,
    ) as crypto.DecipherGCM;
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch (error) {
    logger.error({ message: 'Error decrypt', error });
    throw '40103';
  }
}