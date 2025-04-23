
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PieChartTurmasProps {
  data: {
    turma: string;
    quantidade: number;
  }[];
}

export function PieChartTurmas({ data }: PieChartTurmasProps) {
  // Array of colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participação por Turma</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="quantidade"
              nameKey="turma"
              label={({ turma, quantidade }) => `${turma}: ${quantidade}kg`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string, props: any) => {
                return [`${value} kg`, props.payload.turma];
              }} 
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
