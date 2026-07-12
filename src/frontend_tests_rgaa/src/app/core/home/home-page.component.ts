import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RGAA_THEMES, RgaaTheme } from '../../data/rgaa.data';
import { ThemeAccordionComponent } from '../shared/theme-accordion/theme-accordion.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, ThemeAccordionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  readonly themes = RGAA_THEMES;
  readonly query = signal('');
  readonly criterionCount = RGAA_THEMES.reduce((sum, theme) => sum + theme.criteria.length, 0);
  readonly testCount = RGAA_THEMES.reduce((sum, theme) => sum + theme.criteria.reduce((count, criterion) => count + criterion.tests.length, 0), 0);

  readonly filteredThemes = computed(() => {
    const query = this.normalize(this.query());
    return this.themes
      .map(theme => this.filterTheme(theme, query))
      .filter((theme): theme is RgaaTheme => theme !== null);
  });

  private filterTheme(theme: RgaaTheme, query: string): RgaaTheme | null {
    if (!query || this.normalize(`${theme.id} ${theme.name}`).includes(query)) return theme;
    const criteria = theme.criteria.map(criterion => {
      if (this.normalize(`${criterion.id} ${criterion.title}`).includes(query)) return criterion;
      const tests = criterion.tests.filter(test => this.normalize(`${test.id} ${test.title}`).includes(query));
      return tests.length ? { ...criterion, tests } : null;
    }).filter(criterion => criterion !== null);
    return criteria.length ? { ...theme, criteria } : null;
  }

  private normalize(value: string): string {
    return value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
}
