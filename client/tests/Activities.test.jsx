// Activities.test.jsx
import { render, screen } from '@testing-library/react';
import Activities from '.client/index.jsx'; // Adjust the path

jest.mock('./useLoading', () => ({
    useLoading: jest.fn(() => ({
        loading: true
    }))
}));

test('renders loading state of Activities component', () => {
    render(<Activities />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});
