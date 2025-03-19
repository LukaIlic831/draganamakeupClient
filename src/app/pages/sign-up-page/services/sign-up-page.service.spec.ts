import { TestBed } from '@angular/core/testing';

import { SignUpPageService } from './sign-up-page.service';

describe('SignUpPageService', () => {
  let service: SignUpPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
