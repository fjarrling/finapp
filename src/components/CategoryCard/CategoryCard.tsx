import {Card} from "@/components/ui/card.tsx";
import type {Category} from "@/store/categoriesSlice.ts";
import {Edit2, Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button.tsx";

type CategoryCardProps = {
  category: Category;
}

const CategoryCard = ({category}: CategoryCardProps) => (
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
          {category.type === 'income' ? 'Доход' : 'Расход'}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
        >
          <Edit2 className="w-4 h-4"/>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4"/>
        </Button>
      </div>
    </div>
  </Card>
);

export default CategoryCard;