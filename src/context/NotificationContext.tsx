// filepath: c:\Users\david\Desktop\FrontendWeb\src\context\NotificationContext.tsx
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import Toast, { ToastProps } from '../common/Notification/Notification';

interface NotificationContextType {
  showToast: (options: Omit<ToastProps, 'onClose'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  const showToast = useCallback((options: Omit<ToastProps, 'onClose'>) => {
    setToastProps({ ...options, onClose: () => setToastProps(null) });
  }, []);

  const handleClose = () => {
    setToastProps(null);
  };

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      {toastProps && (
        <Toast
          message={toastProps.message}
          type={toastProps.type}
          duration={toastProps.duration}
          onClose={handleClose} // Use the internal handleClose
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};