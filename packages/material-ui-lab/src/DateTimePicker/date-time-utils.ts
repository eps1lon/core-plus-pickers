import { ParsableDate } from '../internal/pickers/constants/prop-types';
import { MuiPickersAdapter } from '../internal/pickers/_shared/hooks/useUtils';
import { DateValidationProps, validateDate } from '../internal/pickers/_helpers/date-utils';
import { TimeValidationProps, validateTime } from '../internal/pickers/_helpers/time-utils';

export function validateDateAndTime<TDate>(
  utils: MuiPickersAdapter,
  value: unknown | ParsableDate,
  {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast,
    ...timeValidationProps
  }: DateValidationProps<TDate> & TimeValidationProps<TDate>
) {
  const dateValidationResult = validateDate(utils, value, {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast,
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime(utils, value, timeValidationProps);
}

export type DateAndTimeValidationError = ReturnType<typeof validateDateAndTime>;
