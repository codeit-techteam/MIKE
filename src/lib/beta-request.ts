export type BetaRequestData = {
  name: string;
  email: string;
  country: string;
  iphoneModel: string;
  source: string;
  memoryInterest: string;
};

export type BetaRequestResponse = {
  success: boolean;
  message: string;
};

export const BETA_FIELD_LIMITS = {
  name: 100,
  email: 254,
  country: 100,
  iphoneModel: 100,
  source: 200,
  memoryInterest: 2000,
} as const;

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBetaRequestData(data: BetaRequestData): string | null {
  const name = data.name.trim();
  const email = data.email.trim();
  const country = data.country.trim();
  const iphoneModel = data.iphoneModel.trim();
  const source = data.source.trim();
  const memoryInterest = data.memoryInterest.trim();

  if (!name || !email || !country || !iphoneModel || !source || !memoryInterest) {
    return "Please complete the required fields.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Please check the form details and try again.";
  }

  if (
    name.length > BETA_FIELD_LIMITS.name ||
    email.length > BETA_FIELD_LIMITS.email ||
    country.length > BETA_FIELD_LIMITS.country ||
    iphoneModel.length > BETA_FIELD_LIMITS.iphoneModel ||
    source.length > BETA_FIELD_LIMITS.source ||
    memoryInterest.length > BETA_FIELD_LIMITS.memoryInterest
  ) {
    return "Please check the form details and try again.";
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
  const name = data.name.trim();
  const email = data.email.trim();
  const country = data.country.trim();
  const iphoneModel = data.iphoneModel.trim();
  const source = data.source.trim();
  const memoryInterest = data.memoryInterest.trim();

  return {
    access_key: accessKey,
    subject: `Mike beta request from ${name}`,
    from_name: "Mike",
    replyto: email,
    name,
    email,
    country,
    iphone_model: iphoneModel,
    source,
    memory_interest: memoryInterest,
    // Do not send botcheck here — a JSON `false` can be treated as filled
    // and silently drop the email while still returning success.
    message: [
      "A new private beta request was submitted on michaelross.ai.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Country: ${country}`,
      `iPhone model: ${iphoneModel}`,
      `How they heard about Mike: ${source}`,
      "",
      "What they most want Mike to remember:",
      memoryInterest,
    ].join("\n"),
  };
}
