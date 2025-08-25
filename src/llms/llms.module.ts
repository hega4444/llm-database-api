import { Module } from '@nestjs/common';
import { LlmsController } from './llms.controller';
import { LlmsService } from './llms.service';

@Module({
  controllers: [LlmsController],
  providers: [LlmsService]
})
export class LlmsModule {}
