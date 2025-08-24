import DeleteAlert from "@/components/DeleteAlert"
import {type AccountId} from "@/store/accountsSlice"

interface DeleteAccountAlertProps {
  accountId: AccountId
  onDelete: (id: AccountId) => void
}

export const DeleteAccountAlert = ({accountId, onDelete}: DeleteAccountAlertProps) => (
  <DeleteAlert
    id={accountId}
    onDelete={onDelete}
    entityName="account"
    triggerVariant="outline"
  />
)

export default DeleteAccountAlert