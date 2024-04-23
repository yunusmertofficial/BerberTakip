import React from "react";
import { CircularProgress } from "./CircularProgress";

interface LoadingBoundaryProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  children,
  isLoading,
}) => {
  return <>{isLoading ? <CircularProgress /> : children}</>;
};

export default LoadingBoundary;
