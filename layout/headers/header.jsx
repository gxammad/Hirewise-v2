'use client';
import Image from 'next/image';
import Link from 'next/link';
import ScrollspyNav from "react-scrollspy-navigation";

import logo from '@/assets/images/logos/logo.png';
import { SocialLinksOne } from '../social-links';
import NavMenus from './nav-menus';
import useSticky from '../../src/hooks/use-sticky';
import useToggle from '../../src/hooks/useToggle';
import Drawer from '@/components/common/Drawer';


const Header = ({ single_page = false }) => {
  const { headerSticky } = useSticky();
  const [drawer, setValue] = useToggle();
  const handleClick = () => {
    setValue.toggle()
  }
  return (
    <>
      <header className={`main-header header-one ${headerSticky ? 'fixed-header' : ''}`}>
        <div className="header-top bg-lighter py-10">
          <div className="top-left">
            <ul>
              <li>Call Us: <a href="tel:548978478">548978478</a></li>
              <li>Email us: <a href="mailto:demo@example.com">demo@example.com</a></li>
              <li>Our address: 45 Dream street Austria</li>
            </ul>
          </div>
          <div className="top-right">
            <div className="office-time">
              <i className="far fa-clock"></i><span>08:00 am - 06:00 pm</span>
            </div>
            <div className="social-style-one">
              <SocialLinksOne />
            </div>
          </div>
        </div>

        {/* Header-Uppe */}
        <div className="header-upper bg-white">
          <div className="container-fluid clearfix">

            <div className="header-inner d-flex align-items-center">
              <div className="logo-outer  py-10 px-85">
                <div className="logo">
                  <Link href="/">
                    <Image src={logo} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="nav-outer clearfix d-flex align-items-center">
                {/* Main Menu */}
                <nav className="main-menu navbar-expand-lg">
                  <div className="navbar-header">
                    <div className="mobile-logo bg-blue p-15">
                      <Link href="/">
                        <Image src={logo} alt="logo" />
                      </Link>
                    </div>
                    {/* Toggle Button */}
                    <button type="button" className="navbar-toggle" onClick={setValue.toggle}>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="navbar-collapse collapse clearfix">
                    {/* nav menu start */}
                    {!single_page && <NavMenus />}
                    {/* nav menu end */}
                    {single_page && 
                    <ScrollspyNav offsetTop={120} activeClass="is-active"> 
                       <ul className="navigation onepage clearfix">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">services</a></li>
                        <li><a href="#about">about</a></li>
                        <li><a href="#work-progress">work Step</a></li>
                        <li><a href="#pricing">pricing</a></li>
                        <li><a href="#news">news</a></li>
                      </ul> 
                    </ScrollspyNav>
                    }
                  </div>

                </nav>
                {/* Main Menu En */}

                {/* Menu Button */}
                <div className="menu-btn">
                  <Link href="/contact" className="theme-btn">
                      meet with us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Header Uppe */}
      </header>

      {/* sidebar start */}
      <Drawer drawer={drawer} action={setValue.toggle} single_page={single_page} 
      single_page_menu={<ScrollspyNav offsetTop={0} activeClass="is-active"> 
        <ul className="navigation onepage clearfix">
          <li onClick={handleClick}><a href="#home">Home</a></li>
          <li onClick={handleClick}><a href="#services">services</a></li>
          <li onClick={handleClick}><a href="#about">about</a></li>
          <li onClick={handleClick}><a href="#work-progress">work Step</a></li>
          <li onClick={handleClick}><a href="#pricing">pricing</a></li>
          <li onClick={handleClick}><a href="#news">news</a></li>
        </ul>
      </ScrollspyNav>} />
      {/* sidebar end */}
    </>
  );
};

export default Header;