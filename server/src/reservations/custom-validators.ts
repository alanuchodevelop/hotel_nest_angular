import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as moment from 'moment';

// Validador para limitar la estadía a un máximo de 3 días
@ValidatorConstraint({ name: 'MaxStay', async: false })
export class MaxStay implements ValidatorConstraintInterface {
  validate(endDate: Date, args: ValidationArguments) {
    const startDate = (args.object as any).startDate;
    const diffDays = moment(endDate).diff(moment(startDate), 'days');
    return diffDays <= 3;  // Máximo de 3 días de estadía
  }

  defaultMessage(args: ValidationArguments) {
    return 'La estadía no puede superar los 3 días.';
  }
}

// Validador para impedir reservar con más de 30 días de anticipación
@ValidatorConstraint({ name: 'BookingWindow', async: false })
export class BookingWindow implements ValidatorConstraintInterface {
  validate(endDate: Date) {
    const diffDays = moment(endDate).diff(moment(), 'days');
    return diffDays <= 30;  // No más de 30 días de anticipación
  }

  defaultMessage(args: ValidationArguments) {
    return 'No se puede reservar con más de 30 días de anticipación.';
  }
}

// Validador para asegurar que la reserva comience al menos el día siguiente
@ValidatorConstraint({ name: 'StartDateInFuture', async: false })
export class StartDateInFuture implements ValidatorConstraintInterface {
  validate(startDate: Date) {
    return moment(startDate).isAfter(moment(), 'day');
  }

  defaultMessage(args: ValidationArguments) {
    return 'La reserva debe comenzar al menos al día siguiente.';
  }
}
