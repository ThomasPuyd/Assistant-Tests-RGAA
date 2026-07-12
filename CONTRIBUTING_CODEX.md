# CONTRIBUTING_CODEX.md

Guide de reprise pour un agent Codex ou un développeur qui intervient sur `Assistant Tests RGAA`.

Ce projet sert de compagnon de recette à `Assistant-Audit-RGAA`. Il expose des pages de test indépendantes permettant de vérifier que les scripts RGAA détectent correctement les cas conformes, non conformes ou non applicables.

## Principes généraux

- Garder le projet simple : pas de base de données, pas d'état persistant applicatif.
- Conserver une logique miroir avec `Assistant-Audit-RGAA`.
- Respecter la règle : **1 test RGAA = 1 page de test = 1 composant de recette = 1 dossier dédié**.
- Ne pas mutualiser les fixtures HTML au point de rendre les tests dépendants les uns des autres.
- Chaque page doit pouvoir être ouverte directement via son URL `/tests/<slug>`.
- Les pages de test doivent être autonomes, lisibles et auditables par un outil externe.
- Les liens vers les pages de test doivent s'ouvrir dans un nouvel onglet quand ils sont lancés depuis l'accueil ou depuis la navigation entre tests.

## Arborescence attendue

```text
.
├── docker-compose.yml
├── CONTRIBUTING_CODEX.md
└── src/
    ├── backend_tests_rgaa/
    │   ├── app/
    │   │   └── main.py
    │   ├── Dockerfile
    │   ├── README.md
    │   └── requirements.txt
    └── frontend_tests_rgaa/
        ├── Dockerfile
        ├── nginx.conf
        ├── public/                # Assets globaux uniquement
        └── src/app/
            ├── core/
            │   ├── home/          # Accueil, recherche, liste des tests
            │   └── shared/        # Composants transverses du front
            ├── data/              # Catalogue des thèmes, critères et tests
            ├── layout/            # Header, main, footer
            └── pages/
                └── test-rgaa/
                    ├── test-page.component.*
                    └── criteres_rgaa/
                        └── critere_X_Y/
                            └── test_X_Y_Z/
                                ├── assets/
                                ├── test-X-Y-Z-content.component.ts
                                ├── test-X-Y-Z-content.component.html
                                └── test-X-Y-Z-content.component.css
```

## Frontend : conventions

### `core/`

`core/` contient ce qui structure l'application hors pages de test :

- `core/home/` : page d'accueil, recherche, liste des thèmes et critères.
- `core/shared/` : composants partagés comme accordéons, badges et liens de test.

Ne pas remettre `home` dans `pages/`.

### `layout/`

`layout/` contient uniquement les composants de structure globale :

- header ;
- main ;
- footer.

Le header doit rester aligné avec les autres assistants : logo/GIF, nom du projet, bouton Home, bouton Swagger.

### `pages/test-rgaa/`

`pages/test-rgaa/` contient exclusivement les pages de recette RGAA.

La structure doit rester miroir de l'arborescence backend de l'assistant d'audit :

```text
Assistant-Audit-RGAA:
RGAA/src/backend_rgaa/scripts/criteres_rgaa/critere_X_Y/test_X_Y_Z.py

Assistant Tests RGAA:
Tests-RGAA/src/frontend_tests_rgaa/src/app/pages/test-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/
```

Exemple pour le test `1.1.1` :

```text
src/app/pages/test-rgaa/criteres_rgaa/critere_1_1/test_1_1_1/
├── assets/
├── test-1-1-1-content.component.ts
├── test-1-1-1-content.component.html
└── test-1-1-1-content.component.css
```

## Pages de test

Chaque page de test doit :

- afficher la règle du test ;
- expliquer brièvement les éléments à auditer ;
- fournir des exemples concrets dans le DOM ;
- contenir au moins un cas conforme quand c'est pertinent ;
- contenir plusieurs cas volontairement non conformes ;
- être exploitable par les scripts d'audit, pas seulement visuellement ;
- utiliser des exemples repliables avec `<details class="example">` et `<summary>` ;
- garder les exemples repliés par défaut ;
- ne pas dépendre d'une autre page ou d'un asset global de recette.

Les blocs d'exemples doivent suivre le pattern actuel :

```html
<details class="example" [class.valid]="example.compliant" [class.invalid]="!example.compliant">
  <summary>
    <p class="example-number">Exemple {{ index + 1 }}</p>
    <h3>{{ example.title }}</h3>
    <span class="verdict">{{ example.compliant ? 'Conforme' : 'Non conforme' }}</span>
  </summary>

  <div class="fixture">
    <!-- DOM réellement testé -->
  </div>

  <p>{{ example.explanation }}</p>
</details>
```

## Assets

Les assets de test doivent être rangés dans le dossier du test qui les utilise :

```text
critere_X_Y/test_X_Y_Z/assets/
```

Éviter `public/test-assets` ou tout dossier global de fixtures.

`public/` est réservé aux assets globaux de l'application : favicon, logo, icônes de navigation.

Quand un asset local est ajouté sous `pages/test-rgaa`, vérifier que `angular.json` continue à copier cette arborescence vers le build :

```json
{
  "glob": "**/*.{svg,html,png,jpg,jpeg,gif,webp}",
  "input": "src/app/pages/test-rgaa",
  "output": "test-rgaa"
}
```

## Catalogue des tests

Lorsqu'un test est ajouté, mettre à jour :

1. `src/frontend_tests_rgaa/src/app/data/rgaa.data.ts` ;
2. `src/backend_tests_rgaa/app/main.py` dans `RAW_TESTS` ;
3. `src/frontend_tests_rgaa/src/app/pages/test-rgaa/test-page.component.ts` pour importer le composant ;
4. `src/frontend_tests_rgaa/src/app/pages/test-rgaa/test-page.component.html` pour afficher le composant selon `located.test.id` ;
5. les README si le fonctionnement ou les routes changent.

## Backend FastAPI

Le backend est volontairement minimal.

Il sert à exposer Swagger et à ouvrir/résoudre les pages de test :

- `GET /health` ;
- `GET /tests` ;
- `GET /resolve?critere=1.1.1` ;
- `GET /open?critere=1.1.1` ;
- `GET /open-link?critere=1.1.1`.

Le paramètre `critere` accepte :

- un identifiant de test : `1.1.1` ;
- un slug : `1-1-1` ;
- un critère : `1.1`, qui ouvre le premier test connu du critère.

Ne pas ajouter de base de données sans décision explicite.

## Docker / ports / conteneurs

Les noms de conteneurs doivent rester normalisés :

- `backend-tests-rgaa` ;
- `frontend-tests-rgaa`.

Ports locaux actuels :

- frontend : `http://localhost:4212` ;
- backend Swagger : `http://localhost:8212/docs`.

Après modification d'infra ou de dépendances :

```powershell
docker compose up -d --build
```

## Portail

Le projet est intégré au Portail.

Si les noms de conteneurs, ports ou URLs changent, mettre à jour aussi :

```text
00_Portail/src/backend_portail/app/main.py
```

Le Portail doit connaître :

- `frontend_url` ;
- `api_url` ;
- `backend-tests-rgaa` ;
- `frontend-tests-rgaa`.

## Qualité et validation

Avant commit ou push, lancer au minimum :

```powershell
cd C:\Users\Utilisateur\Documents\Python\02_Assistant\Tests-RGAA\src\frontend_tests_rgaa
npm run build
```

Et pour le backend :

```powershell
cd C:\Users\Utilisateur\Documents\Python\02_Assistant\Tests-RGAA
python -m py_compile src\backend_tests_rgaa\app\main.py
```

Si Docker est concerné :

```powershell
docker compose up -d --build
```

Puis vérifier :

- `http://localhost:4212` ;
- `http://localhost:8212/docs` ;
- `GET http://localhost:8212/resolve?critere=1.1.1` ;
- `GET http://localhost:8212/open?critere=1.1.1`.

## Points d'attention

- Ne pas réintroduire `Qualit'RGAA` : le nom utilisateur est `Assistant Tests RGAA`.
- Ne pas remettre de fil d'Ariane sur les pages de test.
- Ne pas remettre le bouton `Revenir au tableau de bord` sur les pages de test.
- Ne pas faire scroller la page d'accueil quand les thèmes sont dépliés : seul le panneau des thèmes doit scroller.
- Ne pas déplacer les assets de test dans `public/`.
- Ne pas casser l'ouverture des pages de test en nouvel onglet.
- Préserver l'encodage UTF-8 des fichiers.