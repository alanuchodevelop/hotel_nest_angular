import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RoomsComponent} from "@app/components/rooms/rooms.component";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RoomsComponent,  RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
