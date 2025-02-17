import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Alert, Box, Button, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@services/rootApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackBarSlice";
import { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { data = {}, error, isSuccess, isError }] =
    useRegisterMutation();

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
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
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function onSubmit(formData) {
    register(formData);
    console.log(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/login");
    }
  }, [isSuccess, data.message, navigate, dispatch]);

  return (
    <div>
      <p className="mb-[6px] text-2xl text-dark-100">
        Adventure starts here 🚀
      </p>
      <p className="mb-[26px] text-base text-dark-100">
        Make your app management easy and fun!
      </p>
      <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          label="Full Name"
          name="fullName"
          Component={TextInput}
          error={errors.fullName}
        />
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
          Sign Up
        </Button>
        <Box className="mt-4">
          {isError && <Alert severity="error">{error?.data?.message}</Alert>}
        </Box>
        <Box className="mt-4">
          <Typography component="p">
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in instead
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default RegisterPage;
