import React from "react";
import ErrorFallbackComponent from "./ErrorFallback";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetError: () => void;
  isErrored: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  resetError,
  isErrored,
}) => {
  return (
    <>
      {isErrored ? (
        <ErrorFallbackComponent resetError={resetError} />
      ) : (
        children
      )}
    </>
  );
};

export default ErrorBoundary;
