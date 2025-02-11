import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Alert, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@services/rootApi";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
  const [register, {data,isLoading,error,isError}] = useRegisterMutation();

  function onSubmit(formData) {
    register(formData);
    console.log(formData);
  }

  console.log(data,isLoading);
  return (
    <div>
        <p className="mb-[6px] text-2xl text-dark-100">
          Adventure starts here 🚀
        </p>
        <p className="mb-[26px] text-base text-dark-100">
          Make your app management easy and fun!
        </p>
        <form
          className="gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            label="Full Name"
            name="fullName"
            Component={TextInput}
          />
          <FormField
            control={control}
            label="Email"
            name="email"
            Component={TextInput}
          />
          <FormField
            control={control}
            label="PassWord"
            name="password"
            Component={TextInput}
            type="password"
          />
          <Button variant="contained" className="w-full" type="submit">
            Sign Up
          </Button>
          {isError && <Alert severity="error">{error?.data?.message}</Alert>}
        </form>
    </div>
  );
};

export default RegisterPage;
