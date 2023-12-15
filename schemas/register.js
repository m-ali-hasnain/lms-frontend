import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
    ),
});

export default registerSchema;
