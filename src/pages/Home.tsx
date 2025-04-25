
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Leaf, Recycle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with improved gradient and animations */}
      <section className="relative bg-gradient-to-b from-white via-green-50 to-green-100 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiMwMGEwNTAiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwIi8+PC9nPjwvc3ZnPg==')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-green-600 mb-8 animate-fade-in">
            RecicleAqui Unama
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Contribua para um futuro sustentável registrando suas entregas de materiais recicláveis
            e acompanhe o impacto da sua turma em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 h-auto">
                <Globe className="mr-2" />
                Ver Métricas
              </Button>
            </Link>
            <Link to="/registrar">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-6 h-auto">
                <Recycle className="mr-2" />
                Registrar Entrega
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section with improved cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Por que participar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Ambiente Saudável</h3>
              <p className="text-gray-600 leading-relaxed">
                Ao reciclar, você contribui diretamente para a redução de resíduos e poluição ambiental, criando um futuro mais sustentável.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Competição Saudável</h3>
              <p className="text-gray-600 leading-relaxed">
                Sua turma pode se destacar e competir pelo topo do ranking de reciclagem da universidade, incentivando a participação coletiva.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Recycle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Impacto Mensurável</h3>
              <p className="text-gray-600 leading-relaxed">
                Acompanhe métricas reais do quanto você e sua turma estão contribuindo para o meio ambiente através de dados transparentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - with timeline design */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Colete",
                description: "Separe seus resíduos recicláveis: alumínio, vidro, papel ou PET."
              },
              {
                step: 2,
                title: "Entregue",
                description: "Leve-os para o ponto de coleta da sua unidade na UNAMA."
              },
              {
                step: 3,
                title: "Registre",
                description: "Use o app para registrar sua entrega e os detalhes."
              },
              {
                step: 4,
                title: "Acompanhe",
                description: "Visualize o impacto da sua contribuição e da sua turma."
              }
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with gradient */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Comece agora a registrar suas entregas e acompanhar seu impacto positivo no meio ambiente.
          </p>
          <Link to="/cadastro">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-6 h-auto">
              Cadastre-se Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
