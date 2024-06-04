import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FeatureToggle {
  name: string, 
  login: boolean,
  add_user: boolean,
  featureA: boolean,
  featureB: boolean
}

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  private featureToggles: { [key: string]: boolean } = {};
  http = inject(HttpClient);

  constructor() {}

  loadFeatureToggles(): Observable<FeatureToggle[]> {
    return this.http.get('/assets/feature-toggles.json')
    .pipe(
      map((toggle) => ({
        ...toggle,
        featureC: true
      })),
      tap((toggles: any) => {
        console.log(toggles)
        this.featureToggles = toggles;
      })
    );
  }

  isFeatureEnabled(featureName: string): boolean {
    return this.featureToggles[featureName] === true;
  }
}
