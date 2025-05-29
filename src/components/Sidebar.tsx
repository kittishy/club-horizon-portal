import React from 'react';
// import { Link } from 'react-router-dom'; // Link não é usado diretamente aqui para links externos
import { Facebook, Instagram, Twitter, ExternalLink, Info } from 'lucide-react';
import { PartnerLink, SocialLinkInfo, UsefulInfoItem } from '@/types'; // Importar tipos compartilhados

interface SidebarLinkProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = React.memo(({ href, text, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-md transition-colors"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </a>
));
SidebarLink.displayName = 'SidebarLink';

const partnerLinks: PartnerLink[] = [
  { name: 'Hotel Central Plaza', url: '#', description: 'Tarifas preferenciais para sócios.' },
  { name: 'Restaurante Sabor Divino', url: '#', description: 'Desconto de 10% em refeições.' },
];

const socialLinks: SocialLinkInfo[] = [
  { name: 'Facebook', url: '#', icon: <Facebook size={18} /> },
  { name: 'Instagram', url: '#', icon: <Instagram size={18} /> },
  { name: 'Twitter', url: '#', icon: <Twitter size={18} /> },
];

const usefulInfo: UsefulInfoItem[] = [
  { title: 'Horário de Funcionamento', content: 'Seg-Sex: 8h-22h | Sáb-Dom: 9h-20h' },
  { title: 'Telefone da Secretaria', content: '(27) 3333-1234' },
];

const Sidebar: React.FC = React.memo(() => {
  return (
    <aside className="w-64 bg-white p-6 shadow-lg space-y-8 border-l border-gray-200">
      {/* Sites Parceiros */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Sites Parceiros</h3>
        <ul className="space-y-3">
          {partnerLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <h4 className="font-medium text-gray-700 group-hover:text-blue-600 text-sm">
                  {link.name} <ExternalLink size={14} className="inline ml-1 opacity-50 group-hover:opacity-100" />
                </h4>
                <p className="text-xs text-gray-500">{link.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Redes Sociais */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Redes Sociais</h3>
        <ul className="space-y-2">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <SidebarLink href={link.url} text={link.name} icon={link.icon} />
            </li>
          ))}
        </ul>
      </section>

      {/* Informações Úteis */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Informações Úteis</h3>
        <ul className="space-y-3">
          {usefulInfo.map((info) => (
            <li key={info.title} className="text-sm p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-700 mb-1">
                <Info size={16} className="mr-2" />
                <h4 className="font-medium">{info.title}</h4>
              </div>
              <p className="text-gray-600 text-xs">{info.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';

export default Sidebar;
