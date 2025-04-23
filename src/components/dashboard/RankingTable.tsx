
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RankingTurmaProps {
  data: {
    turma: string;
    curso: string;
    semestre: number;
    quantidade: number;
  }[];
}

export function RankingTurmasTable({ data }: RankingTurmaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking de Turmas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Pos.</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Semestre</TableHead>
              <TableHead className="text-right">Kg Reciclados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.turma}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.turma}</TableCell>
                <TableCell>{item.curso}</TableCell>
                <TableCell>{item.semestre}º</TableCell>
                <TableCell className="text-right">{item.quantidade} kg</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alunos Destaques</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Pos.</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead className="text-right">Kg Reciclados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.turma}</TableCell>
                <TableCell className="text-right">{item.quantidade} kg</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
