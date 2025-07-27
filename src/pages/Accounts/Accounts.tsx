import Header from "@/components/Header";

import {useAppSelector} from "@/store/store.ts";
import {selectAllAccounts} from "@/store/accountsSlice.ts";
import AccountCard from "@/components/AccountCard";
import AddAccountDialog from "@/components/AddAccountDialog";

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
            <AddAccountDialog/>
          </div>
          <div className='w-full grid grid-cols-3 gap-4 mb-4'>
            {
              accounts.map((account) => (
                <AccountCard key={account.id} account={account}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;