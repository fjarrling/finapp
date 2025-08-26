import {useAppSelector} from "@/store/store";
import {selectLastNTransactions} from "@/store/transactionsSlice";
import {format} from "date-fns";
import {selectCategoriesMap} from "@/store/categoriesSlice";
import {selectAccountsMap} from "@/store/accountsSlice";
import {getCurrencySymbol} from "@/config/currencies";

const LastTransactions = () => {
  const categoriesMap = useAppSelector(selectCategoriesMap)
  const accountsMap = useAppSelector(selectAccountsMap)
  const lastTransactions = useAppSelector((selectLastNTransactions(5)))

  return (
    <div className="rounded-xl border p-4 md:p-6">
      <h3 className="text-xl mb-4 md:mb-8">Last transactions</h3>
      <div className="space-y-3">
        {
          lastTransactions.map((transaction) => {
            const category = categoriesMap[transaction.categoryId]
            const account = accountsMap[transaction.accountId]
            return (
              <div key={transaction.id}
                   className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${category.color}`}></div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(transaction.date, "PPP")}
                    </p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount} {getCurrencySymbol(account.currency)}
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default LastTransactions;