import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { Buffer } from 'buffer';

@Injectable()
export class CryptoService {
    static algorithm = 'aes-256-ctr';
    static secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    static iv = crypto.randomBytes(16);  

    /**
     * encrypts data for network transfer
     * @param data data the server should encrypt
     * @returns object with initvector and cipher
     */
    static encrypt(data:string): Object {
    
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    
        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }    

    /**
     * decrypts data send from client
     * @param data the data received
     * @note the return of this may break due to yet uknown values might change later on to string
     * @returns object decrypted from data by client
     */
    static decrypt(data: object): object {
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(data['iv'], 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(data['content'], 'hex')), decipher.final()]);
        return decrpyted;
    }
}
