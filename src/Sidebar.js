import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="logo">Aristo</h1>
      {/* Link to MainContent page */}
      <Link to="/" className="sidebar-item left-align">
        📚 <span className="sidebar-text">Translate</span>
      </Link>
      <Link to="/faq" className="sidebar-item left-align">
        ❓ <span className="sidebar-text">  FAQ</span>
      </Link>
      {/* Link to Billing page */}
      <Link to="/billing" className="sidebar-item left-align">
        💳 <span className="sidebar-text">Billing</span>
      </Link>

      <style>
        {`
          .sidebar {
            width: 250px;
            background: #008b8b;
            color: white;
            padding: 0 20px;
            min-height: 100vh;
            text-align: center;
            position: fixed;
            top: 0;
            left: 0;
            transform: translateX(-100%);
            animation: slideIn 0.3s forwards;
          }
          .logo {
            font-size: 50px;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
            animation: fadeIn 1s ease-out;
          }
          .sidebar-item {
            margin: 20px 0;
            cursor: pointer;
            font-size: 18px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            transition: transform 0.2s ease-in-out, background-color 0.3s ease;
          }
          .sidebar-text {
            margin-left: 10px;
          }
          .sidebar-item:hover {
            transform: scale(1.05);
            background-color: rgba(0, 139, 139, 0.1);
          }
          .left-align {
            text-align: left;
            justify-content: flex-start;
          }

          /* Animation for sidebar entry */
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          /* Animation for logo fade-in */
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
