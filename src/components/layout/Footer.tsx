
import { Link } from "react-router-dom";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-900 to-green-950 text-white relative">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold text-green-50">RecicleAqui Unama</h3>
            </div>
            <p className="text-green-200/90 leading-relaxed">
              Uma iniciativa para promover a reciclagem e contribuir para um planeta mais sustentável.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-50">Links Rápidos</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-green-200/90 hover:text-green-100 transition-colors">
                Início
              </Link>
              <Link to="/dashboard" className="text-green-200/90 hover:text-green-100 transition-colors">
                Dashboard
              </Link>
              <Link to="/registrar" className="text-green-200/90 hover:text-green-100 transition-colors">
                Registrar
              </Link>
              <Link to="/sobre" className="text-green-200/90 hover:text-green-100 transition-colors">
                Sobre
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-50">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-green-200/90">
                <Mail className="h-5 w-5 shrink-0 text-green-400" />
                <span>recicleaqui@unama.br</span>
              </li>
              <li className="flex items-center space-x-3 text-green-200/90">
                <MapPin className="h-5 w-5 shrink-0 text-green-400" />
                <span>Av. Alcindo Cacela, Belém - PA</span>
              </li>
              <li className="flex items-center space-x-3 text-green-200/90">
                <Phone className="h-5 w-5 shrink-0 text-green-400" />
                <span>(91) 3366-1001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-green-700/50 text-center">
          <p className="text-sm text-green-400/80">
            © {currentYear} RecicleAqui Unama. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

