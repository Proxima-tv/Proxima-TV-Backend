import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

@Injectable()
export class CryptoService {

    private static secretKey = "";

    static makeid(length:number):string {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() *   charactersLength)); }
        return result;
    }

    static setKey(k:string) { this.secretKey = k; }

    //The set method is use for encrypt the value.
    static encrypt(data:string){
        var key = CryptoJS.enc.Utf8.parse(this.secretKey);
        var iv = CryptoJS.enc.Utf8.parse(this.makeid(16)); // TODO: Randomize IV to reenhance security

        // console.log("Key: " + key);
        console.log("Initial Vector: " + iv);
        
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        let out = {
        "content": encrypted.toString(),
        "iv": iv
        };

        // Instead of sending only the encrypted string, send an object with iv and encrypted data
        return out;
    }

    //The get method is use for decrypt the value.
    static decrypt(data:any){
        console.log("Initial Vector: " + data['iv']);

        var key = CryptoJS.enc.Utf8.parse(this.secretKey);

        var decrypted = CryptoJS.AES.decrypt(data['content'], key, {
            keySize: 128 / 8,
            iv: data['iv'],
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}