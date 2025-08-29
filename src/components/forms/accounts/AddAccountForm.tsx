import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {type Account, addAccount} from "@/store/accountsSlice"
import {useAppDispatch} from "@/store/store";
import {accountFormSchema, type AccountFormData} from "@/validation/accounts"
import {nanoid} from "@reduxjs/toolkit";
import {AccountForm} from "./";


type FormProps = { closeDialog?: () => void; };

const AddAccountForm = ({closeDialog}: FormProps) => {

  const dispatch = useAppDispatch()

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      currency: undefined,
      balance: "",
      description: "",
    },
  })

  function onSubmit(data: AccountFormData) {
    const payload: Account = {
      id: nanoid(),
      name: data.name,
      balance: parseFloat(data.balance),
      currency: data.currency,
      description: data.description,
    }

    dispatch(addAccount(payload))

    if (closeDialog) closeDialog()
  }

  return (
    <AccountForm form={form} onSubmit={onSubmit}/>
  );
}

export default AddAccountForm;