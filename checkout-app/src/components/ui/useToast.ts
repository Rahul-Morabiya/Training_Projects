import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<any>(null);

  const show = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const clear = () => setToast(null);

  return { toast, show, clear };
}