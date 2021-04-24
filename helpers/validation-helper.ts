import * as Yup from "yup";

export default class ValidationHelper {

    static PasswordValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/
    static UsernameValidator = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
    static TextValidator = /^[^~,]*$/;
    static HrefValidator = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    static validateLoginForm = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required().matches(ValidationHelper.PasswordValidator),
    });

    static validateSignupForm = Yup.object().shape({
        name: Yup.string().required("Name is required").max(1024, "Name is too long").matches(ValidationHelper.TextValidator, "Invalid name"),
        username: Yup.string().required("Username is required").max(1024, "Username is too long").matches(ValidationHelper.UsernameValidator, "Invalid username").notOneOf(["admin"], "You can't use this username"),
        email: Yup.string().required("Email is required").email("Email is invalid").max(1024, "Email is too long"),
        password: Yup.string().required("Password is required").matches(ValidationHelper.PasswordValidator, "Password must have minimum eight characters, at least one letter and one number"),
        confirmPassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")], "Passwords don't match")
    })

    static LinkValidator = Yup.object().shape({
        title: Yup.string().required("title").max(150, "title").matches(ValidationHelper.TextValidator, "title"),
        subtitle: Yup.string().required("subtitle").max(150, "subtitle").matches(ValidationHelper.TextValidator, "subtitle"),
        href: Yup.string().required("href").max(150, "href").matches(ValidationHelper.HrefValidator, "href"),
    });
}
