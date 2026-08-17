import * as Yup from "yup";

export type ValuesFormLoginType = {
    email: string,
    password: string
}

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .matches(/[0-9]/, "Password harus mengandung angka")
    .matches(/[A-Z]/, "Password harus mengandung huruf kapital")
    .required("Password wajib diisi"),
});