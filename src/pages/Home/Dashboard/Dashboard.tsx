import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAppSelector} from "@/store/store.ts";
import {type Account, selectAllAccounts, selectTotalBalance} from "@/store/accountsSlice.ts";
import {useState} from "react";

const Dashboard = () => {
  const accounts = useAppSelector(selectAllAccounts)
  const totalBalance = useAppSelector(selectTotalBalance)

  const [selectedAccount, setSelectedAccount] = useState<Account | 'total'>(
    accounts.length > 0 ? accounts[0] : 'total'
  )
  const getDisplayName = () => {
    return selectedAccount === 'total' ? 'Total Balance' : selectedAccount.name
  }
  const getDisplayBalance = () => {
    return selectedAccount === 'total' ? totalBalance : selectedAccount.balance
  }
  const handleSelectAccount = (account: Account | 'total') => {
    setSelectedAccount(account)
  }

  return (
    <section>
      <div className='container'>
        <div className='py-8 flex flex-col items-start'>
          <h2 className='text-4xl mb-8'>
            Dashboard
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger>{getDisplayName()}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSelectAccount('total')}>
                Total Balance
              </DropdownMenuItem>
              {accounts.length ? <DropdownMenuSeparator/> : null}

              {
                accounts.map(account => (
                  <DropdownMenuItem key={account.id} onClick={() => handleSelectAccount(account)}>
                    {account.name}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            ${getDisplayBalance()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;