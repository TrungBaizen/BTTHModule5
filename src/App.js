import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ListOrder from "./pages/orders/ListOrder";
import AddOrder from "./pages/orders/AddOrder";
import SearchOrder from "./pages/orders/SearchOrder";

function App() {
    return (
        <>
            <Routes>
                <Route path={'orders'} element={<Home/>}>
                    <Route path={'home'} element={<ListOrder/>}/>
                    <Route path={'add'} element={<AddOrder/>}/>
                    <Route path={'search'} element={<SearchOrder/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
