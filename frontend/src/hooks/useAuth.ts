import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const { user, isInstructor } = useContext(AuthContext);
    return useMemo(() => ({ user, isInstructor }), [user, isInstructor]);
};