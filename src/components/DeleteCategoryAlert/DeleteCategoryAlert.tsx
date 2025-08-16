import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {type CategoryId} from "@/store/categoriesSlice"
import {Trash2} from "lucide-react";

interface DeleteAccountAlertProps {
  categoryId: CategoryId;
  onDelete: (categoryId: CategoryId) => void
}

export const DeleteCategoryAlert = ({categoryId, onDelete}: DeleteAccountAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>

        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4"/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this category
            and all transactions associated with it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(categoryId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}