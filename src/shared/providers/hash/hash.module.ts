import { Module } from '@nestjs/common';
import { HashProvider } from './hash.provider';

@Module({
  providers: [HashProvider],
  exports: [HashProvider],
})
export class HashModule {}
