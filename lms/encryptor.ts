import * as CryptoJS from 'crypto-js';

const ivBytes = [ 240, 3, 45, 29, 0, 76, 173, 59 ];

export class Encryptor {
    public static encrypt(value: string): string {
        const secretKeyHash = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(process.env.SECRET_KEY));
        const iv = CryptoJS.enc.Hex.parse(new Buffer(ivBytes).toString('hex'));
        const options = {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        };
        const secretKeyFullHash = CryptoJS.enc.Hex.parse(secretKeyHash.toString() + secretKeyHash.toString().substring(0, 16));

        return CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(value), secretKeyFullHash, options).toString();
    }
}