import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  private featureToggles: any = {};
  http = inject(HttpClient);

  constructor() {}

  loadFeatureToggles(): Observable<any> {
    return this.http.get('/assets/feature-toggles.json')
    .pipe(
      tap((toggles: any) => {
        this.featureToggles = toggles;
      })
    );
  }

  isFeatureEnabled(featureName: string): boolean {
    console.log('feature name', featureName)
    console.log('features', this.featureToggles)
    return this.featureToggles[featureName] === true;
  }
}
