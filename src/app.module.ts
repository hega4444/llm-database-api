import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LlmsModule } from './llms/llms.module';

@Module({
  imports: [LlmsModule],
  controllers: [AppController],
})
export class AppModule {}
