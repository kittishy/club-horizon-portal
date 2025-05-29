
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CH</span>
              </div>
              <span className="text-xl font-bold">Clube Harmonia</span>
            </div>
            <p className="text-gray-300 mb-4">
              Conectando pessoas através de experiências únicas há mais de 50 anos.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/eventos" className="text-gray-300 hover:text-white transition-colors">Eventos</a></li>
              <li><a href="/calendario" className="text-gray-300 hover:text-white transition-colors">Calendário</a></li>
              <li><a href="/noticias" className="text-gray-300 hover:text-white transition-colors">Notícias</a></li>
              <li><a href="/contatos" className="text-gray-300 hover:text-white transition-colors">Contatos</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Eventos Corporativos</li>
              <li>Festas de Casamento</li>
              <li>Formatura</li>
              <li>Workshops</li>
              <li>Palestras</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contatos</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  Rua das Palmeiras, 245<br />
                  Centro - São Paulo, SP
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-300 text-sm">(11) 3456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-300 text-sm">contato@clubeharmonia.com.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Clube Harmonia. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
