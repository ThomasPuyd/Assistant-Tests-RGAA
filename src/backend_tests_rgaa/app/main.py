import os
from typing import Annotated

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel

FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL", "http://localhost:4212").rstrip("/")


class TestPage(BaseModel):
    id: str
    slug: str
    title: str
    theme: str
    criterion: str
    url: str


RAW_TESTS = [
    {"id": "1.1.1", "slug": "1-1-1", "title": "Test 1.1.1", "theme": "Images", "criterion": "1.1"},
    {"id": "1.1.2", "slug": "1-1-2", "title": "Test 1.1.2", "theme": "Images", "criterion": "1.1"},
    {"id": "1.1.3", "slug": "1-1-3", "title": "Test 1.1.3", "theme": "Images", "criterion": "1.1"},
    {"id": "1.2.1", "slug": "1-2-1", "title": "Test 1.2.1", "theme": "Images", "criterion": "1.2"},
    {"id": "1.2.2", "slug": "1-2-2", "title": "Test 1.2.2", "theme": "Images", "criterion": "1.2"},
    {"id": "2.1.1", "slug": "2-1-1", "title": "Test 2.1.1", "theme": "Cadres", "criterion": "2.1"},
    {"id": "3.1.1", "slug": "3-1-1", "title": "Test 3.1.1", "theme": "Couleurs", "criterion": "3.1"},
    {"id": "5.7.4", "slug": "5-7-4", "title": "Test 5.7.4", "theme": "Tableaux", "criterion": "5.7"},
    {"id": "6.2.1", "slug": "6-2-1", "title": "Test 6.2.1", "theme": "Liens", "criterion": "6.2"},
]

app = FastAPI(
    title="Assistant Tests RGAA API",
    description=(
        "API utilitaire pour retrouver et ouvrir les pages de recette RGAA. "
        "Depuis Swagger, saisir un identifiant de test comme `1.1.1` ou un critère comme `1.1`."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _normalize(value: str) -> str:
    return value.strip().lower().replace("_", "-").replace(".", "-")


def _page(raw: dict[str, str]) -> TestPage:
    return TestPage(**raw, url=f"{FRONTEND_BASE_URL}/tests/{raw['slug']}")


def _find_test(identifier: str) -> TestPage:
    normalized = _normalize(identifier)
    if not normalized:
        raise HTTPException(status_code=400, detail="Saisir un critère ou un identifiant de test.")

    for test in RAW_TESTS:
        if normalized in {_normalize(test["id"]), _normalize(test["slug"])}:
            return _page(test)

    for test in RAW_TESTS:
        if normalized == _normalize(test["criterion"]):
            return _page(test)

    raise HTTPException(status_code=404, detail=f"Aucune page de test trouvée pour '{identifier}'.")


@app.get("/health", tags=["Santé"])
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/tests", response_model=list[TestPage], tags=["Pages de test"])
def list_tests() -> list[TestPage]:
    return [_page(test) for test in RAW_TESTS]


@app.get("/resolve", response_model=TestPage, tags=["Pages de test"])
def resolve_test(
    critere: Annotated[str, Query(description="Critère ou test à ouvrir. Exemples : 1.1, 1.1.1, 1-1-1")],
) -> TestPage:
    return _find_test(critere)


@app.get("/open", tags=["Pages de test"])
def open_test(
    critere: Annotated[str, Query(description="Critère ou test à ouvrir. Exemples : 1.1, 1.1.1, 1-1-1")],
) -> RedirectResponse:
    page = _find_test(critere)
    return RedirectResponse(page.url, status_code=307)


@app.get("/open-link", response_class=HTMLResponse, tags=["Pages de test"])
def open_link(
    critere: Annotated[str, Query(description="Critère ou test à ouvrir dans un nouvel onglet via cette page HTML.")],
) -> str:
    page = _find_test(critere)
    return f"""
    <!doctype html>
    <html lang="fr">
      <head><meta charset="utf-8"><title>Ouvrir {page.title}</title></head>
      <body>
        <p>Ouverture de <a href="{page.url}" target="_blank" rel="noopener">{page.title}</a>.</p>
        <script>window.open({page.url!r}, '_blank', 'noopener');</script>
      </body>
    </html>
    """