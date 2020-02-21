import { TestBed } from '@angular/core/testing';

import { CustomDropdownService } from './custom-dropdown.service';

describe('CustomDropdownService', () => {
  let service: CustomDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
