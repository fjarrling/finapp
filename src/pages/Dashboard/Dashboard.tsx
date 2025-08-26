import Metrics from "./Metrics";
import LastTransactions from "@/pages/Dashboard/LastTransactions";

const Dashboard = () => {
  return (
    <div className='container'>
      <div className='py-8 flex flex-col'>
        <h2 className='text-4xl mb-8'>
          Dashboard
        </h2>
        <Metrics/>
        <LastTransactions/>
      </div>
    </div>
  )
}

export default Dashboard