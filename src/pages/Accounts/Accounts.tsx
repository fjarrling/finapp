import {useAppSelector} from "@/store/store";
import {selectAllAccounts} from "@/store/accountsSlice";
import AccountCard from "@/components/AccountCard";
import FormDialog from "@/components/FormDialog";
import {AddAccountForm} from "@/components/forms/accounts";

const Accounts = () => {
  const accounts = useAppSelector(selectAllAccounts)
  return (
    <div className='container'>
      <div className='py-4 md:py-8 flex flex-col'>
        <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4'>
          <h1 className="text-3xl md:text-4xl">
            My Accounts
          </h1>
          <FormDialog title="Add Account">
            {(closeDialog) => <AddAccountForm closeDialog={closeDialog} />}
          </FormDialog>
        </div>
        {!accounts.length &&
          <div className="w-full flex items-center justify-center py-16 text-2xl">
            You have not added accounts yet
          </div>}
        {accounts.length > 0 &&
          <div className='w-full grid gap-4 mb-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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