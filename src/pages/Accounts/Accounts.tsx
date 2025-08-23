import {useAppSelector} from "@/store/store";
import {selectAllAccounts} from "@/store/accountsSlice";
import AccountCard from "@/components/AccountCard";
import FormDialog from "@/components/FormDialog";
import {AddAccountForm}from "@/components/forms/accounts";

const Accounts = () => {
  const accounts = useAppSelector(selectAllAccounts)
  return (
    <div className='container'>
      <div className='flex flex-col items-start py-8'>
        <div className='w-full flex items-center justify-between mb-8'>
          <h1 className="text-4xl">
            My Accounts
          </h1>
          <FormDialog Form={AddAccountForm} title="Add Account"/>
        </div>
        {!accounts.length &&
          <div className="w-full flex items-center justify-center py-16 text-2xl">
            You have not added accounts yet
          </div>}
        {accounts.length > 0 &&
          <div className='w-full grid grid-cols-2 gap-4 mb-4 lg:grid-cols-3'>
            {
              accounts.map((account) => (
                <AccountCard key={account.id} account={account}/>
              ))
            }
          </div>
        }
      </div>
    </div>
  );
};

export default Accounts;