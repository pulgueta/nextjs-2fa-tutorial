import type { FC } from "react";

import { AlertOctagon, Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormErrosProps {
  state:
    | {
        message: string;
        success: boolean;
      }
    | undefined;
}

export const FormErros: FC<FormErrosProps> = ({ state }) => {
  return (
    state &&
    (!state.success ? (
      <Alert variant="destructive">
        <AlertOctagon size={16} />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>
          {state?.message || "An error occurred"}
        </AlertDescription>
      </Alert>
    ) : (
      <Alert variant="success">
        <Check size={16} />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          {state?.message || "An error occurred"}
        </AlertDescription>
      </Alert>
    ))
  );
};
