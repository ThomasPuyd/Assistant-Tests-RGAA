import { Component } from '@angular/core';

interface FrameExample {
  title: string;
  explanation: string;
  compliant: boolean;
}

@Component({
  selector: 'app-test-2-1-1-content',
  standalone: true,
  templateUrl: './test-2-1-1-content.component.html',
  styleUrl: './test-2-1-1-content.component.css'
})
export class Test211ContentComponent {
  readonly examples: FrameExample[] = [
    { title: 'Cadre avec un attribut title', explanation: 'L’attribut title permet d’identifier le contenu du cadre.', compliant: true },
    { title: 'Attribut title absent', explanation: 'Le cadre ne possède aucun attribut title.', compliant: false },
    { title: 'aria-label utilisé sans title', explanation: 'La présence d’aria-label ne dispense pas le cadre de son attribut title pour ce test.', compliant: false },
    { title: 'Attribut name utilisé sans title', explanation: 'L’attribut name identifie techniquement le cadre, mais ne remplace pas title.', compliant: false },
    { title: 'Attribut data-title utilisé sans title', explanation: 'Un attribut de données personnalisé n’est pas l’attribut title attendu.', compliant: false },
    { title: 'aria-labelledby utilisé sans title', explanation: 'Même associé à un texte visible, le cadre ne possède toujours pas l’attribut title contrôlé par le test.', compliant: false },
    { title: 'Attribut tooltip utilisé sans title', explanation: 'L’attribut personnalisé tooltip ne correspond pas à l’attribut HTML title.', compliant: false }
  ];
}
