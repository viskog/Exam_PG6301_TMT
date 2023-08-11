import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FrontPage from 'client/index.jsx'; // Adjust the path

test('renders the FrontPage component', () => {
    render(
        <Router>
            <FrontPage />
        </Router>
    );

    expect(screen.getByText('Time management tool')).toBeInTheDocument();
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('Log Hours')).toBeInTheDocument();
    expect(screen.getByText('Display Logged Hours')).toBeInTheDocument();
});