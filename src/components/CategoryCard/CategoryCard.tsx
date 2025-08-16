import {Card} from "@/components/ui/card.tsx";
import {type Category, type CategoryId, removeCategory} from "@/store/categoriesSlice.ts";
import {useAppDispatch} from "@/store/store.ts";
import {Edit2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import FormDialog from "@/components/FormDialog";
import EditCategoryForm from "@/components/EditCategoryForm";
import {DeleteCategoryAlert} from "@/components/DeleteCategoryAlert/DeleteCategoryAlert.tsx";

type CategoryCardProps = {
  category: Category;
}


const CategoryCard = ({category}: CategoryCardProps) => {

  const dispatch = useAppDispatch();

  const handleRemoveCategory = (CategoryId: CategoryId) => {
    dispatch(removeCategory({id: CategoryId}))
  }
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
          <div>
            <h4 className="font-medium">{category.name}</h4>
            {category.description && (
              <p className="text-sm text-muted-foreground">{category.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {category.type}
          </Badge>
          <FormDialog
            Form={EditCategoryForm}
            formProps={{category}}
            title="Edit Category"
            variant="ghost"
            size="icon"
          >
            <Edit2 className="w-4 h-4"/>
          </FormDialog>
          <DeleteCategoryAlert
            categoryId={category.id}
            onDelete={handleRemoveCategory}
          />
        </div>
      </div>
    </Card>
  )
}

export default CategoryCard;