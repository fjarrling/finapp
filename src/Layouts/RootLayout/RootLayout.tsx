import Header from "@/components/Header";
import {Outlet} from "react-router";

const RootLayout = () => {
  return (
    <>
      <Header/>
      <main className='pt-20 grow'>
        <Outlet/>
      </main>
    </>
  );
};

export default RootLayout;