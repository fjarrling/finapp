import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {type TransactionFormData, transactionFormSchema} from "@/types/transactions.ts";
import {type Transaction} from "@/store/transactionSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {selectAllAccounts} from "@/store/accountsSlice.ts";
import {selectCategoriesMap, selectExpenseCategories, selectIncomeCategories} from "@/store/categoriesSlice.ts";
import {updateTransactionThunk} from "@/store/thunks/transactionThunks.ts";

type FormProps = {
  closeDialog?: () => void;
  transaction: Transaction;
};

const EditTransactionForm = ({closeDialog, transaction}: FormProps) => {

  const dispatch = useAppDispatch()

  const accounts = useAppSelector(selectAllAccounts)
  const categoriesMap = useAppSelector(selectCategoriesMap)
  const incomeCategories = useAppSelector(selectIncomeCategories)
  const expenseCategories = useAppSelector(selectExpenseCategories)

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      accountId: transaction.accountId,
      amount: String(transaction.amount),
      date: new Date(transaction.date),
      categoryId: transaction.categoryId,
      description: transaction.description,
    },
  })

  function onSubmit(data: TransactionFormData) {
    const Payload: Transaction = {
      id: transaction.id,
      accountId: data.accountId,
      amount: parseFloat(data.amount),
      type: categoriesMap[data.categoryId].type,
      date: data.date.toISOString(),
      categoryId: data.categoryId,
      description: data.description,
    }

    dispatch(updateTransactionThunk(Payload))
      .unwrap()
      .then(() => {
        if (closeDialog) closeDialog()
      })
      .catch((error) => {
        console.error("Unable to update transaction", error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accountId"
          render={({field}) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an account to add a transaction to"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
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
          name="categoryId"
          render={({field}) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Income</SelectLabel>
                    {incomeCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Expense</SelectLabel>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({field}) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Transaction Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Transaction Description" {...field} />
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

export default EditTransactionForm;