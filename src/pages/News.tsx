
import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const News = () => {
  const news = [
    {
      id: 1,
      title: "Nova Parceria com Academia Local",
      date: "2025-05-25",
      author: "Diretoria do Clube",
      category: "Parcerias",
      content: `O Clube Harmonia tem o prazer de anunciar uma nova parceria estratégica com a Academia Fitness Plus, localizada a apenas duas quadras de nossas instalações.

      A partir de 1º de junho, todos os membros do clube terão direito a um desconto de 30% nas mensalidades da academia, além de acesso gratuito às aulas de hidroginástica e yoga.

      Esta parceria faz parte de nosso compromisso contínuo em oferecer benefícios exclusivos que promovam o bem-estar e a qualidade de vida de nossos associados. A Academia Fitness Plus é reconhecida na região por sua excelência em equipamentos e profissionais qualificados.

      Para usufruir do benefício, basta apresentar sua carteirinha de sócio na recepção da academia. Mais informações podem ser obtidas na secretaria do clube.`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Renovação das Instalações Concluída",
      date: "2025-05-20",
      author: "Comissão de Obras",
      category: "Infraestrutura",
      content: `Após três meses de trabalho intenso, foram finalizadas as obras de modernização do salão principal do Clube Harmonia. O projeto incluiu a renovação completa do sistema de iluminação, instalação de ar-condicionado central e reforma do palco.

      As melhorias também contemplaram a troca do piso, que agora conta com madeira de alta qualidade, ideal para eventos sociais e apresentações culturais. O sistema de som foi completamente atualizado com tecnologia digital de última geração.

      O novo layout permite maior flexibilidade na organização de eventos, podendo acomodar desde jantares íntimos para 50 pessoas até grandes celebrações para 200 convidados.

      A reabertura oficial acontecerá no Jantar de Gala Anual, em 15 de junho, quando todos poderão apreciar as melhorias implementadas. O investimento total foi de R$ 150 mil, financiado através do fundo de reserva do clube.`,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Clube Harmonia Completa 50 Anos de História",
      date: "2025-05-15",
      author: "Conselho Administrativo",
      category: "Institucional",
      content: `Em maio de 2025, o Clube Harmonia celebra meio século de existência, marcando cinco décadas de tradição, convivência e crescimento conjunto com a comunidade local.

      Fundado em 1975 por um grupo de visionários que buscavam criar um espaço de encontro e cultura, o clube começou com apenas 50 membros e hoje conta com mais de 500 associados ativos.

      Ao longo dos anos, o Clube Harmonia se tornou referência em eventos sociais, culturais e esportivos na região. Foram realizados mais de 2.500 eventos, desde pequenas reuniões familiares até grandes celebrações que marcaram época na cidade.

      Como parte das comemorações do jubileu de ouro, será lançado um livro contando a história do clube, com depoimentos de fundadores, fotos históricas e relatos marcantes. Também está prevista uma exposição fotográfica que ficará em cartaz durante todo o mês de junho.

      A festa oficial de aniversário acontecerá em agosto, com uma programação especial que incluirá apresentações musicais, jantar temático e homenagens aos membros mais antigos.`,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=300&fit=crop"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Parcerias": return "bg-green-100 text-green-800";
      case "Infraestrutura": return "bg-blue-100 text-blue-800";
      case "Institucional": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Notícias</h1>
          <p className="text-xl">Fique por dentro de todas as novidades do Clube Harmonia</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {news.map((article) => (
            <Card key={article.id} className="border-0 shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-blue-900 mb-2">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      {article.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
