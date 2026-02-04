import { Toaster as SonnerToaster, toast } from "sonner";

export function Toaster(props) {
  return <SonnerToaster richColors {...props} />;
}

export { toast };
