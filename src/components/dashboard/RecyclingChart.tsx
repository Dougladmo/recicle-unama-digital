
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecyclingChartProps {
  data: {
    tipo: string;
    quantidade: number;
  }[];
  title: string;
}

export function RecyclingChart({ data, title }: RecyclingChartProps) {
  // Define colors for different waste types
  const COLORS = {
    'alumínio': '#0088FE',
    'vidro': '#00C49F',
    'pano': '#FFBB28',
    'PET': '#FF8042',
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <XAxis dataKey="tipo" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => [`${value} kg`, 'Quantidade']}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
              verticalAlign="bottom" 
            />
            <Bar dataKey="quantidade" name="Quantidade (kg)">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.tipo as keyof typeof COLORS] || '#8884d8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
