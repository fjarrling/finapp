import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {updateAccount, removeAccount, type Account, type AccountId} from "@/store/accountsSlice"
import {useAppDispatch} from "@/store/store";
import {accountFormSchema, type AccountFormData} from "@/types/accounts"
import {DeleteAccountAlert} from "@/components/forms/accounts";
import {AccountForm} from "./";

type FormProps = {
  closeDialog?: () => void;
  account: Account
};

const EditAccountForm = ({closeDialog, account}: FormProps) => {

  const dispatch = useAppDispatch()

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: account.name,
      currency: account.currency,
      balance: String(account.balance),
      description: account.description,
    },
  })

  const onSubmit = (data: AccountFormData) => {
    const payload: Account = {
      id: account.id,
      name: data.name,
      balance: parseFloat(data.balance),
      currency: data.currency,
      description: data.description,
    }

    dispatch(updateAccount(payload))

    if (closeDialog) closeDialog()
  }

  const handleRemoveAccount = (accountId: AccountId) => {
    dispatch(removeAccount({id: accountId}))
  }

  return (
    <AccountForm form={form} onSubmit={onSubmit}>
      <DeleteAccountAlert
        accountId={account.id}
        onDelete={handleRemoveAccount}
      />
    </AccountForm>
  );
}

export default EditAccountForm;