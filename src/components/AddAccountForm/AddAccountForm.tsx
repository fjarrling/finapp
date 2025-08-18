import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {addAccount} from "@/store/accountsSlice"
import {CURRENCIES, CURRENCY_CONFIG} from "@/config/currencies"
import {useId} from "react";
import {useAppDispatch} from "@/store/store.ts";
import { accountFormSchema, type AccountFormData } from "@/types/accounts"

type FormProps = { closeDialog?: () => void; };

const AddAccountForm = ({closeDialog}: FormProps) => {
  const id = useId()
  const dispatch = useAppDispatch()

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      currency: undefined,
      balance: "",
      description: "",
    },
  })

  function onSubmit(data: AccountFormData) {
    const Payload = {
      id: id,
      name: data.name,
      balance: parseFloat(data.balance),
      currency: data.currency,
      description: data.description,
    }

    dispatch(addAccount(Payload))

    if (closeDialog)
      closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      {CURRENCY_CONFIG[cur].symbol} {cur} - {CURRENCY_CONFIG[cur].name}
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