import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TrendingDown, TrendingUp} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";

type MetricCardProps = {
  title: string;
  value: number;
  symbol: string;
  diff: number;
  type: string;
}

const MetricCard = ({title, value, symbol, diff, type}: MetricCardProps) => {

  return (
    <Card className="gap-y-0">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          {title}
        </CardTitle>
        <CardDescription className="text-2xl text-black font-semibold">
          {symbol}{value}
        </CardDescription>
        <CardAction>
          <Badge variant="outline"
                 className={`${
                   (type === "expense" && diff > 0) || (type === "income" && diff < 0)
                     ? "text-red-600"
                     : "text-green-500"
                 }`}
          >
            {(diff > 0) && <TrendingUp/>}
            {(diff < 0) && <TrendingDown/>}
            {diff}%
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
export default MetricCard;