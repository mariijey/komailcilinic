import { TextField, InputAdornment, Grid, InputLabel, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'utils/helpers/main';
import { Column } from 'react-table';
interface Props {
  column: Column;
}

const RangeNumberFilter = ({ column: { id } }: Props) => {
  const fromId = `${id}From`;
  const toId = `${id}To`;
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<(string | null)[]>([searchParams.get(fromId), searchParams.get(toId)]);

  const removeFilter = (id: string) => {
    searchParams.delete(id);
    setSearchParams(searchParams);
  };
  const setParams = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };
  return (
    <>
      <Grid xs={6} sm={3} item>
        <Stack spacing={1}>
          <InputLabel htmlFor={fromId}>ToPrice</InputLabel>
          <TextField
            fullWidth
            id={fromId}
            name={fromId}
            value={value?.[0] || ""}
            onChange={(e) => {
              const val = e.target.value;
              setValue((old = []) => [val, old[1]]);
              searchParams.set(fromId, val);
            }}
            onBlur={({ target }: any) => setParams(fromId, target.value)}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ClearIcon
                    color="error"
                    fontSize="small"
                    style={{
                      opacity: isEmpty(value?.[0]) ? 0 : 1,
                      cursor: "pointer",
                    }}
                    onClick={() => removeFilter(fromId)}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
      <Grid xs={6} sm={3} item>
        <Stack spacing={1}>
          <InputLabel htmlFor={fromId}>From Price</InputLabel>
          <TextField
            fullWidth
            id={toId}
            name={toId}
            value={value?.[1] || ""}
            onChange={(e) => {
              const val = e.target.value;
              setValue((old = []) => [old[0], val]);
              searchParams.set(toId, val);
            }}
            size="small"
            onBlur={({ target }: any) => setParams(toId, target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ClearIcon
                    color="error"
                    fontSize="small"
                    style={{
                      opacity: isEmpty(value?.[1]) ? 0 : 1,
                      cursor: "pointer",
                    }}
                    onClick={() => removeFilter(toId)}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default RangeNumberFilter;
