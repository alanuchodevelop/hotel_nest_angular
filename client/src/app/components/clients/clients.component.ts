import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {

}
