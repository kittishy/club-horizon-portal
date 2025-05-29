
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {showSidebar ? (
          <div className="flex">
            <main className="flex-1 min-w-0">
              {children}
            </main>
            <aside className="w-80 p-6 bg-gray-50 border-l hidden lg:block">
              <Sidebar />
            </aside>
          </div>
        ) : (
          <main className="flex-1">
            {children}
          </main>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
