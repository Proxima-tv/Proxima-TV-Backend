import { Test, TestingModule } from '@nestjs/testing';
import { RoutAuthenticatorService } from './rout-authenticator.service';

describe('RoutAuthenticatorService', () => {
  let service: RoutAuthenticatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutAuthenticatorService],
    }).compile();

    service = module.get<RoutAuthenticatorService>(RoutAuthenticatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
