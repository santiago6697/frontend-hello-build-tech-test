import _ from 'lodash';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AUTH_FORM, AUTH_FORM_LABEL } from '../../../utils/constants';
import Login from '../../collections/Forms/Login';
import SignUp from '../../collections/Forms/SignUp';
import githubLogo from '../../../assets/images/github-logo.svg';

const Auth = ({ authSuccess = false, onLogin = () => {}, onSignUp = () => {} }) => {
  const [form, setForm] = useState(AUTH_FORM.LOGIN);

  const handleFormChange = () => {
    if (form === AUTH_FORM.LOGIN) {
      setForm(AUTH_FORM.SIGNUP);
      return;
    }

    setForm(AUTH_FORM.LOGIN);
  };

  const handleLabel = () => {
    if (form === AUTH_FORM.LOGIN) {
      return _.toLower(AUTH_FORM_LABEL.SIGNUP);
    }

    return _.toLower(AUTH_FORM_LABEL.LOGIN);
  };

  const handleSignUp = (values) => {
    onSignUp(values);
  };

  const handleLogin = (values) => {
    onLogin(values);
  };

  return (
    <Modal show={!authSuccess} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>{AUTH_FORM_LABEL[form]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form === AUTH_FORM.LOGIN && <Login onSubmit={handleLogin} />}
        {form === AUTH_FORM.SIGNUP && <SignUp onSubmit={handleSignUp} />}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        <Button onClick={handleFormChange} variant="link">{`Or ${handleLabel()}`}</Button>
        {/* <Button onClick={handleSubmit} variant="primary">
            Submit
          </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default Auth;
