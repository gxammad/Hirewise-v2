// components/ButtonLoading.tsx
import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonLoading(props: { fullWidth?: boolean }) {
  return (
    <div className={props.fullWidth ? "w-full" : ""}>
      <Button size="sm" variant="outline" disabled className={props.fullWidth ? "w-full flex items-center justify-center gap-2" : "flex items-center gap-2"}>
        <Loader2Icon className="w-4 h-4 animate-spin" />
        <span>Please wait</span>
      </Button>
    </div>
  );
}

export default ButtonLoading;
