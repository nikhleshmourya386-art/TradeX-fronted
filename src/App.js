
import {Routes,Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";



import About from './pages/landing_page/about/About';
import Product from './pages/landing_page/products/Product'; 
import Pricing from './pages/landing_page/pricing/Pricing';
import Support from './pages/landing_page/support/Support';
import HomePage from "./pages/landing_page/home/HomePage";

// import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/Dashboard"
// import Final from "./components/Final";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Apps from "./components/Apps";
import Funds from "./components/Funds";
import Summary from "./components/Summary";
import KYCForm from "./pages/KYCForm";
import WithdrawMoney from "./components/WithdrawMoney";
import { AddModerator } from "@mui/icons-material";
import AddMoney from "./components/AddMoney";
import UserProfile from "./components/UserProfile";
import Newoders from "./components/newoper"; 




// import Navbar from "./pages/landing_page/Navbar";

// import Dashboard from "./components/Dashboard";
const App=()=>{ 



   return(
          <Routes>


        <Route path="/" element={<HomePage />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />


        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/kyc" element={<KYCForm/>} />
        <Route path="/neworders" element={<Newoders />} />

         <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard/>}/>}/>

<Route exact path="/Summary" element={<Summary />} />
<Route path="/orders" element={<Orders />} />
<Route path="/holdings" element={<Holdings />} />
<Route path="/positions" element={<Positions />} />
<Route path="/apps" element={<Apps />} />
 <Route path="/funds" element={<Funds />} />
 
  <Route path="/wdm" element={<WithdrawMoney/>} />
<Route path="/adm" element={<AddMoney/>} />
<Route path="/userp" element={<UserProfile/>} />

      
        
             </Routes>
   );

}

export default App;