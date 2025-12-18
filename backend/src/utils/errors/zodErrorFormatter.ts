import { ZodError } from "zod";

/**
 * Maps Zod issues into a field-based error object
 */
export const formatZodError = (error: ZodError): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path.length > 0 ? issue.path.join(".") : "_form";

    // Keep first error per field
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
};
