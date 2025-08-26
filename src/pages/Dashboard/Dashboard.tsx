import Metrics from "./Metrics";
import LastTransactions from "@/pages/Dashboard/LastTransactions";

const Dashboard = () => {
  return (
    <div className='container'>
      <div className='py-4 md:py-8 flex flex-col'>
        <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4'>
          <h2 className='text-3xl md:text-4xl'>
            Dashboard
          </h2>
        </div>
        <Metrics/>
        <LastTransactions/>
      </div>
    </div>
  )
}

export default Dashboard