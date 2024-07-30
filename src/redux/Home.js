import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import {Outlet} from "react-router-dom";

function Home() {
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Home;