import { Module } from '@nestjs/common';
import { CustomerAssistantController } from './customer-assistant.controller';
import { CustomerAssistantService } from './customer-assistant.service';

@Module({
  controllers: [CustomerAssistantController],
  providers: [CustomerAssistantService]
})
export class CustomerAssistantModule {}
