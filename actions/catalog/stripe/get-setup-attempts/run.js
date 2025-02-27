const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_API_KEY,
    setup_intent,
    created,
    ending_before,
    expand,
    limit,
    starting_after,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.stripe.com/v1/setup_attempts",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        setup_intent,
        ...(created ? { created } : {}),
        ...(ending_before ? { ending_before } : {}),
        ...(expand ? { expand } : {}),
        ...(limit ? { limit } : {}),
        ...(starting_after ? { starting_after } : {}),
      },
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
const verifyInput = ({ BUILDABLE_STRIPE_API_KEY, setup_intent }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_API_KEY:
      "A valid BUILDABLE_STRIPE_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_SETUP_INTENT: "A valid setup_intent field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_API_KEY);
  if (typeof setup_intent !== "string") throw new Error(ERRORS.INVALID_SETUP_INTENT);
};
