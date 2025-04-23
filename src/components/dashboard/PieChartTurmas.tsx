
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PieChartTurmasProps {
  data: {
    turma: string;
    quantidade: number;
  }[];
}

export function PieChartTurmas({ data }: PieChartTurmasProps) {
  const isMobile = useIsMobile();
  // Array of colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Participação por Turma</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={!isMobile}
              outerRadius={isMobile ? 80 : 100}
              fill="#8884d8"
              dataKey="quantidade"
              nameKey="turma"
              label={isMobile ? false : ({ turma, quantidade }) => `${turma.substring(0, 10)}...: ${quantidade}kg`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string, props: any) => {
                return [`${value} kg`, props.payload.turma];
              }}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
              verticalAlign="bottom"
              formatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
