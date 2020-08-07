import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PickerToolbar from '../internal/pickers/_shared/PickerToolbar';
import type { DatePickerView } from './DatePicker';
import { useUtils } from '../internal/pickers/_shared/hooks/useUtils';
import { withDefaultProps } from '../internal/pickers/_shared/withDefaultProps';
import { ToolbarComponentProps } from '../internal/pickers/Picker/SharedPickerProps';
import { isYearAndMonthViews, isYearOnlyView } from '../internal/pickers/_helpers/date-utils';

const muiPickersComponentConfig = { name: 'MuiPickersDatePickerToolbar' };

export const useStyles = makeStyles(
  {
    root: {},
    dateTitleLandscape: {
      margin: 'auto 16px auto auto',
    },
    penIcon: {
      position: 'relative',
      top: 4,
    },
  },
  muiPickersComponentConfig
);

export const DatePickerToolbar: React.FC<ToolbarComponentProps> = withDefaultProps(
  muiPickersComponentConfig,
  ({
    date,
    views,
    isLandscape,
    isMobileKeyboardViewOpen,
    toggleMobileKeyboardView,
    toolbarFormat,
    onChange,
    toolbarPlaceholder = '––',
    toolbarTitle = 'SELECT DATE',
    ...other
  }) => {
    const utils = useUtils();
    const classes = useStyles();

    const dateText = React.useMemo(() => {
      if (!date) {
        return toolbarPlaceholder;
      }

      if (toolbarFormat) {
        return utils.formatByString(date, toolbarFormat);
      }

      if (isYearOnlyView(views as DatePickerView[])) {
        return utils.format(date, 'year');
      }

      if (isYearAndMonthViews(views as DatePickerView[])) {
        return utils.format(date, 'month');
      }

      // Little localization hack (Google is doing the same for android native pickers):
      // For english localization it is convenient to include weekday into the date "Mon, Jun 1"
      // For other locales using strings like "June 1", without weekday
      return /en/.test(utils.getCurrentLocaleCode())
        ? utils.format(date, 'normalDateWithWeekday')
        : utils.format(date, 'normalDate');
    }, [date, toolbarFormat, toolbarPlaceholder, utils, views]);

    return (
      <PickerToolbar
        className={classes.root}
        toolbarTitle={toolbarTitle}
        isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
        toggleMobileKeyboardView={toggleMobileKeyboardView}
        isLandscape={isLandscape}
        penIconClassName={classes.penIcon}
        {...other}
      >
        <Typography
          variant="h4"
          data-mui-test="datepicker-toolbar-date"
          align={isLandscape ? 'left' : 'center'}
          className={clsx({ [classes.dateTitleLandscape]: isLandscape })}
        >
          {dateText}
        </Typography>
      </PickerToolbar>
    );
  }
);
