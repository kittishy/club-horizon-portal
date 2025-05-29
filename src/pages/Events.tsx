
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Jantar de Gala Anual",
      date: "2025-06-15",
      time: "19:00",
      location: "Salão Principal",
      description: "Nosso tradicional jantar de gala com música ao vivo, premiações e networking. Dress code: traje social completo.",
      category: "Social",
      participants: 120,
      status: "Inscrições Abertas"
    },
    {
      id: 2,
      title: "Torneio de Xadrez",
      date: "2025-06-08",
      time: "14:00",
      location: "Sala de Jogos",
      description: "Campeonato mensal de xadrez aberto a todos os membros. Premiação para os três primeiros colocados.",
      category: "Esportivo",
      participants: 24,
      status: "Inscrições Abertas"
    },
    {
      id: 3,
      title: "Workshop de Culinária",
      date: "2025-06-22",
      time: "10:00",
      location: "Cozinha Gourmet",
      description: "Aprenda técnicas culinárias francesas com nosso chef convidado Jean-Pierre. Inclui degustação.",
      category: "Cultural",
      participants: 16,
      status: "Quase Lotado"
    },
    {
      id: 4,
      title: "Palestra: Investimentos 2025",
      date: "2025-06-30",
      time: "19:30",
      location: "Auditório",
      description: "Especialista em mercado financeiro apresenta tendências e oportunidades para o segundo semestre.",
      category: "Educativo",
      participants: 80,
      status: "Inscrições Abertas"
    },
    {
      id: 5,
      title: "Noite de Jazz",
      date: "2025-07-05",
      time: "20:00",
      location: "Terraço",
      description: "Uma noite especial com trio de jazz local. Ambiente intimista com vista para a cidade.",
      category: "Cultural",
      participants: 45,
      status: "Em Breve"
    },
    {
      id: 6,
      title: "Torneio de Tênis",
      date: "2025-07-12",
      time: "08:00",
      location: "Quadras Externas",
      description: "Campeonato de tênis em duplas. Café da manhã incluso para todos os participantes.",
      category: "Esportivo",
      participants: 32,
      status: "Em Breve"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Social": return "bg-purple-100 text-purple-800";
      case "Esportivo": return "bg-green-100 text-green-800";
      case "Cultural": return "bg-blue-100 text-blue-800";
      case "Educativo": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Inscrições Abertas": return "bg-green-100 text-green-800";
      case "Quase Lotado": return "bg-orange-100 text-orange-800";
      case "Lotado": return "bg-red-100 text-red-800";
      case "Em Breve": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Eventos</h1>
          <p className="text-xl">Descubra todas as atividades e eventos do Clube Harmonia</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
                <CardTitle className="text-blue-900">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {event.participants} participantes esperados
                  </div>
                </div>
                <p className="text-gray-700">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
