import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { FeatureToggleService } from './feature-toggle.service';

export function initializeApp(featureToggleService: FeatureToggleService) {
  console.log('initializeApp!')
  return () => featureToggleService.loadFeatureToggles().toPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // HttpClientModule -> provideHttpClient()
    FeatureToggleService,

    provideAppInitializer(() => {
      const featureToggleService = inject(FeatureToggleService);
      console.log('initializeApp!');
      // TODO: If loadFeatureToggles() is async already (returns a Promise), you can skip the firstValueFrom()
      return firstValueFrom(featureToggleService.loadFeatureToggles());
    }),

  ]
};
