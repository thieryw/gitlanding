export function validateEmail(email: string): boolean {
    const regex =
        /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const emailParts = email.split("@");

    if (
        emailParts.length !== 2 ||
        emailParts[0].length > 64 ||
        emailParts[1].length > 255
    ) {
        return false;
    }

    const domainParts = emailParts[1].split(".");

    if (domainParts.some(part => part.length > 63)) {
        return false;
    }

    return regex.test(email);
}
