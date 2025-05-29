<<<<<<< HEAD
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumbs />
      <div className="flex flex-1 container mx-auto pb-8 px-4 md:px-0">
        <main className="flex-1 bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <Outlet /> {/* O conteúdo da página específica será renderizado aqui */}
        </main>
        <div className="hidden md:block ml-8">
          <Sidebar />
        </div>
      </div>
=======

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
      
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
      <Footer />
    </div>
  );
};

export default Layout;
