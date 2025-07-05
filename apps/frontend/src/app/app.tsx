import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { GlobalStyle } from './styles/global';
import { DefaultLayout } from './layouts/Default';
import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/default';

const Router = () => (
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
