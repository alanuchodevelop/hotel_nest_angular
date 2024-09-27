import {Component, inject} from '@angular/core';
import { RoomsService } from '@app/services';
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  rooms: any[] = [];
  // Inyectar el servicio directamente con el método inject
  private roomsService = inject(RoomsService);


  ngOnInit(): void {
    this.roomsService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }
}
