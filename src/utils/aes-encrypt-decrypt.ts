import crypto from "crypto-js";

const secretIV = import.meta.env.VITE_APP_AES_SECRET_IV_KEY as string
const secretKey = import.meta.env.VITE_APP_AES_SECRET_KEY as string

export const aesEncrypt = (plainText: string | number): string => {
  if (typeof plainText === "number") plainText = plainText.toString();
  const iv = crypto.enc.Utf8.parse(secretIV);
  const key = crypto.enc.Utf8.parse(secretKey);
  const encrypted = crypto.AES.encrypt(plainText, key, { iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 });
  return encrypted.toString();
};

export const aesDecrypt = (encryptedText: string): string => {
  if (typeof encryptedText !== "string") return "";
  const iv = crypto.enc.Utf8.parse(secretIV);
  const key = crypto.enc.Utf8.parse(secretKey);
  const decrypted = crypto.AES.decrypt(encryptedText, key, { iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 });
  return decrypted.toString(crypto.enc.Utf8);
};

export const decryptObjectValues = <T extends Record<string, any>>(object: T, keysToDecrypt: string[]): T => {
  const decryptedObject: T = { ...object };

  for (const key of keysToDecrypt) {
    if (key in decryptedObject) {
      decryptedObject[key] = decryptValue(decryptedObject[key], key);
    }
  }

  return decryptedObject;
};

const decryptValue = (value: any, key: string | null = null): any => {
  if (typeof value === "string") {
    if (/Id*$/i.test(key || "") || key === "userRole") return Number(aesDecrypt(value));
    return aesDecrypt(value);
  } else if (Array.isArray(value)) {
    return value.map((item) => decryptValue(item));
  } else if (typeof value === "object" && value !== null) {
    const decryptedObj: Record<string, any> = {};
    for (const [subKey, subValue] of Object.entries(value)) {
      decryptedObj[subKey] = decryptValue(subValue, subKey);
    }
    return decryptedObj;
  } else {
    return value;
  }
};

// import forge from "node-forge";
// const AES_SECRET_IV = import.meta.env.VITE_APP_AES_SECRET_IV_KEY as string
// const AES_SECRET_KEY = import.meta.env.VITE_APP_AES_SECRET_KEY as string
// console.log(AES_SECRET_IV)
 
// // Function to encrypt data
// export const encrypt = (data: string) => {
//   try {
//     const cipher = forge.cipher.createCipher(
//       "AES-CBC",
//       forge.util.hexToBytes(AES_SECRET_KEY)
//     );
//     cipher.start({ iv: forge.util.hexToBytes(AES_SECRET_IV) });
//     cipher.update(forge.util.createBuffer(data, "utf8")); // Assuming input is string
//     cipher.finish();
 
//     return cipher.output.toHex();
//   } catch (error) {
//     console.error("Encryption error:", error);
//   }
// };
 
// // Function to decrypt data
// export const decrypt = (encryptedHex: string) => {
//   if (!encryptedHex) {
//     return null;
//   }
//   try {
//     const iv = forge.util.hexToBytes(AES_SECRET_IV);
//     const key = forge.util.hexToBytes(AES_SECRET_KEY);
 
//     const decipher = forge.cipher.createDecipher("AES-CBC", key);
//     decipher.start({ iv: iv });
//     decipher.update(
//       forge.util.createBuffer(forge.util.hexToBytes(encryptedHex))
//     );
//     decipher.finish();
//     return decipher.output.toString();
//   } catch (error) {
//     console.error("Decryption error:", error);
//     return null;
//   }
// };
 

 