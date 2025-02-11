import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
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
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <FormField
            control={control}
            label="Full Name"
            name="fullname"
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
        </form>
    </div>
  );
};

export default RegisterPage;
