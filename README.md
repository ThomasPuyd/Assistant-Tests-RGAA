# Assistant Tests RGAA

Application compagnon de `Assistant-Audit-RGAA` dédiée à la recette des scripts de contrôle RGAA.

Le projet sert des pages de test statiques : chaque page reproduit volontairement un cas HTML précis afin de vérifier qu'un script RGAA détecte correctement les éléments conformes, non conformes ou non applicables.

## Rôle dans l'écosystème

- `Assistant-Audit-RGAA` contient le moteur d'audit, l'orchestrateur et les scripts de critères.
- `Assistant Tests RGAA` expose des pages de recette consultables dans le navigateur ou auditables par `Assistant-Audit-RGAA`.
- Le backend FastAPI expose Swagger pour retrouver ou ouvrir une page de test à partir d'un critère.
- La logique cible est : **1 test RGAA = 1 page de recette = 1 composant/script front**.

## Organisation

```text
.
├── docker-compose.yml
└── src/
    ├── backend_tests_rgaa/
    │   ├── app/
    │   │   └── main.py
    │   ├── Dockerfile
    │   └── requirements.txt
    └── frontend_tests_rgaa/
        ├── Dockerfile
        ├── nginx.conf
        ├── public/                # Assets globaux de l'application uniquement
        └── src/app/
            ├── data/              # Catalogue des thèmes, critères et tests exposés
            ├── layout/            # Header, main, footer et logo
            ├── core/
            │   ├── home/          # Accueil et liste des tests
            │   └── shared/        # Composants réutilisables
            └── pages/
                └── test-rgaa/     # Route dynamique + pages de recette RGAA
                    └── criteres_rgaa/
```

L'arborescence `pages/test-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/` est volontairement calquée sur `RGAA/src/backend_rgaa/scripts/criteres_rgaa/critere_X_Y/test_X_Y_Z.py`.

## Services

| Service | Conteneur | URL |
|---|---|---|
| Frontend Angular | `frontend-tests-rgaa` | `http://localhost:4212` |
| Backend FastAPI / Swagger | `backend-tests-rgaa` | `http://localhost:8212/docs` |

## Ouvrir une page depuis Swagger

Depuis `http://localhost:8212/docs` :

- `GET /resolve?critere=1.1.1` retourne l'URL de la page.
- `GET /open?critere=1.1.1` redirige vers la page de test.
- `GET /open-link?critere=1.1.1` retourne une page HTML qui ouvre la cible dans un nouvel onglet avec lien de secours.

Le paramètre `critere` accepte `1.1.1`, `1-1-1` ou un critère comme `1.1`.

## Tests actuellement présents

| Test | Route | Dossier miroir |
|---|---|---|
| 1.1.1 | `/tests/1-1-1` | `critere_1_1/test_1_1_1/` |
| 1.1.2 | `/tests/1-1-2` | `critere_1_1/test_1_1_2/` |
| 1.1.3 | `/tests/1-1-3` | `critere_1_1/test_1_1_3/` |
| 2.1.1 | `/tests/2-1-1` | `critere_2_1/test_2_1_1/` |
| 5.7.4 | `/tests/5-7-4` | `critere_5_7/test_5_7_4/` |
| 6.2.1 | `/tests/6-2-1` | `critere_6_2/test_6_2_1/` |

## Développement local

```powershell
cd C:\Users\Utilisateur\Documents\Python\02_Assistant\Tests-RGAA\src\frontend_tests_rgaa
npm install
npm start
```

Le serveur Angular écoute sur `http://localhost:4212`.

## Docker

Depuis la racine du projet :

```powershell
docker compose up -d --build
```

## Ajouter une page de recette

1. Ajouter le test dans `src/frontend_tests_rgaa/src/app/data/rgaa.data.ts` avec son `id` et son `slug`.
2. Ajouter le test dans le catalogue du backend `src/backend_tests_rgaa/app/main.py`.
3. Créer le dossier miroir : `pages/test-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/`.
4. Ajouter le composant de recette dans ce dossier.
5. Placer les images, iframes ou fichiers nécessaires dans `assets/` au sein du dossier du test.
6. Importer le composant dans `pages/test-rgaa/test-page.component.ts` et l'afficher pour l'identifiant concerné.
7. Lancer `npm run build` puis, si besoin, `docker compose up -d --build`.

## Intégration Portail

Le projet est déclaré dans `00_Portail` pour pouvoir être démarré, arrêté, reconstruit et ouvert depuis le hub commun.

## État du projet

Le projet est un socle de recette front avec un backend utilitaire sans base de données. Les résultats d'audit sont produits par `Assistant-Audit-RGAA`, qui peut crawler ou cibler les routes exposées ici.