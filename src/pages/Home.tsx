import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Leaf, Recycle, TreeDeciduous } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export default function Home() {
  return <div className="flex flex-col">
      {/* Hero Section with forest background and enhanced overlay */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/60 to-green-950/80 z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiMwMGEwNTAiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwIi8+PC9nPjwvc3ZnPg==')] opacity-5 z-20" />
        
        <div className="container mx-auto px-4 text-center relative z-30">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-lg">
            RecicleAqui 
            <span className="text-green-900">Unama</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Contribua para um futuro sustentável registrando suas entregas de materiais recicláveis
            e acompanhe o impacto da sua turma em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Globe className="mr-2" />
                Ver Métricas
              </Button>
            </Link>
            <Link to="/registrar">
              <Button size="lg" className="bg-transparent border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white/10 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 glassmorphism">
                <Recycle className="mr-2" />
                Registrar Entrega
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="py-16 bg-gradient-to-b from-white via-green-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/60 backdrop-blur-lg border border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">2,540kg</div>
                <p className="text-gray-600">Material Reciclado</p>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-lg border border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">847</div>
                <p className="text-gray-600">Entregas Realizadas</p>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-lg border border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">32</div>
                <p className="text-gray-600">Turmas Participantes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section with enhanced cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiMwMGEwNTAiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwIi8+PC9nPjwvc3ZnPg==')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-800">
            Por que participar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[{
            icon: Leaf,
            title: "Ambiente Saudável",
            description: "Ao reciclar, você contribui diretamente para a redução de resíduos e poluição ambiental, criando um futuro mais sustentável.",
            gradient: "from-green-400 to-green-600"
          }, {
            icon: Globe,
            title: "Competição Saudável",
            description: "Sua turma pode se destacar e competir pelo topo do ranking de reciclagem da universidade, incentivando a participação coletiva.",
            gradient: "from-blue-400 to-green-500"
          }, {
            icon: TreeDeciduous,
            title: "Impacto Mensurável",
            description: "Acompanhe métricas reais do quanto você e sua turma estão contribuindo para o meio ambiente através de dados transparentes.",
            gradient: "from-emerald-400 to-green-500"
          }].map((item, index) => <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -m-2" />
                <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>)}
          </div>
        </div>
      </section>

      {/* How it works section with timeline */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-800">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[{
            step: 1,
            title: "Colete",
            description: "Separe seus resíduos recicláveis: alumínio, vidro, papel ou PET."
          }, {
            step: 2,
            title: "Entregue",
            description: "Leve-os para o ponto de coleta da sua unidade na UNAMA."
          }, {
            step: 3,
            title: "Registre",
            description: "Use o app para registrar sua entrega e os detalhes."
          }, {
            step: 4,
            title: "Acompanhe",
            description: "Visualize o impacto da sua contribuição e da sua turma."
          }].map((item, index) => <div key={index} className="relative">
                <div className="group">
                  <Card className="bg-white/80 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < 3 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200" />}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with gradient and pattern */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-400" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
            Comece agora a registrar suas entregas e acompanhar seu impacto positivo no meio ambiente.
          </p>
          <Link to="/cadastro">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Cadastre-se Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>;
}