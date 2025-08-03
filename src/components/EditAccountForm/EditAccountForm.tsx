import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {updateAccount, removeAccount, type Account, type AccountId} from "@/store/accountsSlice"
import {CURRENCIES, CURRENCY_CONFIG} from "@/config/currencies"
import {useAppDispatch} from "@/store/store.ts";
import { accountFormSchema, type AccountFormData } from "@/types/accounts"
import {DeleteAccountDialog} from "@/components/DeleteAccountAlert/DeleteAccountAlert.tsx";

type FormProps = {
  closeDialog?: () => void;
  account: Account
};


const EditAccountForm = ({closeDialog, account}: FormProps) => {

  const dispatch = useAppDispatch()

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: account.name,
      currency: account.currency,
      balance: String(account.balance),
      description: account.description,
    },
  })


  const onSubmit = (data: AccountFormData) => {
    const Payload = {
      id: account.id,
      name: data.name,
      balance: parseFloat(data.balance),
      currency: data.currency,
      description: data.description,
    }

    // console.log('Form data:', data)
    // console.log('Payload:', Payload)

    dispatch(updateAccount(Payload))

    if (closeDialog)
      closeDialog()
  }

  const handleRemoveAccount = (accountId: AccountId) => {
    dispatch(removeAccount({id: accountId}))
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
        <div className="flex items-center justify-between">
          <Button type="submit">Submit</Button>
          <DeleteAccountDialog
            accountId={account.id}
            onDelete={handleRemoveAccount}
          />
        </div>
      </form>
    </Form>
  );
}

export default EditAccountForm;