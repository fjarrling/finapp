import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {useId} from "react";
import {useAppDispatch} from "@/store/store.ts";
import {type CategoryFormData, categoryFormSchema} from "@/types/categories.ts";
import {addCategory, CATEGORY_TYPES} from "@/store/categoriesSlice.ts";
import {CATEGORY_COLORS, getColorLabel} from "@/config/categoryColors.ts";

type FormProps = { closeDialog?: () => void; };

const AddCategoryForm = ({closeDialog}: FormProps) => {
  const id = useId()
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
    const Payload = {
      id: id,
      name: data.name,
      type: data.type,
      color: data.color,
      description: data.description,
    }

    dispatch(addCategory(Payload))

    if (closeDialog) closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Category Name" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Currency type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Category Type"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORY_TYPES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({field}) => (
            <FormItem>
              <FormLabel>Currency type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Color"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORY_COLORS.map((color) => (
                    <SelectItem key={color} value={color}>
                      <span className={`${color} rounded-full w-4 h-4`}></span>
                      {getColorLabel(color)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Category Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Category Description" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddCategoryForm;