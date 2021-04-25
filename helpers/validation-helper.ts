import * as Yup from "yup";

export default class ValidationHelper {

    static PasswordValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/
    static UsernameValidator = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
    static TextValidator = /^[^~,]*$/;
    static HrefValidator = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    static MailHrefValidator = /^mailto:(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
    static PhoneHrefValidator = /^tel:(\+?)(\d{1,16})$/;

    private static linkHrefValidator = (v: string | undefined): boolean => {
        if (!v) return false;
        return ValidationHelper.HrefValidator.test(v)
            || ValidationHelper.MailHrefValidator.test(v)
            || ValidationHelper.PhoneHrefValidator.test(v);
    }

    static validateLoginForm = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required().matches(ValidationHelper.PasswordValidator),
    });

    static validateSignupForm = Yup.object().shape({
        name: Yup.string().required("error.name.required").max(1024, "error.name.length").matches(ValidationHelper.TextValidator, "error.name.matches"),
        username: Yup.string().required("error.username.required").max(1024, "error.username.length").matches(ValidationHelper.UsernameValidator, "error.username.matches").notOneOf(["admin", "login", "signup", "404", "505"], "error.username.notOneOf"),
        email: Yup.string().required("error.email.required").email("error.email.matches").max(1024, "error.email.length"),
        password: Yup.string().required("error.password.required").matches(ValidationHelper.PasswordValidator, "error.password.matches"),
        confirmPassword: Yup.string().required("error.password-confirm.required").oneOf([Yup.ref("password")], "error.password-confirm.match")
    })

    static LinkValidator = Yup.object().shape({
        title: Yup.string().required("title").max(150, "title").matches(ValidationHelper.TextValidator, "title"),
        subtitle: Yup.string().required("subtitle").max(150, "subtitle").matches(ValidationHelper.TextValidator, "subtitle"),
        href: Yup.string().required("href").max(150, "href").test("href", "href", ValidationHelper.linkHrefValidator)
    });
}
