
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeSeriesChartProps {
  data: {
    semana: string;
    quantidade: number;
  }[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Evolução da Reciclagem</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semana" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`${value} kg`, 'Quantidade']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="quantidade" 
              stroke="#027b3f" 
              name="Kg Reciclados"
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
