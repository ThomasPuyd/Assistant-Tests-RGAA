export type TestStatus = 'not-tested' | 'compliant' | 'non-compliant' | 'not-applicable';

export interface RgaaTest {
  id: string;
  title: string;
  slug: string;
  status: TestStatus;
}

export interface RgaaCriterion {
  id: string;
  title: string;
  tests: RgaaTest[];
}

export interface RgaaTheme {
  id: string;
  name: string;
  criteria: RgaaCriterion[];
}

// Jeu de démonstration partiel. Remplacer cette constante par l'import du
// référentiel officiel complet sans modifier les composants consommateurs.
export const RGAA_THEMES: RgaaTheme[] = [
  {
    id: '1', name: 'Images', criteria: [
      { id: '1.1', title: 'Critère 1.1', tests: [
        { id: '1.1.1', title: 'Test 1.1.1', slug: '1-1-1', status: 'not-tested' },
        { id: '1.1.2', title: 'Test 1.1.2', slug: '1-1-2', status: 'not-tested' },
        { id: '1.1.3', title: 'Test 1.1.3', slug: '1-1-3', status: 'not-tested' }
      ] },
      { id: '1.2', title: 'Critère 1.2', tests: [
        { id: '1.2.1', title: 'Test 1.2.1', slug: '1-2-1', status: 'not-tested' },
        { id: '1.2.2', title: 'Test 1.2.2', slug: '1-2-2', status: 'not-tested' }
      ] }
    ]
  },
  { id: '2', name: 'Cadres', criteria: [
    { id: '2.1', title: 'Critère 2.1', tests: [
      { id: '2.1.1', title: 'Test 2.1.1', slug: '2-1-1', status: 'not-tested' }
    ] }
  ] },
  { id: '3', name: 'Couleurs', criteria: [
    { id: '3.1', title: 'Critère 3.1', tests: [
      { id: '3.1.1', title: 'Test 3.1.1', slug: '3-1-1', status: 'not-tested' }
    ] }
  ] },
  { id: '4', name: 'Multimédia', criteria: [] },
  { id: '5', name: 'Tableaux', criteria: [
    { id: '5.7', title: 'Critère 5.7', tests: [
      { id: '5.7.4', title: 'Test 5.7.4', slug: '5-7-4', status: 'not-tested' }
    ] }
  ] },
  { id: '6', name: 'Liens', criteria: [
    { id: '6.2', title: 'Critère 6.2', tests: [
      { id: '6.2.1', title: 'Test 6.2.1', slug: '6-2-1', status: 'not-tested' }
    ] }
  ] },
  { id: '7', name: 'Scripts', criteria: [] },
  { id: '8', name: 'Éléments obligatoires', criteria: [] },
  { id: '9', name: 'Structuration de l’information', criteria: [] },
  { id: '10', name: 'Présentation de l’information', criteria: [] },
  { id: '11', name: 'Formulaires', criteria: [] },
  { id: '12', name: 'Navigation', criteria: [] },
  { id: '13', name: 'Consultation', criteria: [] }
];

export interface LocatedTest {
  theme: RgaaTheme;
  criterion: RgaaCriterion;
  test: RgaaTest;
}

export const ALL_TESTS: LocatedTest[] = RGAA_THEMES.flatMap(theme =>
  theme.criteria.flatMap(criterion =>
    criterion.tests.map(test => ({ theme, criterion, test }))
  )
);

export function findTestBySlug(slug: string): LocatedTest | undefined {
  return ALL_TESTS.find(item => item.test.slug === slug);
}
