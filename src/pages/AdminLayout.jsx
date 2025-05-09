import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
    return(
        <div>
            <Header />
            <Sidebar />
            <div className="wrapper container-fluid" style={{width: '84vw'}}>
            {children}
            </div>
            <Footer />
       </div>
    )
}

export default AdminLayout;