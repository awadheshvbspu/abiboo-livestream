import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Utils/Sidebar'
import Routing from '../component/Utils/Routing'
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const [mount,setMount] = useState(true);
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{

        if(localStorage.getItem("authToken"))
        {
            // logic to user login
            setMount(false);
            // navigate("/adminpanel");
        }
        
        else{
            setMount(false);
       navigate("/");
        }
            
    },[])

if(mount)
{
    return <div></div>
}

  return (
    <>

<div className="container-fluid ">
            <div className="row backGr">
             {location.pathname!=='/' && location.pathname!=='/customer' && <div className="col-md-2 sidebarHeight" style={{minHeight:'100vh'}} >
                
                <div >
                <Sidebar />
                </div>
                
              </div>
              
              }
              <div className={`col-md-${location.pathname==='/'?'12':'10'} `}>
                <div className="col-md-11 mx-auto h-100" style={{minHeight:'100vh'}
                }>
                  <Routing />
                </div>
              </div>
            </div>
          </div>

    </>
  )
}

export default MainLayout