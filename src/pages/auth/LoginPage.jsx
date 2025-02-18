import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Link, Typography } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackBarSlice";
import { useLoginMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { data, error, isSuccess, isError }] = useLoginMutation();

  const onSubmit = (formDate) => {
    login(formDate);
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

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
      dispatch(
        openSnackbar({
          message: data.message,
        }),
      );
      navigate("/verify-otp", { state: { email: getValues("email") } });
    }
  }, [
    isSuccess,
    navigate,
    errors?.data?.message,
    isError,
    dispatch,
    getValues,
    data,
  ]);
  return (
    <div>
      <p className="mb-[6px] text-2xl text-dark-100">
        Welcome to WeConnect! 👋
      </p>
      <p className="mb-[26px] text-base text-dark-100">
        Please sign in to your account and start the adventure
      </p>
      <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          label="Email"
          name="email"
          Component={TextInput}
          error={errors.email}
        />
        <FormField
          control={control}
          label="PassWord"
          name="password"
          Component={TextInput}
          type="password"
          error={errors.password}
        />
        <Button variant="contained" className="w-full" type="submit">
          Sign in
        </Button>
        <Box className="mt-4">
          {isError && <Alert severity="error">{error?.data?.message}</Alert>}
        </Box>
        <Box className="mt-4">
          <Typography component="p">
            You do not have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up instead
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default LoginPage;
