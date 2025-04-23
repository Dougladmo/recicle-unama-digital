
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RecicleAqui Unama</h3>
            <p className="text-sm text-white/80">
              Uma iniciativa para promover a reciclagem e contribuir para um planeta mais sustentável.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/registrar" className="text-sm text-white/80 hover:text-white transition-colors">
                  Registrar Entrega
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-white/80 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm text-white/80">
                <strong>Email:</strong> recicleaqui@unama.br
              </li>
              <li className="text-sm text-white/80">
                <strong>Endereço:</strong> Av. Alcindo Cacela, Belém - PA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/70">
          <p>© {currentYear} RecicleAqui Unama. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
