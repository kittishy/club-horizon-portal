import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 container mx-auto py-8 px-4 md:px-0">
        <main className="flex-1 bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <Outlet /> {/* O conteúdo da página específica será renderizado aqui */}
        </main>
        <div className="hidden md:block ml-8">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
