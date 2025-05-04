"use client";
import Button from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { config } from "@/constants/config";
import { ERROR_MESSAGE } from "@/constants/error";
import { ROLE } from "@/enums/role.enum";
import useNotification from "@/hooks/useNotification";
import { selectIsLoading, setLoading } from "@/redux/features/loading-slice";
import { AuthService } from "@/services/auth/auth.service";
import { ILogin } from "@/services/auth/interfaces/auth.interface";
import { StorageService } from "@/services/storage-service";
import React, { useCallback, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const { handleSubmit, control, getValues } = useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { NotificationComponent, showNotification } = useNotification();

  const handleLogin = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const formData = getValues();
      const requestData: ILogin = {
        username: formData.username,
        password: formData.password,
        role: ROLE.user,
      };
      const response = await AuthService.login(requestData);
      //set token
      StorageService.setToken(response);
      //then redirect to main page
      showNotification("Login successfully", 3000, "SUCCESS");
      window.location.href = "/";
    } catch (error) {
      showNotification(error.message, 5000, "ERROR");
    } finally {
      dispatch(setLoading(false));
    }
  }, [getValues, dispatch, showNotification]);

  
  return (
    <section className="overflow-hidden py-20 bg-gray-2 sm:mt-20 xl:mt-36 ">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
          <div className="text-center mb-11">
            <NotificationComponent />
            <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
              Welcome back to Opshee!
            </h2>
          </div>
          <div>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label htmlFor="email" className="block mb-2.5">
                  Username or Phone
                </label>
                <Input
                  control={control}
                  autoComplete="off"
                  rules={{
                    required: `${ERROR_MESSAGE.FIELD_REQUIRED(
                      "Username or Phone"
                    )}`,
                  }}
                  name="username"
                  type="text"
                  id="username"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="block mb-2.5">
                  Password
                </label>

                <Input
                  rules={{
                    required: `${ERROR_MESSAGE.FIELD_REQUIRED("password")}`,
                  }}
                  control={control}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
              </div>

              <Button
                isLoading={isLoading}
                text="Sign in to account"
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-orange-light-1 py-3 px-6 rounded-lg ease-out duration-200 hover:bg-orange hover:scale-[1.01] mt-7.5"
              />

              <div className="flex justify-between">
                <a
                  href="#"
                  className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  Forget your password?
                </a>

                <a
                  href="/signup"
                  className="block text-center mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  Don&apos;t have an account?
                </a>
              </div>

              <span className="relative z-1 block font-medium text-center mt-4.5">
                <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                <span className="inline-block px-3 bg-white">Or</span>
              </span>

              <div className="flex flex-col gap-4.5 mt-4.5">
                <button
                  type="button"
                  className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-3 bg-gray-1 p-3 ease-out duration-200 hover:bg-gray-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_98_7461)">
                      <mask
                        id="mask0_98_7461"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                      >
                        <path d="M20 0H0V20H20V0Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_98_7461)">
                        <path
                          d="M19.999 10.2218C20.0111 9.53429 19.9387 8.84791 19.7834 8.17737H10.2031V11.8884H15.8267C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.999 13.2661 19.999 10.2218Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2036 20C12.9586 20 15.2715 19.1111 16.9609 17.5777L13.7409 15.1332C12.8793 15.7223 11.7229 16.1333 10.2036 16.1333C8.91317 16.126 7.65795 15.7206 6.61596 14.9746C5.57397 14.2287 4.79811 13.1802 4.39848 11.9777L4.2789 11.9877L1.12906 14.3766L1.08789 14.4888C1.93622 16.1457 3.23812 17.5386 4.84801 18.512C6.45791 19.4852 8.31194 20.0005 10.2036 20Z"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9776C4.1758 11.3411 4.06063 10.673 4.05807 9.9999C4.06218 9.3279 4.1731 8.66067 4.38684 8.02221L4.38115 7.88959L1.1927 5.46234L1.0884 5.51095C0.372762 6.90337 0 8.44075 0 9.99983C0 11.5589 0.372762 13.0962 1.0884 14.4887L4.39899 11.9776Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2039 3.86663C11.6661 3.84438 13.0802 4.37803 14.1495 5.35558L17.0294 2.59997C15.1823 0.90185 12.7364 -0.0298855 10.2039 -3.67839e-05C8.31239 -0.000477835 6.45795 0.514733 4.84805 1.48799C3.23816 2.46123 1.93624 3.85417 1.08789 5.51101L4.38751 8.02225C4.79107 6.82005 5.5695 5.77231 6.61303 5.02675C7.65655 4.28119 8.91254 3.87541 10.2039 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_98_7461">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Sign In with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
