import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import TransactionRow from "@/components/TransactionRow";
import type {Transaction, TransactionId} from "@/store/transactionsSlice.ts";
import {ChevronDown, ChevronUp} from "lucide-react";
import type {Account, AccountId} from "@/store/accountsSlice.ts";
import type {Category, CategoryId} from "@/store/categoriesSlice.ts";

type TransactionsTableProps = {
  sortConfig: { key: keyof Transaction | null, direction: "asc" | "desc" };
  handleSort: (key: keyof Transaction) => void;
  transactions: Transaction[];
  accountsMap: Record<AccountId, Account>;
  categoriesMap: Record<CategoryId, Category>;
  handleDeleteTransaction: (transactionId: TransactionId) => void;

}

const TransactionsTable = ({
                             sortConfig,
                             handleSort,
                             transactions,
                             categoriesMap,
                             accountsMap,
                             handleDeleteTransaction
                           }: TransactionsTableProps) => {

  const renderSortIcon = (key: keyof Transaction) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "asc" ? <ChevronUp size={16}/> : <ChevronDown size={16}/>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => handleSort("date")}
            className="cursor-pointer text-left font-medium text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              Date {renderSortIcon("date")}
            </div>

          </TableHead>
          <TableHead
            onClick={() => handleSort("description")}
            className="cursor-pointer text-left font-medium text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              Description {renderSortIcon("description")}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSort("categoryId")}
            className="cursor-pointer text-left font-medium text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              Category {renderSortIcon("categoryId")}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSort("accountId")}
            className="cursor-pointer text-left font-medium text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              Account {renderSortIcon("accountId")}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSort("amount")}
            className="cursor-pointer text-right font-medium text-muted-foreground"
          >
            <div className="flex items-center justify-end gap-2">
              Amount {renderSortIcon("amount")}
            </div>
          </TableHead>
          <TableHead className="text-right font-medium text-muted-foreground">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const account = accountsMap[transaction.accountId]
          const category = categoriesMap[transaction.categoryId]
          return (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              account={account}
              category={category}
              handleDeleteTransaction={handleDeleteTransaction}
            />
          )
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;