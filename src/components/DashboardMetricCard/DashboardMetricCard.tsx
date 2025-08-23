import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  value: number;
  symbol: string;
  diff: number;
  type: string;
}

const MetricCard = ({title, value, symbol, diff, type}: MetricCardProps) => {

  return (
    <Card>
      <CardHeader className='gap-y-0'>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-between'>
        <div className='text-2xl font-semibold'>
          {symbol}{value}
        </div>
        <div className={`${
          (type === "expense" && diff > 0) || (type === "income" && diff < 0)
            ? "text-red-600"
            : "text-green-500"
        }`}>
          {diff}%
        </div>
      </CardContent>
    </Card>
  );
}
export default MetricCard;