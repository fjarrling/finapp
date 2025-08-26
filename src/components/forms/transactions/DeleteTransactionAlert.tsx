import DeleteAlert from "@/components/DeleteAlert"
import {type TransactionId} from "@/store/transactionsSlice"

interface DeleteTransactionAlertProps {
  transactionId: TransactionId
  onDelete: (id: TransactionId) => void
}

const DeleteTransactionAlert = ({transactionId, onDelete}: DeleteTransactionAlertProps) => (
  <DeleteAlert
    id={transactionId}
    onDelete={onDelete}
    entityName="transaction"
    triggerVariant="outline"
  />
)

export default DeleteTransactionAlert;