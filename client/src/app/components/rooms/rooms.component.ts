import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {RoomsService} from '@app/services';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '@app/components/header/header.component';
import {Room, RoomType} from '@app/models';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  rooms: Room[] = [];
  showModalDelete = false;
  showModalEdit = false;
  idForDeleteSelected: number = 0;
  selectedRoom: Partial<Room> = {
    room_number: '',
    description: RoomType.Single,
    available: true
  };
  isEditMode = false;  // Define si está en modo edición o creación
  RoomType = RoomType;


  private roomsService = inject(RoomsService);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomsService.getRooms().subscribe((data) => {
      this.rooms = data;
      this.cdr.markForCheck();
    });
  }

  openModalDelete(id: number) {
    this.showModalDelete = true;
    this.idForDeleteSelected = id;
  }

  closeModalDelete() {
    this.showModalDelete = false;
    this.idForDeleteSelected = 0;
  }

  openModalEdit(room?: Room) {
    if (room) {
      this.isEditMode = true;
      this.selectedRoom = {...room};
    } else {
      this.isEditMode = false;
      this.selectedRoom = {
        room_number: '',
        description: RoomType.Single,  // Valor predeterminado del enum
        available: true
      };
    }
    this.showModalEdit = true;
  }


  closeModalEdit() {
    this.showModalEdit = false;
    this.selectedRoom = {};
  }

  saveRoom() {
    if (this.selectedRoom) {
      if (this.isEditMode) {
        // Actualizar habitación existente
        this.roomsService.updateRoom(this.selectedRoom.id as number, this.selectedRoom as Room).subscribe({
          next: () => {
            this.toastr.success('Habitación actualizada con éxito');
            this.getRooms();
            this.closeModalEdit();
          },
          error: (error) => {
            this.toastr.error('Error al actualizar la habitación');
            console.error(error);
          }
        });
      } else {
        // Agregar nueva habitación
        this.roomsService.createRoom(this.selectedRoom as Room).subscribe({
          next: () => {
            this.toastr.success('Habitación creada con éxito');
            this.getRooms();
            this.closeModalEdit();
          },
          error: (error) => {
            this.toastr.error('Error al crear la habitación');
            console.error(error);
          }
        });
      }
    }
  }

  deleteRoom() {
    this.roomsService.getRoomById(this.idForDeleteSelected).subscribe({
      next: (room) => {
        if (!room.available) {
          this.toastr.error('No se puede eliminar la habitación. No está disponible.');
          this.closeModalDelete();
          return;
        }

        this.roomsService.deleteRoom(this.idForDeleteSelected).subscribe({
          next: () => {
            this.toastr.success('Habitación eliminada con éxito');
            this.getRooms();
            this.closeModalDelete();
          },
          error: (error) => {
            this.toastr.error('Error al eliminar la habitación');
            console.error(error);
            this.closeModalDelete();
          }
        });
      },
      error: (error) => {
        this.toastr.error('Error al obtener los detalles de la habitación');
        console.error(error);
        this.closeModalDelete();
      }
    });
  }

}
