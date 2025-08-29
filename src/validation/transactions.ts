import {z} from "zod"

export const transactionFormSchema = z.object({
  accountId: z.string().min(1, {message: "You must choose an account"}),
  categoryId: z.string().min(1, {message: "You must choose a category"}),
  amount: z
    .string()
    .min(1, {message: "Amount is required."})
    .regex(/^\d*\.?\d*$/, {message: "Only numbers and decimal point allowed."})
    .refine((val) => !isNaN(parseFloat(val)), {message: "Amount must be a valid number."})
    .refine((val) => parseFloat(val) >= 1, {message: "Amount balance must be 1 or greater."}),
  date: z.date({message: "Please select a date"}),
  description: z.string().optional()
})

export type TransactionFormData = z.infer<typeof transactionFormSchema>