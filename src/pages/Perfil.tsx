
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState(user?.nome || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.foto_url || null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile || !user) return;

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(filePath, selectedFile, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('user-photos')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('alunos')
        .update({ foto_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: 'Foto atualizada',
        description: 'Sua foto de perfil foi atualizada com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar a foto.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      // Deletar todas as entregas do usuário
      await supabase.from('entregas').delete().eq('aluno_id', user.id);
      
      // Deletar o registro do aluno
      await supabase.from('alunos').delete().eq('id', user.id);
      
      // Deletar usuário de autenticação
      await supabase.auth.signOut();

      toast({
        title: 'Conta excluída',
        description: 'Sua conta foi excluída com sucesso.',
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a conta.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('alunos')
        .update({ nome })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Perfil atualizado',
        description: 'Seus dados foram atualizados com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o perfil.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <Input 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Seu nome" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Matrícula</label>
            <Input value={user?.matricula} disabled />
          </div>
          <Button onClick={handleUpdateProfile} className="w-full">
            Atualizar Perfil
          </Button>
        </div>
        <div>
          <div className="mb-4 flex flex-col items-center">
            <Avatar className="w-40 h-40 mb-4">
              <AvatarImage src={preview || undefined} alt="Foto de perfil" />
              <AvatarFallback>{user?.nome?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex space-x-2 mb-4">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="w-full"
              />
              <Button 
                onClick={handleUploadPhoto} 
                disabled={!selectedFile}
                className="bg-green-500 hover:bg-green-600"
              >
                Enviar
              </Button>
            </div>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount} 
            className="w-full"
          >
            Excluir Conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
