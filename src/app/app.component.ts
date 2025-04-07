import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeatureToggleService } from './feature-toggle.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
      <div *ngFor="let feature of features" class="feature-block" 
            [ngClass]="{'hidden': !featureToggleService.isFeatureEnabled(feature.key)}">
        <h3>{{ feature.label }}: enabled</h3>
      </div>
    </div>
  `,
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Feature-Flag';
  featureToggleService = inject(FeatureToggleService);

  features = [
    { key: 'login', label: 'Feature "login"' },
    { key: 'add_user', label: 'Feature "add_user"' },
    { key: 'featureA', label: 'Feature A' },
    { key: 'featureB', label: 'Feature B' }
  ];

}
