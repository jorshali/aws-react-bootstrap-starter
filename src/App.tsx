import './App.css';

import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home.component';
import { useStores } from './hooks/useStores';
import { Login } from './components/login/Login.component';
import { useEffect } from 'react';
import { useLogin } from './hooks/useLogin';
import { LoadingOverlay } from './components/common/LoadingOverlay.component';
import { ErrorModal } from './components/common/ErrorModal.component';
import { ErrorPage } from './components/common/ErrorPage.component';
import { Footer } from './components/common/Footer.component';

function App() {
  const { getLoggedUser } = useLogin();
  const { asyncStore, authenticationStore, errorStore } = useStores();

  useEffect(() => {
    asyncStore.showLoading(async () => {
      const currentUser = await getLoggedUser();

      if (currentUser) {
        authenticationStore.authenticationComplete();
      } else {
        authenticationStore.loadComplete();
      }
    });
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}
      onError={(e) => {
        errorStore.handleError(e);
      }}
      onReset={() => {
        errorStore.clearError();
      }}>
      <div className="App">
        <LoadingOverlay />
        <ErrorModal />
        <Footer />
        
        <Routes>
          {
            authenticationStore.isAuthenticated() ?
              <>
                <Route path="/">
                  <Route index element={<Home />} />
                </Route>
              </> : <Route path="/*" element={<Login />} />
          }
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default observer(App);
