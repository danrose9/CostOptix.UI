import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './services/redux/store';
import { Provider } from 'react-redux';

test('Application renders without crashing', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));
});
