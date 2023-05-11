import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Container = () => {
    return(
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    ); 
  }

export default Container;
