import FormDialog from "@/components/FormDialog";
import AddTransactionForm from "@/components/AddTransactionForm";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {removeTransaction, selectAllTransactions, type TransactionId} from "@/store/transactionSlice.ts";
import {format} from "date-fns";
import {selectAccountsMap} from "@/store/accountsSlice.ts";
import {selectCategoriesMap} from "@/store/categoriesSlice.ts";
import {getCurrencySymbol} from "@/config/currencies.ts";
import EditTransactionForm from "@/components/EditTransactionForm";
import {DeleteTransactionAlert} from "@/components/DeleteTransactionAlert/DeleteTransactionAlert.tsx";
import {Edit2} from "lucide-react";

const Transactions = () => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectAllTransactions)
  const accountsMap = useAppSelector(selectAccountsMap)
  const categoriesMap = useAppSelector(selectCategoriesMap)

  const handleDeleteTransaction = (transactionId: TransactionId) => {
    dispatch(removeTransaction({id: transactionId}))
  }
  return (
    <div className='container'>
      <div className='py-8 flex flex-col items-start'>
        <div className='w-full flex items-center justify-between mb-8'>
          <h1 className="text-4xl">
            Transactions
          </h1>
          <FormDialog Form={AddTransactionForm} title="Add Transaction"/>
        </div>
        {
          !transactions.length &&
          <div className="w-full flex items-center justify-center py-16 text-2xl">
            You have not added transactions yet
          </div>
        }
        {
          transactions.length > 0 &&
          <table className="w-full">
            <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Account</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction) => {
                const account = accountsMap[transaction.accountId]
                const category = categoriesMap[transaction.categoryId]
                return (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 text-sm text-muted-foreground">
                      {format(transaction.date, "PPP")}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block bg-muted px-2 py-1 rounded text-xs">
                        {category.name}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {account.name}
                    </td>
                    <td
                      className={`p-4 text-right font-semibold ${
                        category.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {`${transaction.amount} ${getCurrencySymbol(account.currency)}`}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <FormDialog
                        formProps={{transaction}}
                        Form={EditTransactionForm}
                        title="Edit Transaction"
                        triggerText="Edit"
                        variant="outline"
                        size="icon"
                      >
                        <Edit2/>
                      </FormDialog>
                      <DeleteTransactionAlert
                        transactionId={transaction.id}
                        onDelete={handleDeleteTransaction}
                      />
                    </td>
                  </tr>
                )
              }
            )}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default Transactions;