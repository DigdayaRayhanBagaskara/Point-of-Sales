import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import SideBar from "../SideBar";

const LayoutSuperAdmin = () => {
  return (
    <>
      <div className="flex h-full w-full ">
        <SideBar />
        <div className="h-full w-full m-3 ">
          <Outlet />
          <div className="p-3">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSuperAdmin;
