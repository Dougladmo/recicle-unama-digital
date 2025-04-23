
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
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value} kg`, 'Quantidade']}
            />
            <Legend />
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
