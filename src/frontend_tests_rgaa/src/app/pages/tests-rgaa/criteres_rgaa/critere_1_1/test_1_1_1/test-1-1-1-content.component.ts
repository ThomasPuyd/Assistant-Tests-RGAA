import { Component } from '@angular/core';

interface CodeExample {
  title: string;
  explanation: string;
  compliant: boolean;
}

@Component({
  selector: 'app-test-1-1-1-content',
  standalone: true,
  templateUrl: './test-1-1-1-content.component.html',
  styleUrl: './test-1-1-1-content.component.css'
})
export class Test111ContentComponent {
  readonly examples: CodeExample[] = [
    {
      title: 'Image avec une alternative pertinente',
      explanation: 'L’attribut alt restitue l’information utile portée par la photographie.',
      compliant: true
    },
    {
      title: 'Attribut alt absent',
      explanation: 'L’image informative ne possède aucune alternative textuelle.',
      compliant: false
    },
    {
      title: 'Alternative vide sur une image informative',
      explanation: 'Une alternative vide fait ignorer l’image par les technologies d’assistance alors que le plan apporte une information.',
      compliant: false
    },
    {
      title: 'Nom de fichier utilisé comme alternative',
      explanation: 'Le nom du fichier ne restitue pas l’information présentée dans le graphique.',
      compliant: false
    },
    {
      title: 'Alternative générique',
      explanation: 'Le mot « Image » décrit le type de contenu, mais pas l’information portée par le graphique.',
      compliant: false
    },
    {
      title: 'Élément role="img" sans nom accessible',
      explanation: 'L’élément est exposé comme une image, mais aucune alternative ne lui donne de nom accessible.',
      compliant: false
    },
    {
      title: 'Référence aria-labelledby inexistante',
      explanation: 'L’identifiant référencé ne correspond à aucun élément présent dans la page : aucun nom accessible n’est calculé.',
      compliant: false
    }
  ];
}
