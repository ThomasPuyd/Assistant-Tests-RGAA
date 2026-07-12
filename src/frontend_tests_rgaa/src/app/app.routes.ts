import { Routes } from '@angular/router';
import { HomePageComponent } from './core/home/home-page.component';
import { TestPageComponent } from './pages/test-rgaa/test-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Pages de test RGAA - Qualit’RGAA' },
  { path: 'tests', component: HomePageComponent, title: 'Liste des tests - Qualit’RGAA' },
  { path: 'tests/:testId', component: TestPageComponent, title: 'Test RGAA - Qualit’RGAA' },
  { path: '**', redirectTo: '' }
];