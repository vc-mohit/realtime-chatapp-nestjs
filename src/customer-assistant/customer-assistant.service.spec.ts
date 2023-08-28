import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAssistantService } from './customer-assistant.service';

describe('CustomerAssistantService', () => {
  let service: CustomerAssistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAssistantService],
    }).compile();

    service = module.get<CustomerAssistantService>(CustomerAssistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
