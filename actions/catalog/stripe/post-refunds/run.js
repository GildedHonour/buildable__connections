const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_API_KEY,
    amount,
    charge,
    currency,
    customer,
    expand,
    instructions_email,
    metadata,
    origin,
    payment_intent,
    reason,
    refund_application_fee,
    reverse_transfer,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/refunds",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(amount ? { amount } : {}),
        ...(charge ? { charge } : {}),
        ...(currency ? { currency } : {}),
        ...(customer ? { customer } : {}),
        ...(expand ? { expand } : {}),
        ...(instructions_email ? { instructions_email } : {}),
        ...(metadata ? { metadata } : {}),
        ...(origin ? { origin } : {}),
        ...(payment_intent ? { payment_intent } : {}),
        ...(reason ? { reason } : {}),
        ...(refund_application_fee ? { refund_application_fee } : {}),
        ...(reverse_transfer ? { reverse_transfer } : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_STRIPE_API_KEY }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_API_KEY:
      "A valid BUILDABLE_STRIPE_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
  };

  if (typeof BUILDABLE_STRIPE_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_API_KEY);
};
