import { RiTrelloLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { SiFastapi } from "react-icons/si";
import { FaChromecast } from "react-icons/fa";
import {FaChartLine} from 'react-icons/fa';
import {SiWebrtc} from 'react-icons/si';
import AdminPanel from "../component/adminPanel/AdminPanel";
import ClientPanel from "../component/clientPanel/ClientManagement/ClientPanel";
import Setting from "../component/adminPanel/Setting";
import AdminDash from "../ClientDashboard/AdminDasnboard/AdminDash";
import AgentManagement from "../ClientDashboard/AgentManagement/AgentManagement";
import ApiManagement from "../ClientDashboard/ApiManagement/ApiManagement";
import ApiRequestTable from '../ClientDashboard/apirequesttable/ApiRequestTable';
import Agentdashboard from "../customermanagement/customerdash/Agentdashboard";
import CustomerDataTable from "../customermanagement/customerDatatable/CustomerDataTable";
import VideoStreaming from "../customermanagement/customerstreams/VideoStreaming";
import LiveVideo from "../screens/LiveVideo";
import Customer from "../customer/Customer";
import LiveRoom from "../screens/LiveRoom";

export const Navigation =[
    {
        Component:AdminPanel,
        title:"Dashboard",
        to:"/adminpanel",
        role:'admin',
        Icon: MdDashboard
    },
    {
        Component:ClientPanel,
        title:"Client Management",
        to:"/clientpanel",
        role:'admin',
        Icon:RiTrelloLine
    },
    {
        Component:Setting,
        title:'setting',
        to:"/setting",
        role:'admin',
        Icon:TbSettings2
    },
    {
        Component:AdminDash,
        title:'Client DashBoard',
        to:"/admindash",
        role:'client',
        Icon:MdDashboard
    },
    {
        Component:AgentManagement,
        title:'Agent Management',
        to:"/agentmanagement",
        role:'client',
        Icon:RiTrelloLine
    },
    {
        Component:ApiManagement,
        title:'API Management',
        to:"/apimanagement",
        role:'client',
        Icon:SiFastapi
    },
    {
        Component:ApiRequestTable,
        title:'API Request',
        to:"/apirequesttable",
        role:'client',
        Icon:TbSettings2
    },
    { 
        Component:Agentdashboard,
        title:'Agent DashBoard',
        to:"/agent/dashboard",
        role:'agent',
        Icon:MdDashboard
    },
    {
        Component:CustomerDataTable,
        title:'Customer Management',
        to:"agent/customerdatatable",
        role:'agent',
        Icon:RiTrelloLine
    },
    {
        Component:ApiManagement,
        title:'Api Management',
        to:"agent/apimanagement",
        role:'agent',
        Icon:FaChartLine
    },
    {
        Component:VideoStreaming,
        title:'VideoStreaming',
        to:"agent/videostreaming",
        role:'agent',
        Icon:FaChromecast
    },
    {
        Component:LiveVideo,
        title:'VideoChat',
        to:"/livevideo",
        role:'agent',
        Icon:SiWebrtc
    },
    {
        Component:Setting,
        title:'setting',
        to:"/setting",
        role:'agent',
        Icon:TbSettings2
    },
    // {
    //     Component:Customer,
    //     title:'customer',
    //     to:"/customer",
    //     role:'agent',
    //     Icon:TbSettings2
        
    // },
    {
       Component:LiveVideo,
       title:'Live Video Chat',
       to:"/livevideo"
   },
    {
    Component:LiveRoom,
    title:'Liveroom',
    to:"/room/:roomId",
   }
    
]