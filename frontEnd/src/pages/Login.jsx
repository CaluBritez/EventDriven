import { useEffect } from 'react';
import './css/Login.css'
import Swal from 'sweetalert2';

import { useForm } from '../hooks/useForm.js';
import {useAuthStore} from '../hooks/useAuthStore.js';

const loginForm = {
  email: '',
  password:''
}

export const Login = () => {

  const { email, password, onInputChange } = useForm(loginForm);

  const { errorMessage, startLogin} = useAuthStore();


  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email:email, password:password });
  }

  useEffect(() => {
    if(errorMessage !== undefined){
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  
  }, [errorMessage])

  return (
    <>
      <div id='box-body-main'>
        <div id='box-main-border'>
          <div id='box-main-login'>
            <div id='box-logo'>
                <h2>CodeAcademy</h2>
            </div>
            <div id='box-form'>
              <form id='form-login' action="" onSubmit={loginSubmit}>
                <div id='box-inputs'>
                  <label htmlFor="usuario">Email</label>
                  <input
                    type="email"
                    placeholder='tuEmail@gmail.com'
                    required
                    name='email'
                    value={email}
                    onChange={onInputChange}
                  />
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    placeholder='Ingrese su Contraseña'
                    required
                    name='password'
                    value={password}
                    onChange={onInputChange}
                  />
                </div>
                <div id='box-registrarse'>
                  <p>¿No tienes cuenta? Crear cuenta</p>
                </div>
                <div id='box-form-button'>
                  <button type='submit' className='boton-naranja'>Ingresar</button>
                </div>
              </form>
            </div>

          </div>
        </div>
        
      </div>
    </>
  )
}
