"use client";

import { useRouter } from "next/navigation";

import { type JSX, useState } from "react";

import { AuthForm, FormInput, FormValues, Loader } from "@/components";
import { useNotificationContext } from "@/contexts";
import { apiService, isValidEmail, setAuthToken } from "@/utils";

const LoginPage = (): JSX.Element => {
  const { notify } = useNotificationContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async (formValues: FormValues): Promise<void> => {
    const email: string = formValues["email"] as string;
    const password: string = formValues["password"] as string;
    const rememberMe: boolean = !!formValues["remember-me"];

    let [isValid, message]: [boolean, string] = [false, ""];
    if (!email || !password) message = "All fields are required";
    else if (!isValidEmail(email)) message = "Invalid email format.";
    else isValid = true;

    if (!isValid) {
      notify(message, "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.post<{ token: string }>(
        "/auth/login",
        { email, password, rememberMe },
        { withAuth: false },
      );
      setAuthToken(response?.token);
      router.push("/dashboard");
    } catch (error: unknown) {
      notify(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "Login failed",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm onSubmitForm={onLogin}>
      <div id="form-inputs" className="flex flex-col gap-6 mt-4">
        <FormInput
          id="email"
          name="email"
          label="Email"
          type="email"
          required
        />
        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          required
        />
      </div>
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center ml-0.5">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-700 cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-slate-400"
          >
            Remember me
          </label>
        </div>
      </div>
      <div className="mt-12">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-base text-white bg-blue-600
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 cursor-pointer"
        >
          {isLoading ? (
            <Loader width={24} height={24} stroke="#FFFFFF" />
          ) : (
            <>Login</>
          )}
        </button>
      </div>
      <p className="my-4 text-center text-sm text-slate-400">
        <span className="mr-1">Don&apos;t have an account?</span>
        <button
          type="button"
          className="font-medium text-blue-500 hover:text-blue-400 focus:outline-none cursor-pointer"
          onClick={() => router.push("/sign-up")}
        >
          Sign up here
        </button>
      </p>
    </AuthForm>
  );
};

export default LoginPage;
