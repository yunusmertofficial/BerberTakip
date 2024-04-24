import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import useAuthentication from "./src/hooks/useAuthentication";
import ErrorBoundary from "./src/components/ErrorBoundary";
import LoadingBoundary from "./src/components/LoadingBoundary";
import RootStack from "./navigation/RootNavigator";

export default function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const { loadingToken, error, checkToken } = useAuthentication();

  return (
    <LoadingBoundary isLoading={loadingToken}>
      <ErrorBoundary isErrored={error} resetError={checkToken}>
        <RootStack />
      </ErrorBoundary>
    </LoadingBoundary>
  );
}
