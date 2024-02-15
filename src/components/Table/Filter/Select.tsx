import { Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { isEmpty } from 'utils/helpers/main';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InputFieldSkeleton } from '../../Skeletons/TextFieldSkeleton';

interface SelectColumnFilterProps {
  options: any;
  id: string;
  Header: string;
  noLabelLoading?: boolean;
  loading?: boolean;
}

const SelectFilter = ({ options, id, Header, noLabelLoading = false, loading = false }: SelectColumnFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(searchParams.get(id) || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setChangesFilterParam = ({ target }: any) => {
    const { value: inputValue } = target as HTMLInputElement;

    if (isEmpty(inputValue)) {
      setValue('');
      searchParams.delete(id);
    } else {
      setValue(inputValue);
      searchParams.set(id, inputValue);
    }

    setSearchParams(searchParams);
  };

  return (
    <Grid xs={6} sm={3} item>
      <Stack spacing={1}>
        <InputFieldSkeleton loading={loading} noLabelLoading={noLabelLoading}>
          <>
            <InputLabel htmlFor={id}>{Header}</InputLabel>
            <Select
              fullWidth
              id={id}
              name={id}
              defaultValue=""
              value={value}
              onChange={setChangesFilterParam}
              displayEmpty
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {options?.length &&
                options.map((option: any, key: number) => (
                  <MenuItem key={key} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))}
            </Select>
          </>
        </InputFieldSkeleton>
      </Stack>
    </Grid>
  );
};

export default SelectFilter;
