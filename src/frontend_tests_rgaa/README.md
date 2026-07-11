# Frontend Tests RGAA

Frontend Angular 18 de l'application `Assistant Tests RGAA`.

## Commandes

```bash
npm install
npm start
npm run build
npm test
```

`npm start` expose l'application sur `http://localhost:4212`.

## Structure applicative

```text
src/app/
?? data/                  # Catalogue RGAA utilis? par le tableau de bord
?? layout/                # App header/main/footer et logo
?? pages/
?   ?? dashboard/         # Vue de synth?se
?   ?? method/            # Documentation d'utilisation
?   ?? test/              # Route dynamique /tests/:testId
?   ?? tests-rgaa/
?       ?? criteres_rgaa/ # Pages de recette, miroir des scripts Assistant RGAA
?? shared/                # Accord?ons, badges, liens, fil d'Ariane
```

## Convention de cr?ation d'un test

Pour un test RGAA `X.Y.Z`, cr?er :

```text
src/app/pages/tests-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/
?? test-X-Y-Z-content.component.ts
?? test-X-Y-Z-content.component.html
?? test-X-Y-Z-content.component.css
```

Cette convention fait le lien direct avec le script backend `Assistant-Audit-RGAA` :

```text
RGAA/src/backend_rgaa/scripts/criteres_rgaa/critere_X_Y/test_X_Y_Z.py
```

La page dynamique `src/app/pages/test/test-page.component.ts` reste le point d'entr?e Angular qui choisit le composant de recette ? afficher selon `/tests/:testId`.
