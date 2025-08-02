import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {Account} from "@/store/accountsSlice.ts";
import FormDialog from "@/components/FormDialog";
import AddAccountForm from "@/components/AddAccountForm";

interface AccountCardProps {
  account: Account;

}

const AccountCard = ({account}: AccountCardProps) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-3xl'>{account.name}</CardTitle>
        <CardDescription>{account.description}</CardDescription>
        <CardAction>
          <FormDialog Form={AddAccountForm} title="Edit Account"/>
        </CardAction>
      </CardHeader>
      <CardContent className='mt-auto'>
        <div className='text-sm text-gray-500 mb-1'>Balance:</div>
        <span className='text-2xl font-medium'>{account.currency} {account.balance}</span>
      </CardContent>
    </Card>
  );
};

export default AccountCard;