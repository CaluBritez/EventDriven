import './css/Header.css'

import avatar from '../assets/avatar.jpg';
import { ImExit } from "react-icons/im";

import {useAuthStore} from '../hooks/useAuthStore.js';

export const Header = () => {

  const {user, startLogout} = useAuthStore();

  return (
    <div id='box-header-main'>
      <div id='box-header-main-center'>

        <div id='box-header-logo'>
          <h2>CodeAcademy</h2>
        </div>

        <div id='box-header-botonera'>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              {/* <a className="navbar-brand" href="#">Navbar</a> */}
              <button className="navbar-toggler fondo-milk" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Eventos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Salas de Chat</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Mensajes</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>


        </div>

        <div id='box-header-perfil'>
          <div id='box-header-perfil-text'>
            <h3>{user.name}</h3>
            <p onClick={startLogout}><ImExit /></p>
          </div>
          <div id='box-header-perfil-img'>
            <img src={avatar} alt="avatar" />
          </div>
        </div>
        
      </div>
    </div>
  )
}
