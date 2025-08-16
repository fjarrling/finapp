import {z} from "zod"
import {CATEGORY_COLORS} from "@/config/categoryColors.ts";
import {CATEGORY_TYPES} from "@/store/categoriesSlice.ts";

export const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  type: z.enum(CATEGORY_TYPES),
  color: z.enum(CATEGORY_COLORS),
  description: z.string().optional()
})

export type CategoryFormData = z.infer<typeof categoryFormSchema>