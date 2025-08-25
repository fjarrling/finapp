import {useState, useMemo, useCallback} from "react"
import FormDialog from "@/components/FormDialog";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {selectAllTransactions, type Transaction, type TransactionId} from "@/store/transactionsSlice";
import {selectAccountsMap} from "@/store/accountsSlice";
import {selectCategoriesMap} from "@/store/categoriesSlice";
import {AddTransactionForm} from "@/components/forms/transactions";
import {removeTransactionThunk} from "@/store/thunks/transactionThunks";
import {useDebounceValue} from "@/hooks/useDebounceValue";
import SearchBar from "@/components/SearchBar";
import TransactionsTable from "@/components/TransactionsTable";

const Transactions = () => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectAllTransactions)
  const accountsMap = useAppSelector(selectAccountsMap)
  const categoriesMap = useAppSelector(selectCategoriesMap)

  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounceValue(searchQuery, 300)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null,
    direction: "asc" | "desc"
  }>({
    key: null,
    direction: "asc",
  })

  const filteredTransactions = useMemo(() => {
    if (!debouncedSearchQuery) return transactions
    return transactions.filter((t) =>
      [t.description, categoriesMap[t.categoryId]?.name, accountsMap[t.accountId]?.name]
        .some(val => val?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    )
  }, [transactions, debouncedSearchQuery, accountsMap, categoriesMap])


  const filteredAndSortedTransactions = useMemo(() => {
    if (!sortConfig.key) return filteredTransactions
    return [...filteredTransactions].sort((a, b) => {
      if (!sortConfig.key) return 0

      const prevTransactionValue =
        sortConfig.key === "categoryId"
          ? categoriesMap[a.categoryId]?.name ?? ""
          : sortConfig.key === "accountId"
            ? accountsMap[a.accountId]?.name ?? ""
            : a[sortConfig.key] ?? ""

      const nextTransactionValue =
        sortConfig.key === "categoryId"
          ? categoriesMap[b.categoryId]?.name ?? ""
          : sortConfig.key === "accountId"
            ? accountsMap[b.accountId]?.name ?? ""
            : b[sortConfig.key] ?? ""

      if (prevTransactionValue < nextTransactionValue) return sortConfig.direction === "asc" ? -1 : 1
      if (prevTransactionValue > nextTransactionValue) return sortConfig.direction === "asc" ? 1 : -1

      return 0
    })
  }, [filteredTransactions, sortConfig, accountsMap, categoriesMap])

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(prev =>
      prev.key === key
        ? {key, direction: prev.direction === "asc" ? "desc" : "asc"}
        : {key, direction: "asc"}
    )
  }

  const handleDeleteTransaction = useCallback(
    (transactionId: TransactionId) => {
      dispatch(removeTransactionThunk(transactionId))
    },
    [dispatch]
  );

  return (
    <div className='container'>
      <div className='py-8 flex flex-col items-start'>
        <div className='w-full flex items-center justify-between mb-4'>
          <h1 className="text-4xl">Transactions</h1>
          <FormDialog title="Add Transaction">
            {(closeDialog) => <AddTransactionForm closeDialog={closeDialog}/>}
          </FormDialog>
        </div>
        <SearchBar searchValue={searchQuery} setSearchValue={setSearchQuery}/>
        {!transactions.length && (
          <div className="w-full flex items-center justify-center py-16 text-2xl">
            You have not added transactions yet
          </div>
        )}

        {transactions.length > 0 && (
          <TransactionsTable
            sortConfig={sortConfig}
            handleSort={handleSort}
            handleDeleteTransaction={handleDeleteTransaction}
            transactions={filteredAndSortedTransactions}
            accountsMap={accountsMap}
            categoriesMap={categoriesMap}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
