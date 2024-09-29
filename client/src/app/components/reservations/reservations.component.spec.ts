import {ReservationsComponent} from "@app/components/reservations/reservations.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReservationsService, RoomsService, UsersService} from "@app/services";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {of} from "rxjs";
import {RoomType} from "@app/models";

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;
  let reservationsService: jasmine.SpyObj<ReservationsService>;
  let usersService: jasmine.SpyObj<UsersService>;
  let roomsService: jasmine.SpyObj<RoomsService>;

  beforeEach(async () => {
    const reservationsSpy = jasmine.createSpyObj('ReservationsService', ['getReservations', 'updateReservation', 'deleteReservation']);
    const usersSpy = jasmine.createSpyObj('UsersService', ['getUsers']);
    const roomsSpy = jasmine.createSpyObj('RoomsService', ['getAvailableRooms']);

    await TestBed.configureTestingModule({
      imports: [ReservationsComponent],  // Cambiar 'declarations' a 'imports'
      providers: [
        { provide: ReservationsService, useValue: reservationsSpy },
        { provide: UsersService, useValue: usersSpy },
        { provide: RoomsService, useValue: roomsSpy },
        FormBuilder,
        ToastrService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    reservationsService = TestBed.inject(ReservationsService) as jasmine.SpyObj<ReservationsService>;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    roomsService = TestBed.inject(RoomsService) as jasmine.SpyObj<RoomsService>;
  });


  it('should load reservations, users, and rooms on init', () => {
      reservationsService.getReservations.and.returnValue(of(mockReservations)); // Usar los mocks
      usersService.getUsers.and.returnValue(of(mockUsers)); // Usar los mocks

      component.ngOnInit();

      expect(reservationsService.getReservations).toHaveBeenCalled();
      expect(usersService.getUsers).toHaveBeenCalled();
      expect(roomsService.getAvailableRooms).toHaveBeenCalled();
    });


    it('should update reservation when saveReservation is called and in edit mode', () => {
    component.isEditMode = true;
    component.reservationToEdit = mockReservations[0]; // Usar el primer mock de reservación

    component.reservationForm.setValue({
      userId: '7',
      roomId: '2',
      startDate: '2024-09-29',
      endDate: '2024-09-30'
    });

    reservationsService.updateReservation.and.returnValue(of(mockReservations[0])); // Assume success

    component.saveReservation();

    expect(reservationsService.updateReservation).toHaveBeenCalledWith(18, jasmine.anything());
  });

  it('should delete a reservation when deleteReservation is called', () => {
    component.idForDeleteSelected = 18; // Mock ID

    reservationsService.deleteReservation.and.returnValue(of({})); // Assume success

    component.deleteReservation();

    expect(reservationsService.deleteReservation).toHaveBeenCalledWith(18);
  });
});

export const mockReservations = [
  {
    id: 18,
    userId: 7,
    roomId: 2,
    start_date: '2024-09-29',
    end_date: '2024-09-30',
    status: 'Pending',
    created_at: '2024-09-28T06:18:30.827Z',
    updated_at: '2024-09-28T06:18:30.827Z'
  },
  {
    id: 19,
    userId: 8,
    roomId: 3,
    start_date: '2024-10-01',
    end_date: '2024-10-03',
    status: 'Confirmed',
    created_at: '2024-09-28T07:18:30.827Z',
    updated_at: '2024-09-28T07:18:30.827Z'
  }
];

export const mockRooms = [
  {
    id: 2,
    room_number: '102',
    description: 'Single Room',  // Usar el enum en lugar de un string directo
    available: false,
    created_at: '2024-09-27T02:31:50.149Z',
    updated_at: '2024-09-27T02:31:50.149Z'
  },
  {
    id: 3,
    room_number: '103',
    description: 'Single Room',  // Usar el enum en lugar de un string directo
    available: true,
    created_at: '2024-09-27T02:31:50.149Z',
    updated_at: '2024-09-27T02:31:50.149Z'
  }
];


export const mockUsers = [
  {
    id: 7,
    name: 'John Doe',
    email: 'john@example.com',
    phone_number: '123456789',
    created_at: '2024-09-27T20:54:43.867Z',
    updated_at: '2024-09-27T20:54:43.867Z'
  },
  {
    id: 8,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone_number: '987654321',
    created_at: '2024-09-27T21:54:43.867Z',
    updated_at: '2024-09-27T21:54:43.867Z'
  }
];
