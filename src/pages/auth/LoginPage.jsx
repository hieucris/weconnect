import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Box, Button, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  return (
    <div>
      <p className="mb-[6px] text-2xl text-dark-100">
        Welcome to WeConnect! 👋
      </p>
      <p className="mb-[26px] text-base text-dark-100">
        Please sign in to your account and start the adventure
      </p>
      <form
        className="gap-4"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
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
          Sign in
        </Button>
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
