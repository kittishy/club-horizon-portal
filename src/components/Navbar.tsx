import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '@/types';
import { useTranslation } from 'react-i18next';

const navItemsData: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Eventos', path: '/eventos' },
  { name: 'Calendário', path: '/calendario' },
  { name: 'Notícias', path: '/noticias' },
  { name: 'Contatos', path: '/contato' },
];

const Navbar: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
          {t('Clube Harmonia')}
        </Link>
        <ul className="flex space-x-4">
          {navItemsData.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
