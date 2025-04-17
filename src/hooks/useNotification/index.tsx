import { useCallback, useEffect, useState } from "react";

enum NOTIFYCATION_TYPE {
  "SUCCESS" = "SUCCESS",
  "ERROR" = "ERROR",
}

interface INotificationProps {
  duration: number;
  message: string;
  state: keyof typeof NOTIFYCATION_TYPE;
}

const useNotification = () => {
  const [notification, setNotification] = useState<INotificationProps | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback(
    (
      message: string,
      duration: number = 3000,
      state: keyof typeof NOTIFYCATION_TYPE
    ) => {
      setIsVisible(true);
      setNotification({ message: message, duration: duration, state: state });
    },
    []
  );

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    let clearTimer: NodeJS.Timeout;

    if (isVisible && notification) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);

        clearTimer = setTimeout(() => {
          setNotification(null);
        }, 300);
      }, notification.duration);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(clearTimer);
    };
  }, [isVisible, notification]);

  const NotificationComponent = useCallback(() => {
    if (!notification) return null;

    const isSuccess = notification.state === "SUCCESS";

    return (
      <div
        className={`fixed z-[1000] top-50 right-4 ${
          isVisible ? "animate-slideInRight" : "animate-slideOutRight"
        }`}
      >
        <div className="bg-white text-gray-800 px-4 py-4 rounded-xl shadow-xl relative overflow-hidden border border-gray-100">
          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-1 bg-orange-light-1"
            style={{
              animation: `progressBar ${notification.duration}ms linear forwards`,
            }}
          />

          <div className="flex items-start space-x-3">
            {/* Improved Icon */}
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess ? (
                <div className="h-6 w-6 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#22bb33"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="h-6 w-6 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#EE4D2D"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="flex-1">
              <p className="text-base font-medium">{notification.message}</p>
            </div>

            {/* Improved Close button */}
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => setNotification(null), notification.duration);
              }}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <div className="h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }, [notification, isVisible]);

  return { showNotification, NotificationComponent };
};

export default useNotification;
