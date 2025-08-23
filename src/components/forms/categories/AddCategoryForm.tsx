import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useAppDispatch} from "@/store/store";
import {type CategoryFormData, categoryFormSchema} from "@/types/categories";
import {addCategory, type Category} from "@/store/categoriesSlice";
import {nanoid} from "@reduxjs/toolkit";
import {CategoryForm} from "./";

type FormProps = { closeDialog?: () => void; };

const AddCategoryForm = ({closeDialog}: FormProps) => {
  const dispatch = useAppDispatch()

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      type: undefined,
      color: undefined,
      description: "",
    },
  })

  function onSubmit(data: CategoryFormData) {
    const payload: Category = {
      id: nanoid(),
      name: data.name,
      type: data.type,
      color: data.color,
      description: data.description,
    }

    dispatch(addCategory(payload))

    if (closeDialog) closeDialog()
  }

  return (
    <CategoryForm onSubmit={onSubmit} form={form}/>
  );
}

export default AddCategoryForm;