import { Component } from '@angular/core';

interface LinkExample {
  title: string;
  explanation: string;
  compliant: boolean;
}

@Component({
  selector: 'app-test-6-2-1-content',
  standalone: true,
  templateUrl: './test-6-2-1-content.component.html',
  styleUrl: './test-6-2-1-content.component.css'
})
export class Test621ContentComponent {
  readonly examples: LinkExample[] = [
    { title: 'Lien avec un intitulé textuel', explanation: 'Le texte placé entre les balises permet d’identifier le lien.', compliant: true },
    { title: 'Lien entièrement vide', explanation: 'Aucun texte ni aucune alternative n’est présent entre les balises du lien.', compliant: false },
    { title: 'Lien contenant uniquement des espaces', explanation: 'Les espaces ne constituent pas un intitulé de lien.', compliant: false },
    { title: 'Lien image avec une alternative vide', explanation: 'L’image contenue dans le lien est ignorée et ne fournit donc aucun intitulé.', compliant: false },
    { title: 'Texte masqué aux technologies d’assistance', explanation: 'Le seul texte du lien est placé dans un élément aria-hidden="true".', compliant: false },
    { title: 'Image ARIA sans alternative', explanation: 'L’élément role="img" contenu dans le lien ne possède aucun nom accessible.', compliant: false },
    { title: 'SVG masqué sans autre contenu', explanation: 'Le SVG est ignoré avec aria-hidden="true" et le lien ne contient aucun autre intitulé.', compliant: false }
  ];
}
