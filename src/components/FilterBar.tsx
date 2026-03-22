
import type { FilterType } from "../types/todo";
import { FILTER_LABELS } from "../constants";
import { cn } from "../lib/utils";

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
      <nav className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
              currentFilter === filter
                ? "bg-tertiary text-on-tertiary shadow-lg shadow-tertiary/10 scale-105"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
            )}
          >
            {FILTER_LABELS[filter]}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2 text-on-surface-variant">
        <span className="text-xs font-bold uppercase tracking-widest font-label">
          {pendingCount} {pendingCount === 1 ? "ITEM RESTANTE" : "ITENS RESTANTES"}
        </span>
      </div>
    </section>
  );
}
