import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import useAuthentication from "./src/hooks/useAuthentication";
import ErrorBoundary from "./src/components/ErrorBoundary";
import LoadingBoundary from "./src/components/LoadingBoundary";
import RootStack from "./navigation/RootNavigator";
import useCheckLocation from "@hooks/useCheckLocation";

export default function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const { loadingToken, error, checkToken } = useAuthentication();
  const { errorCheckLocation, isLoadingCheckLocation, checkLocation } =
    useCheckLocation();

  return (
    <LoadingBoundary isLoading={loadingToken || isLoadingCheckLocation}>
      <ErrorBoundary isErrored={error} resetError={checkToken}>
        <ErrorBoundary
          isErrored={!!errorCheckLocation}
          error={errorCheckLocation}
          resetError={checkLocation}
        >
          <RootStack />
        </ErrorBoundary>
      </ErrorBoundary>
    </LoadingBoundary>
  );
}
