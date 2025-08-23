import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {type TransactionFormData, transactionFormSchema} from "@/types/transactions";
import {selectCategoriesMap,} from "@/store/categoriesSlice";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {addTransactionThunk} from "@/store/thunks/transactionThunks";
import {type Transaction} from "@/store/transactionsSlice";
import {nanoid} from "@reduxjs/toolkit";
import {TransactionForm} from "./";

type FormProps = { closeDialog?: () => void; };

const AddTransactionForm = ({closeDialog}: FormProps) => {

  const dispatch = useAppDispatch()

  const categoriesMap = useAppSelector(selectCategoriesMap)

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      accountId: '',
      amount: '',
      date: new Date(),
      categoryId: '',
      description: '',
    },
  })

  function onSubmit(data: TransactionFormData) {
    const payload: Transaction = {
      id: nanoid(),
      accountId: data.accountId,
      amount: parseFloat(data.amount),
      type: categoriesMap[data.categoryId].type,
      date: data.date.toISOString(),
      categoryId: data.categoryId,
      description: data.description,
    }

    dispatch(addTransactionThunk(payload))
      .unwrap()
      .then(() => {
        if (closeDialog) closeDialog()
      })
      .catch(error => {
        console.error("Unable to create transaction:", error)
      })
  }

  return (
    <TransactionForm form={form} onSubmit={onSubmit}/>
  );
}

export default AddTransactionForm;