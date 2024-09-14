import React, { useEffect } from 'react';
import styles from './Alert.module.css';

const Alert = ({ type, message, strongMessage, icon, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertClass = `${styles.alert} ${styles[`alert${type.charAt(0).toUpperCase() + type.slice(1)}`]}`;
  const iconClass = `${icon} ${styles.startIcon}`;

  return (
    <div className="col-sm-12">
      <div className={alertClass} role="alert">
        <button type="button" className={styles.close} onClick={onClose}>
          <i className={`fa fa-times ${styles.faTimes}`}></i>
          <span className="sr-only">Close</span>
        </button>
        <i className={iconClass}></i>
        <strong className="font__weight-semibold">{strongMessage}</strong> {message}
      </div>
    </div>
  );
};

export default Alert;
