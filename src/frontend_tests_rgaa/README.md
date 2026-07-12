# Frontend Tests RGAA

Frontend Angular de l'application `Assistant Tests RGAA`.

## Commandes

```bash
npm install
npm start
npm run build
npm test
```

`npm start` expose l'application sur `http://localhost:4212`.

Le bouton `Swagger` du header pointe vers le backend FastAPI exposé sur `http://localhost:8212/docs` quand l'application est lancée avec Docker Compose.

## Structure applicative

```text
src/app/
├── data/                  # Catalogue RGAA utilisé par l'accueil
├── layout/                # App header/main/footer et logo
├── core/
│   ├── home/              # Accueil, recherche et liste des tests
│   └── shared/            # Accordéons, badges, liens, fil d'Ariane
└── pages/
    └── test-rgaa/
        ├── test-page.component.*
        └── criteres_rgaa/ # Pages de recette, miroir des scripts Assistant RGAA
```

## Convention de création d'un test

Pour un test RGAA `X.Y.Z`, créer :

```text
src/app/pages/test-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/
├── assets/                                # Images/fichiers utilisés par ce test
├── test-X-Y-Z-content.component.ts
├── test-X-Y-Z-content.component.html
└── test-X-Y-Z-content.component.css
```

Cette convention fait le lien direct avec le script backend `Assistant-Audit-RGAA` :

```text
RGAA/src/backend_rgaa/scripts/criteres_rgaa/critere_X_Y/test_X_Y_Z.py
```

La page dynamique `src/app/pages/test-rgaa/test-page.component.ts` reste le point d'entrée Angular qui choisit le composant de recette à afficher selon `/tests/:testId`.