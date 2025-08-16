import FormDialog from "@/components/FormDialog";
import AddAccountForm from "@/components/AddAccountForm";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {selectAllCategories, selectExpenseCategories, selectIncomeCategories} from "@/store/categoriesSlice.ts";
import {useAppSelector} from "@/store/store.ts";
import CategoryCard from "@/components/CategoryCard/CategoryCard.tsx";

const Categories = () => {
  const categories = useAppSelector(selectAllCategories)
  const incomeCategories = useAppSelector(selectIncomeCategories)
  const expenseCategories = useAppSelector(selectExpenseCategories)
  console.log(categories)
  return (
    <div className='container'>
      <div className='py-8 flex flex-col items-start'>
        <div className='w-full flex items-center justify-between mb-8'>
          <h1 className="text-4xl">
            Categories
          </h1>
          <FormDialog Form={AddAccountForm} title="Add Category"/>
        </div>
        <Tabs defaultValue="income-categories" className="gap-8 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="income-categories">Income</TabsTrigger>
            <TabsTrigger value="expense-categories">Expense</TabsTrigger>
          </TabsList>
          <TabsContent value="income-categories">
            {
              !incomeCategories.length &&
              <div className="w-full flex items-center justify-center py-16 text-2xl">
                You have not added income categories yet
              </div>
            }
            {
              incomeCategories.length > 0 &&
              incomeCategories.map((category) => (
                <CategoryCard key={category.id} category={category}/>
              ))
            }
          </TabsContent>
          <TabsContent value="expense-categories">
            {
              !expenseCategories.length &&
              <div className="w-full flex items-center justify-center py-16 text-2xl">
                You have not added expense categories yet
              </div>
            }
            {
              expenseCategories.length > 0 &&
              expenseCategories.map((category) => (
                <CategoryCard key={category.id} category={category}/>
              ))
            }
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Categories;