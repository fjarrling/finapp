import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {format} from "date-fns";
import {getCurrencySymbol} from "@/config/currencies.ts";
import FormDialog from "@/components/FormDialog";
import {DeleteTransactionAlert, EditTransactionForm} from "@/components/forms/transactions";
import type {Transaction, TransactionId} from "@/store/transactionsSlice.ts";
import type {Account} from "@/store/accountsSlice.ts";
import type {Category} from "@/store/categoriesSlice.ts";
import {memo} from "react";

type TransactionRowProps = {
  transaction: Transaction;
  account: Account;
  category: Category;
  handleDeleteTransaction: (transactionId: TransactionId) => void;
}
const TransactionRow = memo(({
                               transaction,
                               category,
                               account,
                               handleDeleteTransaction
                             }: TransactionRowProps) => {
  return (
    <TableRow key={transaction.id} className="border-b border-border hover:bg-muted/50">
      <TableCell className="text-sm text-muted-foreground">
        {format(transaction.date, "PPP")}
      </TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        <span className="inline-block bg-muted px-2 py-1 rounded text-xs">
          {category.name}
        </span>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">{account.name}</TableCell>
      <TableCell
        className={`text-right font-semibold ${
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {`${transaction.amount} ${getCurrencySymbol(account.currency)}`}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <FormDialog
          title="Edit Transaction"
          variant="outline"
          size="icon"
          icon="edit"
        >
          {(closeDialog) => (
            <EditTransactionForm
              closeDialog={closeDialog}
              transaction={transaction}
            />
          )}
        </FormDialog>
        <DeleteTransactionAlert
          transactionId={transaction.id}
          onDelete={handleDeleteTransaction}
        />
      </TableCell>
    </TableRow>
  );
})

export default TransactionRow;