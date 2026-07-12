import { Component, Input, signal } from '@angular/core';
import { RgaaTheme } from '../../../data/rgaa.data';
import { CriterionAccordionComponent } from '../criterion-accordion/criterion-accordion.component';

@Component({ selector: 'app-theme-accordion', standalone: true, imports: [CriterionAccordionComponent], templateUrl: './theme-accordion.component.html', styleUrl: './theme-accordion.component.css' })
export class ThemeAccordionComponent {
  @Input({ required: true }) theme!: RgaaTheme;
  @Input() initiallyExpanded = false;
  readonly expanded = signal(false);
  ngOnInit(): void { this.expanded.set(this.initiallyExpanded); }
}
