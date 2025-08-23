import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CURRENCIES, CURRENCY_CONFIG} from "@/config/currencies";
import {Button} from "@/components/ui/button";
import type {UseFormReturn} from "react-hook-form";
import type {AccountFormData} from "@/types/accounts";
import type {ReactNode} from "react";

type AccountFormProps = {
  form: UseFormReturn<AccountFormData>;
  onSubmit: (data: AccountFormData) => void;
  children?: ReactNode
}

const AccountForm = ({form, onSubmit, children}: AccountFormProps) => {
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
        <div className="flex items-center justify-between">
          <Button type="submit">Submit</Button>
          {children}
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;