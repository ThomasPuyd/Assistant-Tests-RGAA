import { Component, Input, signal } from '@angular/core';
import { RgaaCriterion } from '../../../data/rgaa.data';
import { TestLinkComponent } from '../test-link/test-link.component';

@Component({ selector: 'app-criterion-accordion', standalone: true, imports: [TestLinkComponent], templateUrl: './criterion-accordion.component.html', styleUrl: './criterion-accordion.component.css' })
export class CriterionAccordionComponent {
  @Input({ required: true }) criterion!: RgaaCriterion;
  readonly expanded = signal(false);
}
