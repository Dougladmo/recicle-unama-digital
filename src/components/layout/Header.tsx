import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-500">
          ReciclaUnama
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-gray-500">
                Sobre
              </Link>
            </li>
            {user ? (
              <li>
                <Link to="/dashboard" className="hover:text-gray-500">
                  Dashboard
                </Link>
              </li>
            ) : null}
            {user ? null : (
              <li>
                <Link to="/login" className="hover:text-gray-500">
                  Login
                </Link>
              </li>
            )}
            {user ? null : (
              <li>
                <Link to="/cadastro" className="hover:text-gray-500">
                  Cadastro
                </Link>
              </li>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.foto_url || undefined} alt="Foto de perfil" />
                    <AvatarFallback>{user.nome?.[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};
