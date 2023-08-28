import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAssistantController } from './customer-assistant.controller';

describe('CustomerAssistantController', () => {
  let controller: CustomerAssistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAssistantController],
    }).compile();

    controller = module.get<CustomerAssistantController>(CustomerAssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
