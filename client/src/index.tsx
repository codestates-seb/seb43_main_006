import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/slice/store.tsx';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.ts';
import theme from './styles/theme.ts';
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
} else {
  console.error('No root');
}
