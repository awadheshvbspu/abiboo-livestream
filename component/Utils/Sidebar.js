import React,{useEffect, useState} from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import logo from "../../assests/abiboologo.png";
import { NavLink } from "react-router-dom";
import "../Utils/sidebar.css";
import { Toaster } from "react-hot-toast";
import { Navigation } from "../../apis/Navigation";
import { CgMenuLeftAlt, CgClose } from 'react-icons/cg';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{zIndex:'1', position:"relative", height:'100vh'}}>
      <div className={`h-100 `}>
        <CDBSidebar textColor="#000000" backgroundColor="#F1F0EF">
    <CgMenuLeftAlt className="toggle-btn" onClick={toggleSidebar}/>
          <CDBSidebarHeader> 
            {/* prefix={<i className="fa fa-bars" /> */}
            <img src={logo} width="90%" />
         </CDBSidebarHeader>
          <Toaster />
          <CDBSidebarContent className="sidebar-content">
              {Navigation.length>1 && 
                  Navigation.filter((cur)=>cur.role === localStorage.getItem("role")).map((cur)=>{
                    return <CDBSidebarMenu>
              <NavLink exact to={cur.to} activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <cur.Icon size={25} />
                  &nbsp;
                  <span>{!isOpen && cur.title}</span>
                  {/* <span>{cur.Component}</span> */}
                </CDBSidebarMenuItem>
                </NavLink>
                </CDBSidebarMenu>
                  })
              }
          </CDBSidebarContent>
          <div className="mobile-navbar-btn">
          {/* <CgMenuLeftAlt
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setOpenMenu(true)}
          />
          <CgClose
            name="close-outline"
            className="close-outline mobile-nav-icon"
            onClick={() => setOpenMenu(false)}
          /> */}
        </div>
        </CDBSidebar>
      </div>
      </div>
    </>
  );
};
export default Sidebar;
