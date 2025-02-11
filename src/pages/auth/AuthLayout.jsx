import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const AuthLayout = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-dark-200">
      <div className="rounded-md bg-white px-10 py-8">
        <img src="./logo.png" className="m-auto mb-6" />
        <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
      </div>
    </div>
  );
};
export default AuthLayout;
