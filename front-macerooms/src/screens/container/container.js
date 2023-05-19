import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Container = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLogged(true)
        }
    }, [])

    return(
        <div>
            <Header logged={logged} setLogged={setLogged}/>
            <Outlet/>
            <Footer/>
        </div>
    ); 
  }

export default Container;
