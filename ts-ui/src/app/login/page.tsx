"use client";

import { useRouter } from "next/navigation";

import { AuthForm, FormInput, FormValues } from "@/components";
import { useNotificationContext } from "@/contexts";

const LoginPage = () => {
  const { notify } = useNotificationContext();
  const router = useRouter();

  const onLogin = (formValues: FormValues): void => {
    const email: string = formValues["email"] as string;
    const password: string = formValues["password"] as string;

    notify("Sample Notification", "success");
    console.log(email, password);
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
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-sm text-white bg-blue-600
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 cursor-pointer"
        >
          Login
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-slate-400">
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
