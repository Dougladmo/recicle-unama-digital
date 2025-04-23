
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface RankingTurmaProps {
  data: {
    turma: string;
    curso: string;
    semestre: number;
    quantidade: number;
  }[];
}

export function RankingTurmasTable({ data }: RankingTurmaProps) {
  const isMobile = useIsMobile();
  const [sortField, setSortField] = useState<string>("quantidade");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      const aString = String(aValue);
      const bString = String(bValue);
      return sortDirection === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
    }
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1 inline" /> : <ArrowDown className="h-4 w-4 ml-1 inline" />;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Ranking de Turmas</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Pos.</TableHead>
                <TableHead onClick={() => handleSort("turma")} className="cursor-pointer">
                  Turma <SortIcon field="turma" />
                </TableHead>
                {!isMobile && (
                  <>
                    <TableHead onClick={() => handleSort("curso")} className="cursor-pointer">
                      Curso <SortIcon field="curso" />
                    </TableHead>
                    <TableHead onClick={() => handleSort("semestre")} className="cursor-pointer">
                      Semestre <SortIcon field="semestre" />
                    </TableHead>
                  </>
                )}
                <TableHead onClick={() => handleSort("quantidade")} className="text-right cursor-pointer">
                  Kg Reciclados <SortIcon field="quantidade" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={item.turma}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.turma}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{item.curso}</TableCell>
                      <TableCell>{item.semestre}º</TableCell>
                    </>
                  )}
                  <TableCell className="text-right">{item.quantidade} kg</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

interface RankingAlunosProps {
  data: {
    nome: string;
    turma: string;
    quantidade: number;
  }[];
}

export function RankingAlunosTable({ data }: RankingAlunosProps) {
  const [sortField, setSortField] = useState<string>("quantidade");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      const aString = String(aValue);
      const bString = String(bValue);
      return sortDirection === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
    }
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1 inline" /> : <ArrowDown className="h-4 w-4 ml-1 inline" />;
  };

  // Limit to top 5 by default
  const displayData = sortedData.slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Alunos Destaques</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Pos.</TableHead>
                <TableHead onClick={() => handleSort("nome")} className="cursor-pointer">
                  Nome <SortIcon field="nome" />
                </TableHead>
                <TableHead onClick={() => handleSort("turma")} className="cursor-pointer">
                  Turma <SortIcon field="turma" />
                </TableHead>
                <TableHead onClick={() => handleSort("quantidade")} className="text-right cursor-pointer">
                  Kg Reciclados <SortIcon field="quantidade" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.turma}</TableCell>
                  <TableCell className="text-right">{item.quantidade} kg</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
