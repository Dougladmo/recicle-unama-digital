import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Leaf } from "lucide-react";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    setMobileOpen(false);
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              RecicleAqui
            </span>
            <span className="hidden sm:inline-block text-[#032902] px-3 py-1 rounded-xl bg-black/5 text-sm font-medium">
              Unama
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link to="/sobre" className="text-gray-600 hover:text-green-600 transition-colors">
              Sobre
            </Link>
            {user && (
              <Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                Dashboard
              </Link>
            )}
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-green-600 hover:bg-green-50">
                    Login
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Cadastro
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-green-100 hover:ring-green-200 transition-all">
                    <AvatarImage src={user.foto_url || undefined} alt="Foto de perfil" />
                    <AvatarFallback className="bg-green-100 text-green-600">{user.nome?.[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="w-full cursor-pointer">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleSignOut} className="text-red-500 cursor-pointer">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-green-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6 text-green-600" /> : <Menu className="h-6 w-6 text-green-600" />}
          </button>
        </div>
      </div>

      {/* mobile nav drawer corrigido */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-white md:hidden">
          <nav
            className="flex flex-col gap-6 px-6 py-8 pt-[73px] h-full overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/sobre"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Sobre
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/cadastro"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  Cadastro
                </Link>
              </>
            )}
            {user && (
              <>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Minha Conta</p>
                </div>
                <Link
                  to="/perfil"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-lg font-medium text-red-500 hover:text-red-600 transition-colors text-left"
                >
                  Sair
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

