# Assistant Tests RGAA

Application compagnon de `Assistant-Audit-RGAA` d?di?e ? la recette des scripts de contr?le RGAA.

Le projet sert des pages de test statiques : chaque page reproduit volontairement un cas HTML pr?cis afin de v?rifier qu'un script RGAA d?tecte correctement les ?l?ments conformes, non conformes ou non applicables.

## R?le dans l'?cosyst?me

- `Assistant-Audit-RGAA` contient le moteur d'audit, l'orchestrateur et les scripts de crit?res.
- `Assistant Tests RGAA` expose des pages de recette consultables dans le navigateur ou auditables par `Assistant-Audit-RGAA`.
- La logique cible est : **1 test RGAA = 1 page de recette = 1 composant/script front**.

## Organisation

```text
.
?? docker-compose.yml
?? src/
    ?? frontend_tests_rgaa/
        ?? Dockerfile
        ?? nginx.conf
        ?? public/
        ?   ?? test-assets/
        ?? src/app/
            ?? data/                  # Catalogue des th?mes, crit?res et tests expos?s
            ?? layout/                # Header, main, footer et logo
            ?? pages/
            ?   ?? dashboard/         # Tableau de bord des tests
            ?   ?? method/            # M?thode d'utilisation
            ?   ?? test/              # Page route dynamique /tests/:testId
            ?   ?? tests-rgaa/
            ?       ?? criteres_rgaa/ # Arborescence miroir d'Assistant RGAA
            ?           ?? critere_1_1/
            ?               ?? test_1_1_1/
            ?? shared/                # Composants r?utilisables
```

L'arborescence `pages/tests-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/` est volontairement calqu?e sur `RGAA/src/backend_rgaa/scripts/criteres_rgaa/critere_X_Y/test_X_Y_Z.py`.

## Tests actuellement pr?sents

| Test | Route | Dossier miroir |
|---|---|---|
| 1.1.1 | `/tests/1-1-1` | `critere_1_1/test_1_1_1/` |
| 1.1.2 | `/tests/1-1-2` | `critere_1_1/test_1_1_2/` |
| 1.1.3 | `/tests/1-1-3` | `critere_1_1/test_1_1_3/` |
| 2.1.1 | `/tests/2-1-1` | `critere_2_1/test_2_1_1/` |
| 5.7.4 | `/tests/5-7-4` | `critere_5_7/test_5_7_4/` |
| 6.2.1 | `/tests/6-2-1` | `critere_6_2/test_6_2_1/` |

## D?veloppement local

```powershell
cd C:\Users\Utilisateur\Documents\Python\02_Assistant\Tests-RGAA\src\frontend_tests_rgaa
npm install
npm start
```

Le serveur Angular ?coute sur `http://localhost:4212`.

## Docker

Depuis la racine du projet :

```powershell
docker compose up -d --build
```

Le conteneur normalis? est `frontend-tests-rgaa` et le site est expos? sur `http://localhost:4212`.

## Ajouter une page de recette

1. Ajouter le test dans `src/frontend_tests_rgaa/src/app/data/rgaa.data.ts` avec son `id` et son `slug`.
2. Cr?er le dossier miroir : `pages/tests-rgaa/criteres_rgaa/critere_X_Y/test_X_Y_Z/`.
3. Ajouter les fichiers du composant de recette dans ce dossier.
4. Importer le composant dans `pages/test/test-page.component.ts` et l'afficher pour l'identifiant concern?.
5. Lancer `npm run build` puis, si besoin, `docker compose up -d --build`.

## Int?gration Portail

Le projet est d?clar? dans `00_Portail` pour pouvoir ?tre d?marr?, arr?t?, reconstruit et ouvert depuis le hub commun.

## ?tat du projet

Le projet est un socle de recette front. Il ne contient pas de backend ni de base de donn?es. Les r?sultats d'audit sont produits par `Assistant-Audit-RGAA`, qui peut crawler ou cibler les routes expos?es ici.
