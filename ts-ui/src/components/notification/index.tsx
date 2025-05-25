import Image from "next/image";

import React from "react";

export type NotificationType = "error" | "success" | "warning";

interface INotification {
  message: string;
  type?: NotificationType;
  onCloseHandler: () => void;
}

export const Notification = ({
  message,
  type = "success",
  onCloseHandler,
}: INotification) => {
  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between border px-4 py-3 rounded-md shadow-md min-w-[300px] ${typeStyles[type]}`}
      role="alert"
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onCloseHandler} className="ml-4 cursor-pointer">
        <Image src="/icons/close.svg" alt="Close Icon" width={20} height={20} />
      </button>
    </div>
  );
};
