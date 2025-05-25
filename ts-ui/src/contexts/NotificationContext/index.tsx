"use client";

import { createContext, useContext, useState } from "react";

import { Notification, NotificationType } from "@/components";

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("Incorrect use of context");
  }
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning">("success");

  const notify = (
    message: string,
    notificationType: NotificationType = "success",
  ) => {
    setMessage(message);
    setType(notificationType);
    setVisible(true);

    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {visible && (
        <Notification
          message={message}
          type={type}
          onCloseHandler={() => setVisible(false)}
        />
      )}
    </NotificationContext.Provider>
  );
};
