import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { Menu, X, Calendar, Users, Newspaper, Phone, Home as HomeIcon, LogIn, LogOut, UserCircle, Shield, UserPlus } from 'lucide-react'; // Added UserPlus
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
import { designTokens } from '@/lib/designTokens'; // To use gradient class strings

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActivePath = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const renderAuthSection = (isMobile: boolean) => {
    if (authLoading) {
      return <div className={`h-9 w-24 rounded-md bg-appNeutral-grayLighter animate-pulse ${isMobile ? 'w-full mt-2 h-10' : ''}`}></div>;
    }

    if (currentUser) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={`flex items-center space-x-2 p-2 hover:bg-appNeutral-grayLighter rounded-full transition-colors duration-200 ${
                isMobile ? 'w-full justify-start text-appNeutral-grayDarker' : 'text-appNeutral-grayDarker'
              }`}
            >
              <UserCircle size={isMobile ? 20 : 22} />
              {!isMobile && <span className="text-sm font-medium truncate max-w-[100px]">{currentUser.name}</span>}
              {isMobile && <span className="text-sm font-medium">{t('auth.userMenuMobile', { name: currentUser.name })}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isMobile ? 'start' : 'end'} className="w-56 bg-card text-card-foreground border-appNeutral-grayLight">
            <DropdownMenuLabel className="truncate font-medium">{t('auth.welcomeUser', { name: currentUser.name })}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-appNeutral-grayLight" />
            <DropdownMenuItem onClick={() => { navigate('/perfil'); setIsMenuOpen(false); }} className="cursor-pointer focus:bg-appNeutral-grayLighter focus:text-appNeutral-grayDarkest">
              <UserCircle className="mr-2 h-4 w-4 text-appNeutral-gray" />
              <span>{t('auth.myProfile')}</span>
            </DropdownMenuItem>
            {currentUser.role === 'admin' && (
              <DropdownMenuItem onClick={() => { navigate('/admin/dashboard'); setIsMenuOpen(false); }} className="cursor-pointer focus:bg-appNeutral-grayLighter focus:text-appNeutral-grayDarkest">
                <Shield className="mr-2 h-4 w-4 text-appNeutral-gray" />
                <span>{t('adminNav.dashboard')}</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout} className="text-appAccent-pinkDark hover:!text-appAccent-pinkDark focus:!bg-appAccent-pinkLight/50 focus:!text-appAccent-pinkDark cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('auth.logoutButton')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-2 w-full' : 'space-x-2'}`}>
        <Button 
          asChild 
          variant="outline" 
          size="sm" 
          className={`border-appNeutral-grayLight text-appPrimary hover:border-appPrimary hover:bg-appAccent-blueLight/30 transition-all duration-200 ${isMobile ? 'w-full justify-center text-base py-3' : 'px-4 py-2'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/login" className="flex items-center">
            <LogIn size={16} className="mr-1.5" /> {t('auth.loginButton')}
          </Link>
        </Button>
        <Button 
          asChild 
          size="sm" 
          className={`${designTokens.colors.gradients.primary} text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all duration-200 ${isMobile ? 'w-full justify-center text-base py-3' : 'px-4 py-2'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/registro" className="flex items-center">
             <UserPlus size={16} className="mr-1.5" /> {t('auth.registerButton')}
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out 
      ${scrollY > 20 
        ? 'bg-appNeutral-grayLightest/90 dark:bg-appNeutral-grayDarkest/90 backdrop-blur-lg shadow-sm border-b border-appNeutral-grayLight dark:border-appNeutral-grayDarker' 
        : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Standardized padding */}
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-[1.03]"
          >
            <div className={`w-9 h-9 ${designTokens.colors.gradients.primary} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-appNeutral-grayDarkest to-appNeutral-grayDark bg-clip-text text-transparent dark:from-appNeutral-grayLighter dark:to-appNeutral-grayLight">
                {t('Clube Harmonia')}
              </span>
              {/* Optional: Subtext can be removed for minimalism if preferred */}
              <span className="text-xs text-appNeutral-gray font-medium tracking-wide -mt-0.5"> 
                {t('Conectando pessoas')}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItemsData.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'bg-appAccent-blueLight/70 text-appAccent-blueDark dark:bg-appAccent-blueDark/30 dark:text-appAccent-blueLight' 
                      : 'text-appNeutral-grayDarker dark:text-appNeutral-grayLighter hover:bg-appNeutral-grayLighter dark:hover:bg-appNeutral-grayDark/50 hover:text-appPrimary dark:hover:text-appAccent-blueLight'
                    }`}
                >
                  <span className={`transition-colors duration-200 ${isActive ? 'text-appAccent-blueDark dark:text-appAccent-blueLight' : 'text-appNeutral-gray dark:text-appNeutral-grayLight'}`}>
                    {React.cloneElement(item.icon, { size: 16 })}
                  </span>
                  <span>{t(item.name)}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            {renderAuthSection(false)}
          </div>

          <div className="lg:hidden flex items-center">
            {/* Simplified mobile auth icons when menu is closed */}
            {!isMenuOpen && !authLoading && (
              currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2 rounded-full p-2 hover:bg-appNeutral-grayLighter dark:hover:bg-appNeutral-grayDark text-appNeutral-grayDarker dark:text-appNeutral-grayLighter">
                      <UserCircle size={22} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground border-appNeutral-grayLight">
                    <DropdownMenuLabel className="truncate font-medium">{t('auth.welcomeUser', { name: currentUser.name })}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-appNeutral-grayLight"/>
                    <DropdownMenuItem onClick={() => { navigate('/perfil'); setIsMenuOpen(false); }} className="cursor-pointer focus:bg-appNeutral-grayLighter focus:text-appNeutral-grayDarkest">
                      <UserCircle className="mr-2 h-4 w-4 text-appNeutral-gray" />
                      <span>{t('auth.myProfile')}</span>
                    </DropdownMenuItem>
                    {currentUser.role === 'admin' && (
                      <DropdownMenuItem onClick={() => { navigate('/admin/dashboard'); setIsMenuOpen(false); }} className="cursor-pointer focus:bg-appNeutral-grayLighter focus:text-appNeutral-grayDarkest">
                        <Shield className="mr-2 h-4 w-4 text-appNeutral-gray" />
                        <span>{t('adminNav.dashboard')}</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="text-appAccent-pinkDark hover:!text-appAccent-pinkDark focus:!bg-appAccent-pinkLight/50 focus:!text-appAccent-pinkDark cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('auth.logoutButton')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" size="icon" className="mr-2 rounded-full p-2 hover:bg-appNeutral-grayLighter dark:hover:bg-appNeutral-grayDark text-appNeutral-grayDarker dark:text-appNeutral-grayLighter" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login"><LogIn size={20}/></Link>
                </Button>
              )
            )}
            <Button
              variant="ghost"
              size="icon" /* Standard icon button size */
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-appNeutral-grayLighter dark:hover:bg-appNeutral-grayDark text-appNeutral-grayDarker dark:text-appNeutral-grayLighter transition-colors duration-200"
              aria-label={isMenuOpen ? t('ariaLabels.closeMenu') : t('ariaLabels.openMenu')}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 w-full shadow-lg pb-4 bg-appNeutral-grayLightest dark:bg-appNeutral-grayDarkest border-t border-appNeutral-grayLight dark:border-appNeutral-grayDarker"> {/* Full width */}
            <div className="container mx-auto px-4 sm:px-6 py-3 space-y-1.5"> {/* Consistent padding */}
              {navItemsData.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={`mobile-${item.name}`}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-appAccent-blueLight/80 text-appAccent-blueDark dark:bg-appAccent-blueDark/40 dark:text-appAccent-blueLight' 
                        : 'text-appNeutral-grayDarker dark:text-appNeutral-grayLighter hover:bg-appNeutral-grayLighter dark:hover:bg-appNeutral-grayDark/60 hover:text-appPrimary dark:hover:text-appAccent-blueLight'
                      }`}
                  >
                    <span className={`transition-colors duration-200 ${isActive ? 'text-appAccent-blueDark dark:text-appAccent-blueLight' : 'text-appNeutral-gray dark:text-appNeutral-grayLight'}`}>
                      {React.cloneElement(item.icon, { size: 20 })}
                    </span>
                    <span>{t(item.name)}</span>
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-appNeutral-grayLight dark:border-appNeutral-grayDark">
                {renderAuthSection(true)}
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
