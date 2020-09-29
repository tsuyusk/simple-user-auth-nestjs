import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class HashProvider {
  async generate(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async verify(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
