import { IsDate, IsInt, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { MaxStay, StartDateInFuture, BookingWindow } from './custom-validators';

export class CreateReservationDto {
  @IsInt()
  readonly userId: number;

  @IsInt()
  readonly roomId: number;

  @IsDate()
  @Type(() => Date)
  @Validate(StartDateInFuture)  // Valida que la fecha de inicio sea en el futuro
  readonly startDate: Date;

  @IsDate()
  @Type(() => Date)
  @Validate(MaxStay)  // Valida que no supere los 3 días
  @Validate(BookingWindow)  // Valida que no se reserve con más de 30 días de anticipación
  readonly endDate: Date;

  @IsString()
  readonly status: string;
}
