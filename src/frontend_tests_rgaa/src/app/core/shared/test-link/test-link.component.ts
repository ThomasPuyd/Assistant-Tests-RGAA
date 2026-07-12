import { Component, Input } from '@angular/core';
import { RgaaTest } from '../../../data/rgaa.data';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({ selector: 'app-test-link', standalone: true, imports: [StatusBadgeComponent], templateUrl: './test-link.component.html', styleUrl: './test-link.component.css' })
export class TestLinkComponent { @Input({ required: true }) test!: RgaaTest; }