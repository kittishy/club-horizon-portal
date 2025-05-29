import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { Menu, X, Calendar, Users, Newspaper, Phone, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              Entrar
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Associe-se
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-center border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  Entrar
                </Button>
                <Button 
                  size="sm" 
                  className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Associe-se
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
