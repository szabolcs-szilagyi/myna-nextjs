import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom/extend-expect';

/* jest.mock('next/config', () => () => ({
 *   publicRuntimeConfig: {
 *     SOME_VARIABLE_HERE: 'whatever-you-want-here'
 *   }
 * }));
 * jest.mock('next/router', () => ({
 *   useRouter: () => ({
 *     pathname: 'test-test'
 *   })
 * }));
 *  */
describe('Footer', () => {
  it('renders a footer', () => {
    render(<Footer />)

    const heading = screen.getByAltText(/MYNA Logo/i)

    expect(heading).toBeInTheDocument()
  });
});
