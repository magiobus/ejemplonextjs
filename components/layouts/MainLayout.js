import { Toaster } from "react-hot-toast";
import Header from "../common/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full flex flex-col h-screen">
      <Toaster position="bottom-center" reverseOrder={false} />

      <Header />
      <div className="content py-12 w-full flex items-center justify-center">
        {children}
      </div>
      {/* <footer className="bg-black text-white">
        <h1>Footer</h1>
      </footer> */}
    </div>
  );
};

export default MainLayout;
