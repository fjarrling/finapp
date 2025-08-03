import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {Account} from "@/store/accountsSlice.ts";
import {formatCurrency, getCurrencyName} from "@/config/currencies";
import FormDialog from "@/components/FormDialog";
import EditAccountForm from "@/components/EditAccountForm";

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({account}: AccountCardProps) => {

  console.log(account);
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-3xl'>{account.name}</CardTitle>
        <CardDescription>{account.description}</CardDescription>
        <CardAction>
          <FormDialog
            formProps={{account}}
            Form={EditAccountForm}
            title="Edit Account"
          />
        </CardAction>
      </CardHeader>
      <CardContent className='mt-auto flex items-center justify-between'>
        <div className="flex flex-col gap-1 ">
          <div className='text-sm text-gray-500'>Balance:</div>
          {/* Вариант 1: Используем утилиту formatCurrency */}
          <span className='text-2xl font-medium'>
            {formatCurrency(account.balance, account.currency)}
          </span>
        </div>
        <div className="flex flex-col gap-1  items-end">
          <div className='text-sm text-gray-500'>Currency Type:</div>
          <span className='text-xl font-medium'>
            {getCurrencyName(account.currency)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;