import { ClickAwayListener, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Column } from 'react-table';
import 'dayjs/locale/fa';

interface Props {
  column: Column;
}

const DateFilter = ({ column: { id } }: Props) => {
  const fromId = `${id}From`;
  const toId = `${id}To`;
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<(string | null)[]>([searchParams.get(fromId), searchParams.get(toId)]);
  const [isOpenFrom, setIsOpenFrom] = useState<boolean>(false);
  const [isOpenTo, setIsOpenTo] = useState<boolean>(false);

  const setParams = (name: string, value: string | null) => {
    if (value) {
      const date = new Date(String(value)).toISOString();
      searchParams.set(name, date);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <Grid xs={6} sm={3} item>
        <ClickAwayListener onClickAway={() => setIsOpenFrom(false)}>
          <Stack spacing={1}>
            <InputLabel htmlFor={fromId}>From Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fa">
              <DatePicker
                mask="____/__/__"
                value={value?.[0] || ""}
                maxDate={value?.[1] || ""}
                onChange={(value) => {
                  if (value && value !== "Invalid Date") {
                    setValue((old = []) => [value, old[1]]);
                  }
                  setParams(fromId, value);
                  setIsOpenFrom(false);
                }}
                PopperProps={{
                  open: isOpenFrom,
                }}
                InputProps={{
                  onFocus: () => {
                    setIsOpenFrom(true);
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    name={fromId}
                    id={fromId}
                    error={false}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </ClickAwayListener>
      </Grid>
      <Grid xs={6} sm={3} item>
        <ClickAwayListener onClickAway={() => setIsOpenTo(false)}>
          <Stack spacing={1}>
            <InputLabel htmlFor={fromId}>toDate</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fa">
              <DatePicker
                mask="____/__/__"
                value={value?.[1] || ""}
                minDate={value?.[0] || ""}
                onChange={(value) => {
                  if (value && value !== "Invalid Date") {
                    setValue((old = []) => [old[0], value]);
                  }
                  setParams(toId, value);
                  setIsOpenTo(false);
                }}
                PopperProps={{
                  open: isOpenTo,
                }}
                InputProps={{
                  onFocus: () => {
                    setIsOpenTo(true);
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    name={toId}
                    id={toId}
                    error={false}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </ClickAwayListener>
      </Grid>
    </>
  );
};

export default DateFilter;
