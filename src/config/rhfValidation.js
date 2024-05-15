const formValidate = {
  email: {
    required: "email is required",
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be between 8 - 15 characters",
    },
    maxLength: {
      value: 15,
      message: "Password must be between 8 - 15 characters",
    },
  },
  textOnly: {
    pattern: {
      value: /^[A-Za-z ]+$/i,
      message: "Incorrect input pattern",
    },
  },
};

export default formValidate;
