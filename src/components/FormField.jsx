import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, type, Component }) => {
  return (
    <div className="mb-4">
      <p className="mb-1 text-sm text-dark-100">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              control={control}
              type={type}
            />
          );
        }}
      />
    </div>
  );
};
export default FormField;
