import { Component } from '@angular/core';

interface AreaExample {
  title: string;
  explanation: string;
  compliant: boolean;
}

@Component({
  selector: 'app-test-1-1-2-content',
  standalone: true,
  templateUrl: './test-1-1-2-content.component.html',
  styleUrl: './test-1-1-2-content.component.css'
})
export class Test112ContentComponent {
  readonly examples: AreaExample[] = [
    { title: 'Zone avec une alternative textuelle', explanation: 'L’attribut alt décrit la destination de la zone cliquable.', compliant: true },
    { title: 'Attribut alt absent', explanation: 'La zone informative ne possède ni attribut alt ni attribut aria-label.', compliant: false },
    { title: 'Attribut alt vide', explanation: 'L’attribut alt est présent, mais ne contient aucune alternative textuelle.', compliant: false },
    { title: 'Attribut aria-label vide', explanation: 'L’attribut aria-label vide ne fournit aucun nom accessible à la zone.', compliant: false },
    { title: 'Attribut alt composé d’espaces', explanation: 'Une suite d’espaces ne constitue pas une alternative textuelle exploitable.', compliant: false },
    { title: 'Attribut aria-label composé d’espaces', explanation: 'La zone ne possède aucun contenu textuel utilisable comme alternative.', compliant: false },
    { title: 'Attribut title utilisé seul', explanation: 'Pour le test 1.1.2, title ne remplace pas les alternatives admises : alt ou aria-label.', compliant: false }
  ];
}
