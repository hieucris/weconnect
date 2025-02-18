import FormField from "@components/FormField";
import OTPInput from "@components/FormInput/OTPInput";
import { Alert, Box, Button } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackBarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyOTP, { data, error, isError, isSuccess }] =
    useVerifyOTPMutation();
  const onSubmit = (formData) => {
    verifyOTP({ email: location.state.email, otp: formData.otp });
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        openSnackbar({
          message: errors?.data?.message,
          type: "error",
        }),
      );
    }
    if (isSuccess) {
      console.log("data?.payload?.access_token", data?.payload?.access_token);
      dispatch(login(data));
      navigate("/");
    }
  }, [isSuccess, navigate, errors?.data?.message, isError, dispatch, data]);
  return (
    <div>
      <p className="mb-[6px] text-2xl text-dark-100">
        Two-Step Verification 💬
      </p>
      <p className="mb-[26px] text-base text-dark-100">
        We sent a verification code to your mobile. Enter the code from the
        mobile in the field below.
      </p>
      <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          label="Type your 6 digit security code"
          name="otp"
          Component={OTPInput}
        />
        <Button variant="contained" className="w-full" type="submit">
          Verify my account
        </Button>
        <Box className="mt-4">
          {isError && <Alert severity="error">{error?.data?.message}</Alert>}
        </Box>
      </form>
    </div>
  );
};

export default OTPVerifyPage;
