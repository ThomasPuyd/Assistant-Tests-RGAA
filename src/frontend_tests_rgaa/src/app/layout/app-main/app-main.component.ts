import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  template: '<main id="main" tabindex="-1"><ng-content /></main>',
  styles: [':host { display: flex; flex: 1 1 auto; width: min(100% - 2rem, 75rem); min-height: 0; margin: 0 auto; } main { display: flex; width: 100%; min-height: 0; flex-direction: column; }']
})
export class AppMainComponent {}
