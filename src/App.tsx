// project import
import React from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import './App.css'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
        <ScrollTop>
          <AuthProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
