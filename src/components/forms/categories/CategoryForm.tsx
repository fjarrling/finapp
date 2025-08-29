import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CATEGORY_TYPES} from "@/store/categoriesSlice";
import {CATEGORY_COLORS, getColorLabel} from "@/config/categoryColors";
import {Button} from "@/components/ui/button";
import type {UseFormReturn} from "react-hook-form";
import type {CategoryFormData} from "@/validation/categories";

type CategoryFormProps = {
  form: UseFormReturn<CategoryFormData>
  onSubmit: (data: CategoryFormData) => void
}

const CategoryForm = ({form, onSubmit}: CategoryFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
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
              <FormLabel>Category Type</FormLabel>
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
              <FormLabel>Category Color</FormLabel>
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
        <div className="flex items-center justify-between">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;