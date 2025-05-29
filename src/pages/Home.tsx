
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Jantar de Gala Anual",
      date: "2025-06-15",
      time: "19:00",
      location: "Salão Principal",
      description: "Nosso tradicional jantar de gala com música ao vivo e premiações."
    },
    {
      id: 2,
      title: "Torneio de Xadrez",
      date: "2025-06-08",
      time: "14:00",
      location: "Sala de Jogos",
      description: "Campeonato mensal de xadrez aberto a todos os membros."
    },
    {
      id: 3,
      title: "Workshop de Culinária",
      date: "2025-06-22",
      time: "10:00",
      location: "Cozinha Gourmet",
      description: "Aprenda técnicas culinárias com nosso chef convidado."
    }
  ];

  const recentNews = [
    {
      id: 1,
      title: "Nova Parceria com Academia Local",
      date: "2025-05-25",
      excerpt: "Anunciamos nossa parceria com a Academia Fitness Plus, oferecendo desconto especial..."
    },
    {
      id: 2,
      title: "Renovação das Instalações Concluída",
      date: "2025-05-20",
      excerpt: "As obras de modernização do salão principal foram finalizadas com sucesso..."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Bem-vindos ao Clube Harmonia</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Um espaço dedicado à convivência, cultura e networking. 
            Conectando pessoas através de experiências únicas há mais de 50 anos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700">
              <Link to="/eventos">Ver Eventos</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none px-8 py-3 font-semibold text-lg"
            >
              <Link 
                to="/contatos" 
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  ✨ Entre em Contato
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Membros Ativos</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Eventos por Ano</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-gray-600">Ambientes</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">50</h3>
              <p className="text-gray-600">Anos de História</p>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Próximos Eventos</h2>
            <Button asChild variant="outline">
              <Link to="/eventos">Ver Todos</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent News */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Últimas Notícias</h2>
            <Button asChild variant="outline">
              <Link to="/noticias">Ver Todas</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentNews.map((news) => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">{news.title}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {new Date(news.date).toLocaleDateString('pt-BR')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{news.excerpt}</p>
                  <Button asChild variant="link" className="p-0 h-auto mt-2">
                    <Link to="/noticias">Leia mais</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
