
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user, signOut } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" x2="12" y1="22" y2="12" />
              </svg>
            </div>
            <span className="text-lg font-bold text-green-500">RecicleAqui</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-500 hover:text-green-500 transition-colors">
              Início
            </Link>
            <Link to="/dashboard" className="text-gray-500 hover:text-green-500 transition-colors">
              Dashboard
            </Link>
            {user && (
              <Link to="/registrar" className="text-gray-500 hover:text-green-500 transition-colors">
                Registrar Entrega
              </Link>
            )}
            <Link to="/sobre" className="text-gray-500 hover:text-green-500 transition-colors">
              Sobre
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.foto_url} alt={user.nome} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {user.nome.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/minhas-entregas">Minhas Entregas</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="default" className="bg-green-500 hover:bg-green-600">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
