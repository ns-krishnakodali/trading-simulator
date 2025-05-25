import { HTMLInputTypeAttribute, JSX } from "react";

interface IFormInput {
  id: string;
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  id,
  name,
  label,
  type = "text",
  required = true,
  className,
}: IFormInput): JSX.Element => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm ml-0.5 font-medium text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={type}
        className="mt-1 block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        required={required}
      />
    </div>
  );
};
