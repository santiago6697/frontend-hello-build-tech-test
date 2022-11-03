import React from 'react';
import Alert from 'react-bootstrap/Alert';

const DismissibleAlert = ({ show = false, message = '', onClick = () => {} }) => {
  return (
    <div className="w-25" style={{ position: 'fixed', top: 80, right: 20, zIndex: 1500 }}>
      <Alert show={show} variant="danger" onClose={onClick} dismissible>
        {message}
      </Alert>
    </div>
  );
};

export default DismissibleAlert;
