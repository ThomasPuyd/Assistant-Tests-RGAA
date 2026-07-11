import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { MethodPageComponent } from './pages/method/method-page.component';
import { TestPageComponent } from './pages/test/test-page.component';

export const routes: Routes = [
  { path: '', component: DashboardPageComponent, title: 'Tableau de bord RGAA - Qualit’RGAA' },
  { path: 'tests', component: DashboardPageComponent, title: 'Liste des tests - Qualit’RGAA' },
  { path: 'tests/:testId', component: TestPageComponent, title: 'Test RGAA - Qualit’RGAA' },
  { path: 'methode', component: MethodPageComponent, title: 'Méthode RGAA - Qualit’RGAA' },
  { path: '**', redirectTo: '' }
];
