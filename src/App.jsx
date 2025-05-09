import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/properties/Properties";
import 'bootstrap/dist/css/bootstrap.min.css';
import User from "./pages/user/User";
import AddUser from "./pages/user/AddUser";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import EditProperties from "./pages/properties/EditProperties";
import EditUser from "./pages/user/EditUser";
import Amenities from "./pages/amenities/Amenities";

import EditAmenities from "./pages/amenities/EditAmenities";
import HeroPage from "./pages/HeroPage";
import AdminLayout from "./pages/AdminLayout";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import UserDashboard from "./pages/UserDashboard";
import AddProperty from "./pages/properties/AddProperty";
import PaymentCancelled from "./pages/PaymentCancelled";
import Transaction from "./pages/Transaction";
import PaymentSuccess from "./pages/PaymentSuccess";
import SubscribeButton from "./components/SubscriptionButton";
import ContactUs from "./pages/contactus";
import AdminMessages from "./pages/Adminmessage";
import RentalRuleTable from "./pages/rental/Rental"
import UserRentals from "./pages/UserRentals";
import AdminRentals from "./pages/rental/AdminRentalView";
import AddAmenities from "./pages/amenities/Addamenities";

function App() {
  return (
    <Router>
      <>
       <ToastContainer position="top-right" autoClose={3000} />
       <Routes>

  <Route path="/" element={<HeroPage />} />
  <Route path ='/userdashboard' element={<UserDashboard />} />
  <Route path="/propertylist" element={<PropertyList />} />
  <Route path="/propertydetail/:id" element={<PropertyDetail />} />

  <Route path="/subscription" element={<SubscribeButton />} />

  <Route path="/success" element={<PaymentSuccess />} />
  <Route path="/cancel" element={<PaymentCancelled />} />

  <Route path="/rental-rule" element={<UserRentals />} />

  <Route path="/contact" element={<ContactUs />} />
    
  <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />

  <Route path="/properties" element={<AdminLayout><Properties /></AdminLayout>} />
  <Route path="/properties/addproperties" element={<AdminLayout><AddProperty /></AdminLayout>} />
  <Route path="/properties/editproperties/:id" element={<AdminLayout><EditProperties /></AdminLayout>} />

  <Route path="/user" element={<AdminLayout><User /></AdminLayout>} />
  <Route path="/user/adduser" element={<AdminLayout><AddUser /></AdminLayout>} />
  <Route path="/user/edituser/:id" element={<AdminLayout><EditUser /></AdminLayout>} />

  <Route path="/message" element={<AdminLayout><AdminMessages /></AdminLayout>} />

  <Route path="/transaction" element={<AdminLayout><Transaction /></AdminLayout>} />

  <Route path="/rental" element={<AdminLayout><RentalRuleTable /></AdminLayout>} />
  <Route path="/adminrentals/:id" element={<AdminLayout><AdminRentals /></AdminLayout>} />

  <Route path="/amenities" element={<AdminLayout><Amenities /></AdminLayout>} />
  <Route path="/amenities/addamenities" element={<AdminLayout><AddAmenities /></AdminLayout>} />
  <Route path="/amenities/editamenities/:id" element={<AdminLayout><EditAmenities /></AdminLayout>} />

  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Register />} />
  
</Routes>
</>
        
    </Router>
  );
}

export default App;
