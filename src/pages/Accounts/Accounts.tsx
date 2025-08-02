import Header from "@/components/Header";

import {useAppSelector} from "@/store/store.ts";
import {selectAllAccounts} from "@/store/accountsSlice.ts";
import AccountCard from "@/components/AccountCard";
import FormDialog from "@/components/FormDialog";
import AddAccountForm from "@/components/AddAccountForm";

const Accounts = () => {
  const accounts = useAppSelector(selectAllAccounts)
  return (
    <>
      <Header/>
      <div className='container'>
        <div className='flex flex-col items-start py-8'>
          <div className='w-full flex items-center justify-between mb-4'>
            <h1>
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
    </>
  );
};

export default Accounts;