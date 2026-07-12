import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem { label: string; link?: string; }

@Component({ selector: 'app-breadcrumb', standalone: true, imports: [RouterLink], templateUrl: './breadcrumb.component.html', styleUrl: './breadcrumb.component.css' })
export class BreadcrumbComponent { @Input({ required: true }) items!: BreadcrumbItem[]; }
