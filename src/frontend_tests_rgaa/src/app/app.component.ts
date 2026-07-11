import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppMainComponent } from './layout/app-main/app-main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppMainComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
