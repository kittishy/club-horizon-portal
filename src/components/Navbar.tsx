<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { Menu, X, Calendar, Users, Newspaper, Phone, Home as HomeIcon, LogIn, LogOut, UserCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/hooks/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItemsData: NavItem[] = [
  { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
  { name: 'Eventos', path: '/eventos', icon: <Calendar size={18} /> },
  { name: 'Calendário', path: '/calendario', icon: <Calendar size={18} /> },
  { name: 'Notícias', path: '/noticias', icon: <Newspaper size={18} /> },
  { name: 'Contatos', path: '/contato', icon: <Phone size={18} /> },
];

const Navbar: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { currentUser, isLoading: authLoading } = useAuth();
  const { logout } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const renderAuthSection = (isMobile: boolean) => {
    if (authLoading) {
      return <div className={`h-8 w-20 rounded-md bg-gray-200 animate-pulse ${isMobile ? 'w-full mt-2' : ''}`}></div>;
    }

    if (currentUser) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 ${
                isMobile ? 'w-full justify-start text-gray-700' : 'text-gray-700'
              }`}
            >
              <UserCircle size={isMobile ? 20 : 24} />
              {!isMobile && <span className="text-sm font-medium truncate max-w-[100px]">{currentUser.name}</span>}
              {isMobile && <span className="text-sm font-medium">{t('auth.userMenuMobile', { name: currentUser.name})}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isMobile ? 'start' : 'end'} className="w-56">
            <DropdownMenuLabel className="truncate">{t('auth.welcomeUser', { name: currentUser.name })}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { navigate('/perfil'); setIsMenuOpen(false); }} className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>{t('auth.myProfile')}</span>
            </DropdownMenuItem>
            {currentUser.role === 'admin' && (
              <DropdownMenuItem onClick={() => { navigate('/admin/dashboard'); setIsMenuOpen(false); }} className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>{t('adminNav.dashboard')}</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:!text-red-600 hover:!bg-red-50 focus:!bg-red-50 focus:!text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('auth.logoutButton')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-2 w-full' : 'space-x-3'}`}>
        <Button 
          asChild 
          variant="outline" 
          size="sm" 
          className={`border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/login" className="flex items-center">
            <LogIn size={16} className="mr-1.5" /> {t('auth.loginButton')}
          </Link>
        </Button>
        <Button 
          asChild 
          size="sm" 
          className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow hover:shadow-md transition-all duration-300 hover:scale-105 ${isMobile ? 'w-full justify-center' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/registro">
            {t('auth.registerButton')}
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300 ${
      scrollY > 50 ? 'shadow-lg border-gray-200/50' : 'border-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t('Clube Harmonia')}
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                Conectando pessoas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItemsData.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className={`transition-colors duration-300 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{t(item.name)}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center">
            {renderAuthSection(false)}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {!isMenuOpen && !currentUser && !authLoading && (
                <Button asChild variant="ghost" size="sm" className="mr-2 p-1.5" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login"><LogIn size={20}/></Link>
                </Button>
            )}
            {currentUser && !authLoading && (
                 <div className="mr-2">
                    {renderAuthSection(true)}
                 </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
=======

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Eventos", href: "/eventos" },
    { name: "Calendário", href: "/calendario" },
    { name: "Notícias", href: "/noticias" },
    { name: "Contatos", href: "/contatos" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CH</span>
              </div>
              <span className="text-xl font-bold text-blue-900">Clube Harmonia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
<<<<<<< HEAD
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur">
            <div className="py-4 space-y-2">
              {navItemsData.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {item.icon}
                    </span>
                    <span>{t(item.name)}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100 px-4">
                {renderAuthSection(true)}
              </div>
=======
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
            </div>
          </div>
        )}
      </div>
    </nav>
  );
<<<<<<< HEAD
});

Navbar.displayName = 'Navbar';
=======
};
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0

export default Navbar;
