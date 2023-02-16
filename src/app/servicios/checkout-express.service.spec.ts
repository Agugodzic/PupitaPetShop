import { TestBed } from '@angular/core/testing';

import { CheckoutExpressService } from './checkout-express.service';

describe('CheckoutExpressService', () => {
  let service: CheckoutExpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutExpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
