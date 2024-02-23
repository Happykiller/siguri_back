import * as sha256 from 'crypto-js/sha256';
import * as base64 from 'crypto-js/enc-base64';
import * as hmacSHA512 from 'crypto-js/hmac-sha512';

import { config } from '@src/config';
import { CryptService } from '@service/crypt/crypt.service';
import { CryptServiceDto } from '@service/crypt/dto/crypt.service.dto';

export class CryptServiceReal implements CryptService {
  crypt(dto: CryptServiceDto): string {
    const hashDigest = sha256('siguri' + dto.message);
    const hmacDigest = base64.stringify(
      hmacSHA512(hashDigest, dto.secret ?? config.jwt.secret),
    );
    return hmacDigest;
  }
}
