import { cn } from "@/lib/utils";
import { Icon } from "@phosphor-icons/react";

export default function IconSelect({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string; icon: Icon }[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-flow-col auto-cols-fr gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-md border border-input transition-colors",
            value === option.value
              ? "bg-accent border-accent-foreground text-foreground"
              : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          )}
        >
          <option.icon size={24} />
          <span className="text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
