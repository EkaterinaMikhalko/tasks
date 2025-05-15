import React from 'react';
import LoginForm from './LoginForm';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>Войти</h2>
          <LoginForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;