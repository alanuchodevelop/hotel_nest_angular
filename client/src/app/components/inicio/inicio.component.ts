import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "@app/components/header/header.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HeaderComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InicioComponent {

}
