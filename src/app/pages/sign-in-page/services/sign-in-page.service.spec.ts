import { TestBed } from '@angular/core/testing';

import { SignInPageService } from './sign-in-page.service';

describe('SignInPageService', () => {
  let service: SignInPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
