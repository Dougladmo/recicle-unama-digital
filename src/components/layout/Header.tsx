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
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    setMobileOpen(false);
    await signOut();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-500">
          RecicleAqui
          <span className="text-[#032902] p-2 rounded-xl bg-black/15 ml-2">Unama</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>
          <Link to="/sobre" className="hover:text-gray-500">
            Sobre
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-gray-500">
              Dashboard
            </Link>
          )}
          {!user && (
            <>
              <Link to="/login" className="hover:text-gray-500">
                Login
              </Link>
              <Link to="/cadastro" className="hover:text-gray-500">
                Cadastro
              </Link>
            </>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.foto_url || undefined} alt="Foto de perfil" />
                  <AvatarFallback>{user.nome?.[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignOut}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-2 px-4 py-4">
            <li>
              <Link to="/" onClick={() => setMobileOpen(false)} className="block hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sobre" onClick={() => setMobileOpen(false)} className="block hover:text-gray-500">
                Sobre
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block hover:text-gray-500">
                  Dashboard
                </Link>
              </li>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block hover:text-gray-500">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro" onClick={() => setMobileOpen(false)} className="block hover:text-gray-500">
                    Cadastro
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="pt-2 border-t border-gray-100">
                  <span className="block font-medium">Minha Conta</span>
                </li>
                <li>
                  <Link to="/perfil" onClick={() => setMobileOpen(false)} className="block hover:text-gray-500">
                    Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left hover:text-gray-500"
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
