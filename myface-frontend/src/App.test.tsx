import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import {CreateUser} from './CreateUser';

test('renders posts heading', () => {
  const { getByText } = render(<CreateUser/>);
  const textElement = getByText(/Create User/i);
  expect(textElement).toBeInTheDocument();
});
