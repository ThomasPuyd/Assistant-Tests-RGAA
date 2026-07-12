# Backend Tests RGAA

Petit backend FastAPI de l'application `Assistant Tests RGAA`.

Il expose Swagger sur `http://localhost:8212/docs` et sert principalement à retrouver ou ouvrir une page de test à partir d'un identifiant.

## Endpoints utiles

- `GET /health` : vérification de santé.
- `GET /tests` : liste des pages de test connues.
- `GET /resolve?critere=1.1.1` : retourne la page associée.
- `GET /open?critere=1.1.1` : redirige vers la page front.
- `GET /open-link?critere=1.1.1` : page HTML qui ouvre la cible dans un nouvel onglet avec lien de secours.

Le paramètre `critere` accepte les formats `1.1.1`, `1-1-1` ou un critère comme `1.1` ; dans ce dernier cas, le premier test du critère est utilisé.