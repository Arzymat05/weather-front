import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import GetCity from "../components/cities/getCity/GetCity";
import Admin from "../components/admin/Admin";
import UpdateCity from "../components/cities/update/UpdateCity";
import Error from "../components/admin/Error";
import CreateCity from "../components/cities/createCity/CreateCity";
import OneCity from "../components/cities/oneCity/OneCity";
import EditCity from "../components/cities/EditCity/EditCity";

const MainRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<GetCity />} />
        <Route path="/weather/:name/:lang" element={<OneCity />} />
        <Route path="/weather/edit/:name/:lang" element={<EditCity />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create" element={<CreateCity />} />
        <Route path="/update" element={<UpdateCity />} />
        <Route path="/error" element={<Error />} />
    </Routes>
);

export default MainRoutes;
