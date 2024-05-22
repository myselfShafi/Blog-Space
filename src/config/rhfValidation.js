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
      message: "Password must be atleast 10 characters",
    },
    maxLength: {
      value: 15,
      message: "Password must be between 10 - 16 characters",
    },
  },
  textOnly: {
    pattern: {
      value: /^[A-Za-z ]+$/i,
      message: "Incorrect input pattern",
    },
  },
  imageOnly: {
    validate: (value) => {
      if (value === "") {
        return true;
      }
      if (
        !["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(
          value[0]?.type
        )
      ) {
        return "Invalid file format. Only jpg, jpeg, png, gif are supported.";
      }
      if (!(value[0]?.size / (1024 * 1024) < 10)) {
        return "file size should be less than 10MB";
      }
    },
  },
};

export default formValidate;
