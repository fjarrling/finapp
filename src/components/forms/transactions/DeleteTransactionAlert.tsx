import {DeleteAlert} from "@/components/DeleteAlert/DeleteAlert"
import {type TransactionId} from "@/store/transactionsSlice"

interface DeleteTransactionAlertProps {
  transactionId: TransactionId
  onDelete: (id: TransactionId) => void
}

export const DeleteTransactionAlert = ({transactionId, onDelete}: DeleteTransactionAlertProps) => (
  <DeleteAlert
    id={transactionId}
    onDelete={onDelete}
    entityName="transaction"
    triggerVariant="outline"
  />
)

export default DeleteTransactionAlert;