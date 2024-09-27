import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RoomsComponent} from "@app/components/rooms/rooms.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RoomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
