
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
            RecicleAqui Unama
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contribua para um futuro sustentável registrando suas entregas de materiais recicláveis
            e acompanhe o impacto da sua turma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Ver Métricas
              </Button>
            </Link>
            <Link to="/registrar">
              <Button size="lg" variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                Registrar Entrega
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que participar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-8 w-8"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ambiente Saudável</h3>
              <p className="text-gray-600">
                Ao reciclar, você contribui diretamente para a redução de resíduos e poluição ambiental.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-8 w-8"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 8-2 3-4 1-1 4-3 2" />
                  <path d="M7.7 7.7a6 6 0 0 0 0 8.5" />
                  <path d="M15.5 15.5a6 6 0 0 0 0-8.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competição Saudável</h3>
              <p className="text-gray-600">
                Sua turma pode se destacar e competir pelo topo do ranking de reciclagem da universidade.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-8 w-8"
                >
                  <path d="m9 11-6 6v3h9l3-3" />
                  <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
                  <path d="M5 8V5h3" />
                  <path d="M19 5h3v3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Impacto Mensurável</h3>
              <p className="text-gray-600">
                Acompanhe métricas reais do quanto você e sua turma estão contribuindo para o meio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Colete</h3>
              <p className="text-gray-600">
                Separe seus resíduos recicláveis: alumínio, vidro, papel ou PET.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entregue</h3>
              <p className="text-gray-600">
                Leve-os para o ponto de coleta da sua unidade na UNAMA.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Registre</h3>
              <p className="text-gray-600">
                Use o app para registrar sua entrega e os detalhes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Acompanhe</h3>
              <p className="text-gray-600">
                Visualize o impacto da sua contribuição e da sua turma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Comece agora a registrar suas entregas e acompanhar seu impacto positivo no meio ambiente.
          </p>
          <Link to="/cadastro">
            <Button size="lg" className="bg-white text-green-500 hover:bg-green-50">
              Cadastre-se Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
