const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    financial_account: "string", // Required

    // created: { gt: 0, gte: 0, lt: 0, lte: 0 },
    // effective_at: { gt: 0, gte: 0, lt: 0, lte: 0 },
    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // order_by: "created",
    // starting_after: "string",
    // transaction: "string",
  };
};
