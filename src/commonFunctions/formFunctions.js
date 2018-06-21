import React from "react";
import TextField from "@material-ui/core/TextField"
import Select from '@material-ui/core/Select';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && typeof error !== "undefined"}
    helperText={touched && error}
    FormHelperTextProps={{ style: { fontSize: "0.3em" } }}
    InputLabelProps={{ style: { fontSize: "0.4em" } }}
    inputProps={{ style: { fontSize: "1.3em" } }}
    {...input}
    {...custom}
  />
);

export  const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <Select
    className = 'select-field'
    label={label}
    error={touched && typeof error !== "undefined"}
    {...input}
    children={children}/>
)

export const validatePassAndUsername = values => {
  const errors = {};
  const requiredFields = ["password", "email"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

export const validateMessage = values => {
  const errors = {};
  const requiredFields = ["message"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};


export const validatePassAndEmail = values => {
    const errors = {};
    const requiredFields = ["password", "email"];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = "Required";
      }
    });
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

export const validateOnlyPass = values => {
  const errors = {};
  const requiredFields = ["password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

export const validatePasswords = values => {
  const errors = {};
  const requiredFields = ["currentPassword", "password1", "password2"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.password1 !== values.password2) {
    errors.password2 = "Passwords don't match";
  }
  return errors;
};

export const validatePassUsernameEmail = values => {
    const errors = {};
    const requiredFields = ["username", "password"];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = "Required";
      }
    });
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };