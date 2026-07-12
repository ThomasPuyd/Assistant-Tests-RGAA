import { Routes } from '@angular/router';
import { HomePageComponent } from './core/home/home-page.component';
import { TestPageComponent } from './pages/test-rgaa/test-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Pages de test RGAA - Assistant Tests RGAA' },
  { path: 'tests', component: HomePageComponent, title: 'Liste des tests - Assistant Tests RGAA' },
  { path: 'tests/:testId', component: TestPageComponent, title: 'Test RGAA - Assistant Tests RGAA' },
  { path: '**', redirectTo: '' }
];