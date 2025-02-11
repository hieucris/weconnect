import { TextField } from "@mui/material";

const TextInput = ({ onChange, value, name, type = "text" }) => {
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
    />
  );
};

export default TextInput;
