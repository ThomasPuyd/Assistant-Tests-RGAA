import { Component } from '@angular/core';

interface HeadersExample {
  title: string;
  explanation: string;
  compliant: boolean;
}

@Component({
  selector: 'app-test-5-7-4-content',
  standalone: true,
  templateUrl: './test-5-7-4-content.component.html',
  styleUrl: './test-5-7-4-content.component.css'
})
export class Test574ContentComponent {
  readonly examples: HeadersExample[] = [
    { title: 'Cellule associée à ses deux en-têtes', explanation: 'headers contient les id de l’en-tête de ligne et de l’en-tête de colonne associés à la cellule.', compliant: true },
    { title: 'Attribut headers absent', explanation: 'La cellule est associée à des en-têtes possédant un id, mais ne possède aucun attribut headers.', compliant: false },
    { title: 'Attribut headers vide', explanation: 'L’attribut est présent, mais ne référence aucun identifiant d’en-tête.', compliant: false },
    { title: 'Identifiants inexistants', explanation: 'Les valeurs de headers ne correspondent à aucun id présent dans le tableau.', compliant: false },
    { title: 'Un en-tête associé est oublié', explanation: 'headers référence l’en-tête de ligne, mais pas l’en-tête de colonne associé.', compliant: false },
    { title: 'Erreur dans un identifiant', explanation: 'Une faute dans la valeur empêche la référence à l’en-tête de colonne.', compliant: false },
    { title: 'Libellés utilisés à la place des id', explanation: 'headers doit contenir les valeurs exactes des attributs id, et non le texte visible des en-têtes.', compliant: false }
  ];
}
