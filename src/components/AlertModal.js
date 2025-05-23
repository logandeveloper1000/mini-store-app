import React, { useEffect, useState } from "react";
import "./AlertModal.css";

function AlertModal({ type, title, message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`alert-modal ${type}`}>
      <h4>{title}</h4>
      <p>{message.replace("Firebase:", "").trim()}</p>
    </div>
  );
}

export default AlertModal;
