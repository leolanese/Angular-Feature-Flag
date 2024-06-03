import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { FeatureToggleService } from './feature-toggle.service';
export function initializeApp(featureToggleService: FeatureToggleService) {
  console.log('initializeApp!')
  return () => featureToggleService.loadFeatureToggles().toPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideHttpClient(),
    FeatureToggleService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [FeatureToggleService],
      multi: true,
    },
  ]
};
