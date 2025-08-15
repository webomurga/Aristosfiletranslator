import React, { useEffect, useState } from 'react';

const Alert = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose(); // Trigger onClose prop after 3 seconds
    }, 3000); // Auto-dismiss after 3 seconds

    return () => clearTimeout(timer); // Clean up on component unmount
  }, [onClose]);

  if (!show) return null;

  const alertClass = type ? `alert-${type}` : 'alert-info'; // Default to info

  return (
    <div className={`alert ${alertClass} custom-alert`}>
      <span className="alert-message">{message}</span>
      <button
        className="close-btn"
        onClick={() => {
          setShow(false);
          if (onClose) onClose(); // Trigger onClose on manual close
        }}
      >
        &times;
      </button>
      <style>
        {`
        .custom-alert {
          position: fixed;
          top: 70px;
          right: 20px;
          z-index: 9999;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          margin: 0;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          opacity: 0;
          animation: fadeIn 0.5s forwards;
        }

        .alert-info {
          background-color: #d9edf7;
          color: #31708f;
        }

        .alert-success {
          background-color: #dff0d8;
          color: #3c763d;
        }

        .alert-warning {
          background-color: #fcf8e3;
          color: #8a6d3b;
        }

        .alert-danger {
          background-color: #f2dede;
          color: #a94442;
        }

        .alert-message {
          font-size: 16px;
          flex: 1;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 20px;
          color: inherit;
          cursor: pointer;
          margin-left: 10px;
        }

        .close-btn:hover {
          color: #000;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
      </style>
    </div>
  );
};

export default Alert;
