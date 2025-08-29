import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useAppDispatch} from "@/store/store";
import {type CategoryFormData, categoryFormSchema} from "@/validation/categories";
import {updateCategory, type Category} from "@/store/categoriesSlice";
import {CategoryForm} from "./";

type FormProps = {
  closeDialog?: () => void;
  category: Category;
};

const EditCategoryForm = ({closeDialog, category}: FormProps) => {
  const dispatch = useAppDispatch()

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
      type: category.type,
      color: category.color,
      description: category.description,
    },
  })

  function onSubmit(data: CategoryFormData) {
    const payload: Category = {
      id: category.id,
      name: data.name,
      type: data.type,
      color: data.color,
      description: data.description,
    }

    dispatch(updateCategory(payload))

    if (closeDialog) closeDialog()
  }

  return (
    <CategoryForm onSubmit={onSubmit} form={form}/>
  );
}

export default EditCategoryForm;