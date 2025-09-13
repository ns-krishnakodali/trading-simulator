import Image from "next/image";

import { FormEvent, type JSX } from "react";

interface IAuthForm {
  children: React.ReactNode;
  onSubmitForm: (values: FormValues) => void;
}

export type FormValues = {
  [key: string]: FormDataEntryValue;
};

export const AuthForm = ({
  children,
  onSubmitForm,
}: IAuthForm): JSX.Element => {
  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault();

    const formData: FormData = new FormData(
      event.currentTarget as HTMLFormElement,
    );
    onSubmitForm(Object.fromEntries(formData.entries()));
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:py-0">
      <form
        className="bg-slate-800 w-full max-w-md shadow-2xl rounded-xl text-white p-8 md:px-12"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col items-center gap-1 w-full">
          <Image
            src="/assets/trading-simulator.png"
            alt={"Trading Simulator"}
            width={60}
            height={60}
            priority
          />
          <h1 className="text-2xl font-bold whitespace-nowrap">
            Trading Simulator
          </h1>
        </div>
        {children}
      </form>
    </div>
  );
};
