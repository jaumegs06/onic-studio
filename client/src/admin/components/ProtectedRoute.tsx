import { ReactNode } from 'react';
import { Redirect } from 'wouter';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem('adminToken');

    if (!token) {
        return <Redirect to="/admin/login" />;
    }

    return <>{children}</>;
}
