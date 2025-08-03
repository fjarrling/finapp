import { z } from "zod"
import { CURRENCIES } from "@/config/currencies"

export const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
  balance: z
    .string()
    .min(1, { message: "Initial balance is required." })
    .regex(/^\d*\.?\d*$/, { message: "Only numbers and decimal point allowed." })
    .refine((val) => !isNaN(parseFloat(val)), { message: "Initial balance must be a valid number." })
    .refine((val) => parseFloat(val) >= 0, { message: "Initial balance must be 0 or greater." }),
  currency: z.enum(CURRENCIES, {
    message: "Select Currency",
  }),
  description: z.string().optional()
})

export type AccountFormData = z.infer<typeof accountFormSchema>