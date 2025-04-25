
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { DashboardFilters } from "@/types";

interface DashboardFiltersComponentProps {
  onFilterChange: (filters: DashboardFilters) => void;
}

export function DashboardFiltersComponent({ onFilterChange }: DashboardFiltersComponentProps) {
  const [curso, setCurso] = useState<string | null>(null);
  const [semestre, setSemestre] = useState<number | null>(null);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);

  const handleFilterChange = () => {
    onFilterChange({
      curso,
      semestre,
      dataInicio,
      dataFim,
    });
  };

  const handleReset = () => {
    setCurso(null);
    setSemestre(null);
    setDataInicio(null);
    setDataFim(null);
    onFilterChange({
      curso: null,
      semestre: null,
      dataInicio: null,
      dataFim: null,
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="curso">Curso</Label>
            <Select
              value={curso || ""}
              onValueChange={(value) => setCurso(value !== "" ? value : null)}
            >
              <SelectTrigger id="curso">
                <SelectValue placeholder="Selecione o curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="ADS">ADS</SelectItem>
                <SelectItem value="BCC">BCC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="semestre">Semestre</Label>
            <Select
              value={semestre ? String(semestre) : ""}
              onValueChange={(value) => setSemestre(value !== "" ? Number(value) : null)}
            >
              <SelectTrigger id="semestre">
                <SelectValue placeholder="Selecione o semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="1">1º</SelectItem>
                <SelectItem value="2">2º</SelectItem>
                <SelectItem value="3">3º</SelectItem>
                <SelectItem value="4">4º</SelectItem>
                <SelectItem value="5">5º</SelectItem>
                <SelectItem value="6">6º</SelectItem>
                <SelectItem value="7">7º</SelectItem>
                <SelectItem value="8">8º</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="dataInicio">Data Início</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="dataInicio"
                >
                  {dataInicio ? format(dataInicio, 'dd/MM/yyyy') : (
                    <span className="text-muted-foreground">Selecione a data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataInicio}
                  onSelect={setDataInicio}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="dataFim">Data Fim</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="dataFim"
                >
                  {dataFim ? format(dataFim, 'dd/MM/yyyy') : (
                    <span className="text-muted-foreground">Selecione a data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataFim}
                  onSelect={setDataFim}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleReset}>Limpar</Button>
          <Button onClick={handleFilterChange}>Filtrar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardFiltersComponent;
