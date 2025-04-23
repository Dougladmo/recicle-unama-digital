
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Sobre() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-green-500 mb-6">Sobre o RecicleAqui Unama</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            O projeto RecicleAqui é uma iniciativa da Universidade da Amazônia (UNAMA) para incentivar
            e monitorar as práticas de reciclagem entre os estudantes, promovendo a sustentabilidade
            e conscientização ambiental.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Nossa Missão</h2>
          <p>
            Promover a cultura da reciclagem e sustentabilidade no ambiente acadêmico, capacitando 
            estudantes a fazerem parte da solução para problemas ambientais globais através de 
            ações locais mensuráveis.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Como Participar</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Cadastre-se na plataforma</li>
            <li>Colete e separe os materiais recicláveis (alumínio, vidro, papel, PET)</li>
            <li>Entregue nos pontos de coleta da UNAMA</li>
            <li>Registre sua entrega no sistema</li>
            <li>Acompanhe os resultados no dashboard</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Materiais Aceitos</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Alumínio:</strong> Latas, papel alumínio limpo, embalagens</li>
            <li><strong>Vidro:</strong> Garrafas, potes, frascos</li>
            <li><strong>Pano/Tecido:</strong> Roupas, toalhas, lençóis</li>
            <li><strong>PET:</strong> Garrafas plásticas, embalagens</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Benefícios</h2>
          <p>
            Além de contribuir para a preservação do meio ambiente, os alunos e turmas participantes 
            têm visibilidade nos rankings da universidade, incentivando uma competição saudável pela 
            sustentabilidade.
          </p>
          
          <div className="mt-12 flex justify-center">
            <Link to="/cadastro">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Participe Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
