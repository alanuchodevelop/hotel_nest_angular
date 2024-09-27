import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RoomsService } from '@app/services';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@app/components/header/header.component';
import { Room } from '@app/models';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  rooms: Room[] = [];

  private roomsService = inject(RoomsService);
  private cdr = inject(ChangeDetectorRef);  // Inyecta ChangeDetectorRef

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe((data) => {
      this.rooms = data;
      this.cdr.markForCheck();  // Forzar la detección de cambios
    });
  }
}
