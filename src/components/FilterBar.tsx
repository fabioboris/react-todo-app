
import type { FilterType } from "../types/todo";
import { FILTER_LABELS } from "../constants";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  pendingCount: number;
}

export function FilterBar({
  currentFilter,
  onFilterChange,
  pendingCount,
}: FilterBarProps) {
  const filters: FilterType[] = ["all", "pending", "completed"];

  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <Tabs
        value={currentFilter}
        onValueChange={(value) => onFilterChange(value as FilterType)}
        className="w-fit"
      >
        <TabsList className="bg-surface-container-low h-10 p-0 rounded-full">
          {filters.map((filter) => (
            <TabsTrigger
              key={filter}
              value={filter}
              className="rounded-full px-6 data-[state=active]:bg-tertiary data-[state=active]:text-on-tertiary data-[state=active]:shadow-lg"
            >
              {FILTER_LABELS[filter]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-2 text-on-surface-variant">
        <span className="text-xs font-bold uppercase tracking-widest font-label">
          {pendingCount} {pendingCount === 1 ? "ITEM RESTANTE" : "ITENS RESTANTES"}
        </span>
      </div>
    </section>
  );
}
