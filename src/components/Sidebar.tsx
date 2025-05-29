
import { ExternalLink, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const partners = [
    { name: "Academia Fitness Plus", url: "#", description: "Desconto especial para sócios" },
    { name: "Restaurante Bella Vista", url: "#", description: "10% de desconto" },
    { name: "Hotel Central Plaza", url: "#", description: "Tarifas preferenciais" },
    { name: "Livraria Conhecimento", url: "#", description: "15% off em livros" }
  ];

  const usefulInfo = [
    "Horário da recepção: 7h às 22h",
    "Reserva de salões: até 15 dias antecedência",
    "Estacionamento gratuito para sócios",
    "Wi-Fi liberado em todas as áreas",
    "Dress code: traje social nos eventos"
  ];

  return (
    <div className="space-y-6">
      {/* Social Media */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Partners */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Parceiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partners.map((partner, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-3">
                <h4 className="font-semibold text-sm text-gray-900">{partner.name}</h4>
                <p className="text-xs text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Useful Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Informações Úteis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {usefulInfo.map((info, index) => (
              <div key={index} className="text-sm text-gray-700 pb-2 border-b border-gray-100 last:border-b-0">
                {info}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Receba as últimas novidades e eventos do clube em seu e-mail
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
            Assinar Newsletter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
