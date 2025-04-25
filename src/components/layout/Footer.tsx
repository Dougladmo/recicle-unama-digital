
import { Link } from "react-router-dom";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-white/90" />
              <h3 className="text-xl font-bold">RecicleAqui Unama</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Uma iniciativa para promover a reciclagem e contribuir para um planeta mais sustentável.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/registrar" className="text-white/80 hover:text-white transition-colors">
                Registrar
              </Link>
              <Link to="/sobre" className="text-white/80 hover:text-white transition-colors">
                Sobre
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-white/80">
                <Mail className="h-5 w-5 shrink-0" />
                <span>recicleaqui@unama.br</span>
              </li>
              <li className="flex items-center space-x-3 text-white/80">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>Av. Alcindo Cacela, Belém - PA</span>
              </li>
              <li className="flex items-center space-x-3 text-white/80">
                <Phone className="h-5 w-5 shrink-0" />
                <span>(91) 3366-1001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/70">
            © {currentYear} RecicleAqui Unama. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
