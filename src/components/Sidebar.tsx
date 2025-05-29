import React from 'react';
import { Facebook, Instagram, Twitter, Clock, Phone, ExternalLink, Users, Calendar, Newspaper, Star, Award, MapPin, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { SidebarPartnerLink, SidebarSocialLink, SidebarUsefulInfo } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Sidebar: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const partnerSites: SidebarPartnerLink[] = [
    { name: 'Clube dos Livros', url: 'https://clubedoslivros.com.br' },
    { name: 'Associação Cultural', url: 'https://associacaocultural.org' },
    { name: 'Centro Esportivo', url: 'https://centroesportivo.com' },
    { name: 'Academia Wellness', url: 'https://academiawellness.com' },
  ];

  const socialLinks: SidebarSocialLink[] = [
    { name: 'Facebook', url: 'https://facebook.com/clubeharmonia', icon: <Facebook size={18} /> },
    { name: 'Instagram', url: 'https://instagram.com/clubeharmonia', icon: <Instagram size={18} /> },
    { name: 'Twitter', url: 'https://twitter.com/clubeharmonia', icon: <Twitter size={18} /> },
  ];

  const usefulInfo: SidebarUsefulInfo[] = [
    { 
      title: 'Horário de Funcionamento', 
      content: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h\nDomingo: Fechado', 
      icon: <Clock size={18} /> 
    },
    { 
      title: 'Telefone da Secretaria', 
      content: '(27) 3333-4444', 
      icon: <Phone size={18} /> 
    },
    { 
      title: 'Endereço', 
      content: 'Rua Alegria, 123\nCidade Feliz - ES', 
      icon: <MapPin size={18} /> 
    },
  ];

  const quickStats = [
    { label: 'Membros Ativos', value: '2.5K+', icon: <Users size={16} /> },
    { label: 'Eventos/Mês', value: '15+', icon: <Calendar size={16} /> },
    { label: 'Anos de História', value: '50+', icon: <Award size={16} /> },
  ];

  return (
    <aside className="w-80 space-y-6 p-6">
      {/* Club Stats */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Star className="w-5 h-5 text-blue-600" />
            <span>Clube em Números</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">{stat.icon}</span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-semibold">
                {stat.value}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Acesso Rápido</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link to="/eventos">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Próximos Eventos
            </Button>
          </Link>
          <Link to="/noticias">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Newspaper className="w-4 h-4 mr-2" />
              Últimas Notícias
            </Button>
          </Link>
          <Link to="/contato">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Entre em Contato
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Sites Parceiros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <ExternalLink className="w-5 h-5 text-green-600" />
            <span>{t('sidebar.partnerSites')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {partnerSites.map((site, index) => (
              <li key={index}>
                <a 
                  href={site.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors group p-2 rounded-lg hover:bg-gray-50"
                >
                  <span>{site.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Redes Sociais */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Users className="w-5 h-5 text-pink-600" />
            <span>{t('sidebar.socialMedia')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações Úteis */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span>{t('sidebar.usefulInfo')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {usefulInfo.map((info, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600">{info.icon}</span>
                <h4 className="font-medium text-gray-800 text-sm">{info.title}</h4>
              </div>
              <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{info.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Newsletter</h4>
              <p className="text-xs text-gray-600 mb-3">
                Receba as últimas novidades do clube
              </p>
            </div>
            <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Inscrever-se
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';

export default Sidebar;
