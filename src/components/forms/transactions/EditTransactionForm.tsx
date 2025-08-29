import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {type TransactionFormData, transactionFormSchema} from "@/validation/transactions";
import {type Transaction} from "@/store/transactionsSlice";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {updateTransactionThunk} from "@/store/thunks/transactionThunks";
import {selectCategoriesMap} from "@/store/categoriesSlice";
import {TransactionForm} from "./";

type FormProps = {
  closeDialog?: () => void;
  transaction: Transaction;
};

const EditTransactionForm = ({closeDialog, transaction}: FormProps) => {

  const dispatch = useAppDispatch()
  const categoriesMap = useAppSelector(selectCategoriesMap)

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
    const payload: Transaction = {
      id: transaction.id,
      accountId: data.accountId,
      amount: parseFloat(data.amount),
      type: categoriesMap[data.categoryId].type,
      date: data.date.toISOString(),
      categoryId: data.categoryId,
      description: data.description,
    }

    dispatch(updateTransactionThunk(payload))
      .unwrap()
      .then(() => {
        if (closeDialog) closeDialog()
      })
      .catch((error) => {
        console.error("Unable to update transaction", error)
      })
  }

  return (
    <TransactionForm form={form} onSubmit={onSubmit}/>
  );
}

export default EditTransactionForm;