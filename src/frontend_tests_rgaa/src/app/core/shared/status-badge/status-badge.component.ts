import { Component, Input } from '@angular/core';
import { TestStatus } from '../../../data/rgaa.data';

@Component({
  selector: 'app-status-badge', standalone: true,
  template: '<span class="badge" [class]="\'badge \'+status">{{ labels[status] }}</span>',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: TestStatus;
  readonly labels: Record<TestStatus, string> = {
    'not-tested': 'À tester', compliant: 'Conforme',
    'non-compliant': 'Non conforme', 'not-applicable': 'Non applicable'
  };
}
