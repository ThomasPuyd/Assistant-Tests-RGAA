import { Component } from '@angular/core';

interface ImageButtonExample {
  title: string;
  explanation: string;
  compliant: boolean;
}

@Component({
  selector: 'app-test-1-1-3-content',
  standalone: true,
  templateUrl: './test-1-1-3-content.component.html',
  styleUrl: './test-1-1-3-content.component.css'
})
export class Test113ContentComponent {
  readonly examples: ImageButtonExample[] = [
    { title: 'Bouton image avec une alternative pertinente', explanation: 'L’attribut alt indique clairement l’action déclenchée par le bouton.', compliant: true },
    { title: 'Aucune alternative textuelle', explanation: 'Le bouton ne possède ni alt, ni aria-label, ni aria-labelledby, ni title.', compliant: false },
    { title: 'Attribut alt vide', explanation: 'Un attribut alt vide ne donne aucun nom accessible au bouton image.', compliant: false },
    { title: 'Attribut aria-label vide', explanation: 'L’attribut aria-label est présent, mais son contenu est vide.', compliant: false },
    { title: 'Référence aria-labelledby inexistante', explanation: 'L’identifiant référencé ne correspond à aucun passage de texte dans la page.', compliant: false },
    { title: 'Attribut title vide', explanation: 'L’attribut title vide ne fournit aucune alternative textuelle.', compliant: false },
    { title: 'Alternatives composées uniquement d’espaces', explanation: 'Des espaces dans les attributs admis ne constituent pas une alternative exploitable.', compliant: false }
  ];
}
