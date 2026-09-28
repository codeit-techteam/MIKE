export type BetaRequestData = {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type BetaRequestResponse = {
  success: boolean;
  message: string;
};

export const BETA_FIELD_LIMITS = {
  phone: 20,
  firstName: 100,
  lastName: 100,
  email: 254,
} as const;

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_PATTERN = /^\d{8,15}$/;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function validatePhoneDigits(digits: string): string | null {
  if (!digits) {
    return "Please enter your phone number.";
  }
  if (!PHONE_DIGITS_PATTERN.test(digits) || digits.length > BETA_FIELD_LIMITS.phone) {
    return "Please enter a valid phone number.";
  }
  return null;
}

export function validateProfileData(
  data: Pick<BetaRequestData, "firstName" | "lastName" | "email">
): string | null {
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.trim();

  if (!firstName || !lastName || !email) {
    return "Please complete the required fields.";
  }

  if (
    firstName.length > BETA_FIELD_LIMITS.firstName ||
    lastName.length > BETA_FIELD_LIMITS.lastName ||
    email.length > BETA_FIELD_LIMITS.email
  ) {
    return "Please check the form details and try again.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

/**
 * Builds the Web3Forms JSON payload.
 *
 * Free/standard plans expect client-side submissions. The access key is
 * public by design (it only aliases to the recipient inbox).
 */
export function buildWeb3FormsPayload(data: BetaRequestData, accessKey: string) {
  const phone = data.phone.trim();
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.trim();
  const name = `${firstName} ${lastName}`.trim();

  return {
    access_key: accessKey,
    subject: `Mike beta tester request from ${name}`,
    from_name: "Mike",
    replyto: email,
    name,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    // Do not send botcheck here — a JSON `false` can be treated as filled
    // and silently drop the email while still returning success.
    message: [
      "A new beta tester request was submitted on michaelross.ai.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
    ].join("\n"),
  };
}
