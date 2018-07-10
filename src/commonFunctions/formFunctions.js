import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

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

export const renderSelectField = (
  { input, label, meta: { touched, error }, children },
  ...custom
) => (
  <div>
    <FormControl>
      <InputLabel htmlFor={label + "f"}>{label}</InputLabel>
      <Select
        inputProps={{
          name: label,
          id: label + "f"
        }}
        error={touched && typeof error !== "undefined"}
        children={children}
        style={{ minWidth: "10em" }}
        {...input}
        {...custom}
      />
      <FormHelperText error>{touched && error}</FormHelperText>
    </FormControl>
  </div>
);

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
  const requiredFields = ["message", "email"];
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

export const validateTrello = values => {
  const errors = {};
  const requiredFields = [
    "position",
    "boardID",
    "cardTitle",
    "listName",
    "description"
  ];
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
