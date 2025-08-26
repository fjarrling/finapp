import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Outlet} from "react-router";

const RootLayout = () => {
  return (
    <>
      <Header/>
      <main className='pt-20 grow'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default RootLayout;