
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, FilterX } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { DashboardFilters } from "@/types";

interface DashboardFiltersProps {
  onFilterChange: (filters: DashboardFilters) => void;
}

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [filters, setFilters] = useState<DashboardFilters>({
    curso: null,
    semestre: null,
    dataInicio: null,
    dataFim: null,
  });
  
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  const handleResetFilters = () => {
    setFilters({
      curso: null,
      semestre: null,
      dataInicio: null,
      dataFim: null,
    });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
        <h2 className="text-lg font-medium">Filtros</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full md:w-auto">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="curso">Curso</Label>
            <Select
              value={filters.curso ?? ""}
              onValueChange={(value) => setFilters({ ...filters, curso: value || null })}
            >
              <SelectTrigger id="curso">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="ADS">ADS</SelectItem>
                <SelectItem value="BCC">BCC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="semestre">Semestre</Label>
            <Select 
              value={filters.semestre?.toString() ?? ""}
              onValueChange={(value) => setFilters({ ...filters, semestre: value ? Number(value) : null })}
            >
              <SelectTrigger id="semestre">
                <SelectValue placeholder="Todos" />
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

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="dataInicio">Data Inicial</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dataInicio"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {filters.dataInicio ? (
                    format(filters.dataInicio, "PPP", { locale: pt })
                  ) : (
                    <span className="text-muted-foreground">Selecionar data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dataInicio || undefined}
                  onSelect={(date) => setFilters({ ...filters, dataInicio: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="dataFim">Data Final</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dataFim"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {filters.dataFim ? (
                    format(filters.dataFim, "PPP", { locale: pt })
                  ) : (
                    <span className="text-muted-foreground">Selecionar data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dataFim || undefined}
                  onSelect={(date) => setFilters({ ...filters, dataFim: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            variant="outline" 
            className="mt-auto"
            onClick={handleResetFilters}
          >
            <FilterX className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}
