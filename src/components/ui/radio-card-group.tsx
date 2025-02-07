import * as React from "react";
import { cn } from "~/lib/utils";
import { Check } from "lucide-react";

interface RadioCardGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onValueChange"> {
  className?: string;
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface RadioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  value?: string;
}

const RadioCardGroup = React.forwardRef<HTMLDivElement, RadioCardGroupProps>(
  ({ className, onValueChange, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const radioCard = target.closest("[data-value]");
      if (radioCard && onValueChange) {
        const value = radioCard.getAttribute("data-value");
        if (value) onValueChange(value);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-3 gap-4", className)}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
RadioCardGroup.displayName = "RadioCardGroup";

const RadioCard = React.forwardRef<HTMLDivElement, RadioCardProps>(
  ({ className, children, checked, disabled, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-value={value}
        className={cn(
          "relative flex cursor-pointer flex-col items-center rounded-xl border-2 bg-background p-4 hover:bg-accent",
          checked && "border-primary",
          !checked && "border-muted",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        {checked && (
          <div className="absolute right-2 top-2 h-5 w-5 text-primary">
            <Check className="h-5 w-5" />
          </div>
        )}
        {children}
      </div>
    );
  },
);
RadioCard.displayName = "RadioCard";

export { RadioCardGroup, RadioCard };
