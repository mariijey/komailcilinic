import { Grid, InputAdornment, InputLabel, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'utils/helpers/main';
import { Column } from 'react-table';
interface Props {
  column: Column;
}

const SimpleTextFilter = ({ column: { Header, id } }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string | null>(id ? searchParams.get(id) : '');

  const setChangesFilterParam = ({ target }: any) => {
    const { value } = target as HTMLInputElement;
    setValue(value || null);
    id && searchParams.set(id, value);
  };

  const removeFilter = (): void => {
    id && searchParams.delete(id);
    setSearchParams(searchParams);
    setValue('');
  };

  return (
    <Grid xs={6} sm={3} item>
      <Stack spacing={1}>
        <InputLabel htmlFor={id}>{Header?.toString()}</InputLabel>
        <TextField
          fullWidth
          id={id}
          name={id}
          value={value || ''}
          onChange={setChangesFilterParam}
          size="small"
          onBlur={() => setSearchParams(searchParams)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ClearIcon
                  color="error"
                  fontSize="small"
                  className="closeIcon"
                  style={{
                    opacity: isEmpty(value) ? 0 : 1
                  }}
                  onClick={removeFilter}
                />
              </InputAdornment>
            )
          }}
        />
      </Stack>
    </Grid>
  );
};

export default SimpleTextFilter;
