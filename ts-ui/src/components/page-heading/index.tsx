import { type JSX } from "react";

interface IPageHeading {
  id?: string;
  heading: string;
}

export const PageHeading = ({ id, heading }: IPageHeading): JSX.Element => {
  return (
    <h1 id={id} className="text-center text-3xl font-bold text-gray-800 mb-8">
      {heading}
    </h1>
  );
};
