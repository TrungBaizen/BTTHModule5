import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../components/footer/Footer";

function Home() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Home;