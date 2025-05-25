"use client";

import { useRouter } from "next/navigation";

import { AuthForm, FormInput, FormValues } from "@/components";
import { useNotificationContext } from "@/contexts";
import { validateSignUpDetails } from "@/utils";

const SignUpPage = () => {
  const { notify } = useNotificationContext();
  const router = useRouter();

  const onSignup = (formValues: FormValues): void => {
    const username: string = formValues["username"] as string;
    const email: string = formValues["email"] as string;
    const password: string = formValues["password"] as string;
    const confirmPassword: string = formValues["confirm-password"] as string;

    const [isValid, message] = validateSignUpDetails(
      username,
      email,
      password,
      confirmPassword,
    );

    if (!isValid) {
      notify(message, "error");
      return;
    }

    console.log(username, email, password, confirmPassword);
  };

  return (
    <AuthForm onSubmitForm={onSignup}>
      <div id="form-inputs" className="flex flex-col gap-6 mt-4">
        <FormInput
          id="username"
          name="username"
          label="User Name"
          type="text"
          required
        />
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
        <FormInput
          id="confirm-password"
          name="confirm-password"
          label="Confirm Password"
          type="password"
          required
        />
      </div>
      <div className="mt-12">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600
          hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 cursor-pointer"
        >
          Create Account
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-slate-400">
        <span className="mr-1">Already have an account?</span>
        <button
          type="button"
          className="font-medium text-blue-500 hover:text-blue-400 focus:outline-none cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login here
        </button>
      </p>
    </AuthForm>
  );
};

export default SignUpPage;
