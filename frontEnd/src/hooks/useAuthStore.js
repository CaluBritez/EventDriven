import { useDispatch, useSelector } from 'react-redux';
import codeAcademyApi from '../api/codeAcademyApi.js';
import { onChecking, onLogin, onLogout, clearErrorMessage } from '../store/auth/authSlice.js';
import { clearCursos } from '../store/cursos/cursosSlice.js';



export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  
  const dispatch = useDispatch();

  const startLogin = async( {email, password} ) => {
    
    dispatch( onChecking() );

    try { 
      const { data } = await codeAcademyApi.post('/auth', { email, password });


      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid, email: data.email, role: data.role }));
      // console.log(data);
    
    } catch (error) {
      dispatch( onLogout('Credenciales incorrectas') );
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);
      
      
    }
  }

  // Chekear autenticación
  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    
    if ( !token ) return dispatch( onLogout() );
    try {

      const { data } = await codeAcademyApi.get('/auth/renew');
      // console.log(data);

      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid, email: data.email, role: data.role }) );

    } catch (error) {
      localStorage.clear();
      dispatch( onLogout() );
    }}
  
  // LOGOUT
  const startLogout = () => {
    localStorage.clear();
    
    dispatch( onLogout() );
    dispatch( clearCursos() );
  }


  return (
    {
      status,
      user,
      errorMessage,

      startLogin,
      startLogout,
      checkAuthToken
    }
  )
}
