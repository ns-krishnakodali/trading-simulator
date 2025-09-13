import Image from "next/image";
import { type JSX } from "react";

export type NotificationType = "info" | "error" | "success" | "warning";

interface INotification {
  message: string;
  type?: NotificationType;
  onCloseHandler: () => void;
}

export const Notification = ({
  message,
  type = "success",
  onCloseHandler,
}: INotification): JSX.Element => {
  const typeStyles = {
    info: "bg-blue-100 text-blue-800 border-blue-500",
    success: "bg-green-100 text-green-800 border-green-500",
    error: "bg-red-100 text-red-800 border-red-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center border px-4 py-3 rounded-md shadow-md min-w-[300px] 
        ${typeStyles[type]}`}
      role="alert"
    >
      <span className="flex-1 text-center text-sm font-medium">{message}</span>
      <button onClick={onCloseHandler} className="ml-auto pl-4 cursor-pointer">
        <Image src="/icons/close.svg" alt="Close Icon" width={20} height={20} />
      </button>
    </div>
  );
};
