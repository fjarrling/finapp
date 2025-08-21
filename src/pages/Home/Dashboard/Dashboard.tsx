import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAppSelector} from "@/store/store.ts";
import {
  type AccountId,
  selectAccountsMap,
  selectAllAccounts,
  selectTotalBalance
} from "@/store/accountsSlice.ts";
import {useMemo, useState} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import {ChevronDown} from "lucide-react";
import {selectDashboardMetrics} from "@/store/transactionSlice.ts";
import {getCurrencySymbol} from "@/config/currencies.ts";
import MetricCard from "@/components/DashboardMetricCard/DashboardMetricCard.tsx";

const Dashboard = () => {
  const accountsMap = useAppSelector(selectAccountsMap)
  const accounts = useAppSelector(selectAllAccounts)
  const totalBalance = useAppSelector(selectTotalBalance)

  const [selectedAccount, setSelectedAccount] = useState<AccountId | 'total'>('total')

  const metrics = useAppSelector((state) =>
    selectDashboardMetrics(state, selectedAccount)
  )

  const metricsData = useMemo(() => [
    {title: "Month income", value: metrics.income, diff: metrics.incomeDiff, type: "income"},
    {title: "Month expense", value: metrics.expense, diff: metrics.expenseDiff, type: "expense"},
    {title: "Month savings", value: metrics.savings, diff: metrics.savingsDiff, type: "income"},
  ], [metrics])

  const {displayName, displayBalance, currencySymbol} = useMemo(() => {
    if (selectedAccount === 'total') {
      return {
        displayName: "Total Balance",
        displayBalance: totalBalance,
        currencySymbol: getCurrencySymbol(accounts[0]?.currency ?? "USD")
      }
    }
    const account = accountsMap[selectedAccount]
    return {
      displayName: account?.name ?? "",
      displayBalance: account?.balance ?? 0,
      currencySymbol: getCurrencySymbol(account?.currency),
    }
  }, [selectedAccount, totalBalance, accounts, accountsMap]);

  return (
    <section>
      <div className='container'>
        <div className='py-8 flex flex-col'>
          <h2 className='text-4xl mb-8'>
            Dashboard
          </h2>
          <div className="w-full grid grid-cols-4 gap-6">
            <Card>
              <CardHeader className='gap-y-0'>
                <CardTitle className="text-sm font-normal">
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-2'>
                      {displayName}
                      <ChevronDown width="16" height="16"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedAccount('total')}>
                        Total Balance
                      </DropdownMenuItem>
                      {accounts.length > 0 && <DropdownMenuSeparator/>}
                      {accounts.map(account => (
                        <DropdownMenuItem
                          key={account.id}
                          onClick={() => setSelectedAccount(account.id)}
                        >
                          {account.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className='text-2xl font-semibold'>
                  {currencySymbol}{displayBalance}
                </span>
              </CardContent>
            </Card>
            {metricsData.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                diff={metric.diff}
                type={metric.type}
                symbol={currencySymbol}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;