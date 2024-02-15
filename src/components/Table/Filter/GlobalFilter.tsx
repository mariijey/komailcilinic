import { SearchOutlined } from "@ant-design/icons";
import { OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function GlobalFilter({ ...other }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("searchKey"));

  return (
    <OutlinedInput
      value={value || ""}
      onChange={({ target }: any) => {
        const { value } = target as HTMLInputElement;
        setValue(value);
        searchParams.set("searchKey", value);
      }}
      onBlur={() => setSearchParams(searchParams)}
      onKeyPress={(event) => {
        if (event.key === "Enter") setSearchParams(searchParams);
      }}
      placeholder={`search...`}
      id="start-adornment-email"
      startAdornment={<SearchOutlined />}
      {...other}
    />
  );
}
