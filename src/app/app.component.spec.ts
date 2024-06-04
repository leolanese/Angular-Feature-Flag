import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FeatureToggleService } from './feature-toggle.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

class MockFeatureToggleService {
  private toggles: { [key: string]: boolean } = { login: true, add_user: false, featureA: true, featureB: false };

  isFeatureEnabled(key: string): boolean {
    return this.toggles[key];
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let featureToggleService: FeatureToggleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AppComponent], 
      providers: [{ provide: FeatureToggleService, useClass: MockFeatureToggleService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    featureToggleService = TestBed.inject(FeatureToggleService);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should display enabled features', () => {
    const enabledFeatures = fixture.debugElement.queryAll(By.css('.feature-block:not(.hidden) h3'));
    const enabledFeatureTexts = enabledFeatures.map(el => el.nativeElement.textContent.trim());

    expect(enabledFeatureTexts).toContain('Feature "login": enabled');
    expect(enabledFeatureTexts).toContain('Feature A: enabled');
  });

  it('should hide disabled features', () => {
    const hiddenFeatures = fixture.debugElement.queryAll(By.css('.feature-block.hidden h3'));
    const hiddenFeatureTexts = hiddenFeatures.map(el => el.nativeElement.textContent.trim());

    expect(hiddenFeatureTexts).toContain('Feature "add_user": enabled');
    expect(hiddenFeatureTexts).toContain('Feature B: enabled');
  });
});
