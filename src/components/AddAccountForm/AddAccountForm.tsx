import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {CURRENCIES, addAccount} from "@/store/accountsSlice"
import {useId} from "react";
import {useAppDispatch} from "@/store/store.ts";

const createAccountSchema = z.object({
  name: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
  balance: z
    .string()
    .min(1, {message: "Initial balance is required."})
    .regex(/^\d*\.?\d*$/, {message: "Only numbers and decimal point allowed."})
    .refine((val) => !isNaN(parseFloat(val)), {message: "Initial balance must be a valid number."})
    .refine((val) => parseFloat(val) >= 0, {message: "Initial balance must be 0 or greater."}),
  currency: z.enum(CURRENCIES, {
    message: "Select Currency",
  }),
  description: z.string().optional()
})

type CreateAccountFormData = z.infer<typeof createAccountSchema>
type FormProps = { closeDialog?: () => void; };


const AddAccountForm = ({closeDialog}: FormProps) => {
  const id = useId()
  const dispatch = useAppDispatch()

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      currency: undefined,
      balance: "",
      description: "",
    },
  })


  function onSubmit(data: CreateAccountFormData) {
    const Payload = {
      id: id,
      name: data.name,
      balance: parseFloat(data.balance),
      currency: data.currency,
      description: data.description,
    }

    // console.log('Form data:', data)
    // console.log('Payload:', Payload)

    dispatch(addAccount(Payload))

    if (closeDialog)
      closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Account Name" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({field}) => (
            <FormItem>
              <FormLabel>Initial Balance</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter initial balance"
                  type="text"
                  inputMode="decimal"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({field}) => (
            <FormItem>
              <FormLabel>Currency type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Currency"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CURRENCIES.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                      {cur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Account Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Account Description" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddAccountForm;