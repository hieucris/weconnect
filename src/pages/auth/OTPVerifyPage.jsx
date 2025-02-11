import FormField from "@components/FormField";
import OTPInput from "@components/FormInput/OTPInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

const OTPVerifyPage = () => {
  const { control, handleSubmit } = useForm();
  return (
    <div>
        <p className="mb-[6px] text-2xl text-dark-100">
        Two-Step Verification 💬
        </p>
        <p className="mb-[26px] text-base text-dark-100">
        We sent a verification code to your mobile. Enter the code from the mobile in the field below.
        </p>
        <form
          className="gap-4"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <FormField
            control={control}
            label="Type your 6 digit security code"
            name="otp"
            Component={OTPInput}
          />
          <Button variant="contained" className="w-full" type="submit">
            Verify my account
          </Button>
        </form>
    </div>
  );
};

export default OTPVerifyPage;
