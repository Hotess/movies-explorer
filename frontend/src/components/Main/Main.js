import './Main.css';
import Promo from "./../Promo/Promo";
import AboutProject from "./../AboutProject/AboutProject";
import Techs from "./../Techs/Techs";
import AboutMe from "./../AboutMe/AboutMe";
import Portfolio from "./../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import React from "react";
import Header from "./../Header/Header";

export default function Main(props) {
    const {
        loggedIn,
        hamburger,
        onHandleHamburger,
    } = props;

  return (
      <>
          <Header
              loggedIn={loggedIn}
              hamburger={hamburger}
              onHandleHamburger={onHandleHamburger}
          />
          <main className='main'>
              <Promo />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
          </main>
          <Footer />
      </>
  );
}