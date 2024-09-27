import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  readonly userId: number;

  @IsInt()
  readonly roomId: number;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;

  @IsString()
  readonly status: string;
}
