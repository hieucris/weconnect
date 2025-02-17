import { TextField } from "@mui/material";

const TextInput = ({ onChange, value, name, type = "text", error }) => {
  return (
    <TextField
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      fullWidth
      slotProps={{
        input: {
          className: "h-10 px-3 py-2",
        },
        htmlInput: {
          className: "!p-0",
        },
      }}
      error={error}
    />
  );
};

export default TextInput;
