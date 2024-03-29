import React, { useReducer, useState, useEffect } from 'react';
import classes from "./LogIn.module.css";
import { regexUsername, regexPassword, regexEmail } from '../../helpers/constants';
import Input from '../UI/Input';
import { sendRequest } from '../../helpers/sendRequest';

const formReducer = (state, action) => {
  if (action.type === "USERNAME_INPUT") {
    return {
      username: action.val,
      isUsernameValid: regexUsername.test(action.val),
      password: state.password,
      isPasswordValid: state.isPasswordValid,
      email: state.email,
      isEmailValid: state.isEmailValid
    };
  }

  if (action.type === "USERNAME_BLUR") {
    return {
      username: state.username,
      isUsernameValid: regexUsername.test(state.username),
      password: state.password,
      isPasswordValid: state.isPasswordValid,
      email: state.email,
      isEmailValid: state.isEmailValid
    };
  }

  if (action.type === "PASSWORD_INPUT") {
    return {
      username: state.username,
      isUsernameValid: state.isUsernameValid,
      password: action.val,
      isPasswordValid: regexPassword.test(action.val),
      email: state.email,
      isEmailValid: state.isEmailValid
    };
  }

  if (action.type === "PASSWORD_BLUR") {
    return {
      username: state.username,
      isUsernameValid: state.isUsernameValid,
      password: state.password,
      isPasswordValid: regexPassword.test(state.password),
      email: state.email,
      isEmailValid: state.isEmailValid
    };
  }

  if (action.type === "EMAIL_INPUT") {
    return {
      username: state.username,
      isUsernameValid: state.isUsernameValid,
      password: state.password,
      isPasswordValid: state.isPasswordValid,
      email: action.val,
      isEmailValid: regexEmail.test(action.val)
    };
  }

  if (action.type === "EMAIL_BLUR") {
    return {
      username: state.username,
      isUsernameValid: state.isUsernameValid,
      password: state.password,
      isPasswordValid: state.password,
      email: state.email,
      isEmailValid: regexEmail.test(state.email)
    };
  }

  return {
    username: "",
    isUsernameValid: null,
    password: "",
    isPasswordValid: null,
    email: "",
    isEmailValid: null
  };
};


const Register = (props) => {

  const [form, dispatchForm] = useReducer(formReducer, {
    username: "",
    isUsernameValid: null,
    password: "",
    isPasswordValid: null,
    email: "",
    isEmailValid: null
  });

  const [isFormValid, setIsFormValid] = useState(null);

  const usernameChangeHandler = (event) => {
    dispatchForm({ type: "USERNAME_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: "PASSWORD_INPUT", val: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchForm({ type: "EMAIL_INPUT", val: event.target.value });
  };

  const validateUsernameHandler = () => {
    dispatchForm({ type: "USERNAME_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: "PASSWORD_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: "EMAIL_BLUR" });
  };


  const register = async () => {

    const body = JSON.stringify({
      email: form.email,
      password: form.password,
      username: form.username
    });


    const result = await sendRequest("POST", body, "http://localhost:8080/user/register");
    console.log(result);
    props.onRegister();
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(form.isUsernameValid && form.isPasswordValid && form.isEmailValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [form.isUsernameValid, form.isPasswordValid, form.isEmailValid]);

  return (
    <div className={classes.register}>
        <div className={classes.register__text}>Register</div>
        <Input
          type="email"
          id="Email"
          placeholder="Email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          showError={true}
          isValid={form.isEmailValid}
        />
        <Input
        type="text"
        id="Username"
        placeholder="Username"
        onChange={usernameChangeHandler}
        onBlur={validateUsernameHandler}
        showError={true}
        isValid={form.isUsernameValid}
      />
      <Input
        type="password"
        id="Password"
        placeholder="Password"
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        showError={true}
        isValid={form.isPasswordValid}
      />

        <button className={classes.login__button} onClick={register} disabled={!isFormValid} >Register</button>
      </div>
  );
};

export default Register;