import './css/Home.css'

import { Header } from '../components/Header.jsx'

import { useGetCursos } from '../hooks/useGetCursos.js'

import imgnode from '../assets/imgnode.png'
import imgreact from '../assets/imgreact.jpg'
import imgjs from '../assets/imgjs.jpg'

export const Home = () => {

  const cursos = useGetCursos();
  console.log('desde page Home: ', cursos);
  

  return (
    <>
    <div id='box-body-home'>

      <Header />

      <div id='box-center-home'>

        {cursos.map((curso, index) => (
            <div key={index} className='box-main-curso'>
              <div className='box-main-curso-img'>
              <img
                  src={
                    curso.nombre === 'NodeJS' ? imgnode :
                    curso.nombre === 'ReactJS' ? imgreact :
                    curso.nombre === 'Javascript' ? imgjs :
                    null
                  }
                  alt={curso.nombre}
                />
              </div>
              <div className='box-main-curso-text'>
                <h3>{curso.nombre}</h3> {/* Reemplaza el nombre dinámicamente */}
                <p>Inscribirse ahora</p>
              </div>
            </div>
        ))}

      </div>

      <div id='modal-inscripcion'></div>
    </div>
    
    </>
  )
}
