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
    provideRouter(routes),
    provideHttpClient(), // provideHttpClient()is more “tree-shakable” than importing HttpClientModule
    FeatureToggleService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [FeatureToggleService],
      multi: true,
    },
  ]
};
