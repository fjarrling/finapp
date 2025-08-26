import DeleteAlert from "@/components/DeleteAlert"
import {type CategoryId} from "@/store/categoriesSlice"

interface DeleteCategoryAlertProps {
  categoryId: CategoryId
  onDelete: (id: CategoryId) => void
}

const DeleteCategoryAlert = ({categoryId, onDelete}: DeleteCategoryAlertProps) => (
  <DeleteAlert
    id={categoryId}
    onDelete={onDelete}
    entityName="category"
    triggerVariant="outline"
  />
)

export default DeleteCategoryAlert;
