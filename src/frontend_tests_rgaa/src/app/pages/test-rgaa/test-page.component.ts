import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ALL_TESTS, LocatedTest, findTestBySlug } from '../../data/rgaa.data';
import { StatusBadgeComponent } from '../../core/shared/status-badge/status-badge.component';
import { Test111ContentComponent } from './criteres_rgaa/critere_1_1/test_1_1_1/test-1-1-1-content.component';
import { Test112ContentComponent } from './criteres_rgaa/critere_1_1/test_1_1_2/test-1-1-2-content.component';
import { Test113ContentComponent } from './criteres_rgaa/critere_1_1/test_1_1_3/test-1-1-3-content.component';
import { Test211ContentComponent } from './criteres_rgaa/critere_2_1/test_2_1_1/test-2-1-1-content.component';
import { Test574ContentComponent } from './criteres_rgaa/critere_5_7/test_5_7_4/test-5-7-4-content.component';
import { Test621ContentComponent } from './criteres_rgaa/critere_6_2/test_6_2_1/test-6-2-1-content.component';

@Component({ selector: 'app-test-page', standalone: true, imports: [RouterLink, StatusBadgeComponent, Test111ContentComponent, Test112ContentComponent, Test113ContentComponent, Test211ContentComponent, Test574ContentComponent, Test621ContentComponent], templateUrl: './test-page.component.html', styleUrl: './test-page.component.css' })
export class TestPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly destroyRef = inject(DestroyRef);
  readonly locatedTest = signal<LocatedTest | undefined>(undefined);
  readonly requestedId = signal('');
  readonly previous = signal<LocatedTest | undefined>(undefined);
  readonly next = signal<LocatedTest | undefined>(undefined);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const slug = params.get('testId') ?? '';
      const located = findTestBySlug(slug);
      this.requestedId.set(slug);
      this.locatedTest.set(located);
      const index = located ? ALL_TESTS.findIndex(item => item.test.slug === located.test.slug) : -1;
      this.previous.set(index > 0 ? ALL_TESTS[index - 1] : undefined);
      this.next.set(index >= 0 && index < ALL_TESTS.length - 1 ? ALL_TESTS[index + 1] : undefined);
      this.title.setTitle(located ? `${located.test.title} - Qualit’RGAA` : 'Test introuvable - Qualit’RGAA');
    });
  }
}
