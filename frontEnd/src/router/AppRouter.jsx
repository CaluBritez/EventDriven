import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from '../pages/Home.jsx';
import { Login } from '../pages/Login.jsx';
import { useAuthStore } from '../hooks/useAuthStore.js';

export const AppRouter = () => {
  
  //const authStatus = 'not-authenticated'; // not-authenticated - authenticated - checking

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])
  

  if ( status === 'checking' ) {
    return <div>Loading...</div>;
  }
  
  
  return (
    <Routes>
      { status === 'not-authenticated' ? (
        <>
          <Route path="/auth" element={<Login />}/>
          <Route path="/*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}
