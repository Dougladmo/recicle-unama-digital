
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimeSeriesChartProps {
  data: {
    semana: string;
    quantidade: number;
  }[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Evolução da Reciclagem</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="semana" 
              tick={{ fontSize: 12 }}
              interval={isMobile ? 1 : 0}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => [`${value} kg`, 'Quantidade']}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
              verticalAlign="bottom" 
            />
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
