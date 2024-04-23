import React from "react";
import ErrorFallbackComponent, { ErrorFallbackProps } from "./ErrorFallback";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetError: () => void;
  isErrored: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps & ErrorFallbackProps> = ({
  children,
  resetError,
  isErrored,
  title,
  error,
}) => {
  return (
    <>
      {isErrored ? (
        <ErrorFallbackComponent
          resetError={resetError}
          title={title}
          error={error}
        />
      ) : (
        children
      )}
    </>
  );
};

export default ErrorBoundary;
