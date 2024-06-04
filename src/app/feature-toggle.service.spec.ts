import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FeatureToggleService } from './feature-toggle.service';

describe('FeatureToggleService', () => {
  let service: FeatureToggleService;
  let httpMock: HttpTestingController;
  let mockToggles = {};


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureToggleService]
    });

    service = TestBed.inject(FeatureToggleService);
    httpMock = TestBed.inject(HttpTestingController);

    mockToggles = { login: true, add_user: false, featureC: true };
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load feature toggles', () => {
    //arrange

    //act
    service.loadFeatureToggles().subscribe(() => {
      expect(service['featureToggles']).toEqual(mockToggles);
    });

    //assert
    const req = httpMock.expectOne('/assets/feature-toggles.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockToggles);
  });

  it('should return true for enabled features', () => {
    service['featureToggles'] = { login: true, add_user: false };
    
    expect(service.isFeatureEnabled('login')).toBeTrue();
    expect(service.isFeatureEnabled('add_user')).toBeFalse();
  });

  it('should return false for disabled features', () => {
    expect(service.isFeatureEnabled('add_user')).toBeFalse();
  });

  it('should return false for non-existent features', () => {
    expect(service.isFeatureEnabled('non_existent_feature')).toBeFalse();
  });

});
