import './css/Home.css'
import { useEffect } from 'react'
import { Header } from '../components/Header.jsx'

import { useCursosStore } from '../hooks/useCursosStore.js'

import imgnode from '../assets/imgnode.png'
import imgreact from '../assets/imgreact.jpg'
import imgjs from '../assets/imgjs.jpg'



export const Home = () => {

  const {cursos, fetchCursos, inscribirAlumno} = useCursosStore();

  useEffect(() => {
    fetchCursos();
  }, []);

  const inscribirAlCurso = async (cursoId, nombreCurso) => {

    try{
      await inscribirAlumno(cursoId,nombreCurso);
      console.log('Alumno inscrito con Exito');
    }
    catch(error){
      console.log(error);
    }
  }
  
  return (
    <>
    <div id='box-body-home'>

      <Header />

      <div id='box-center-home'>

        {cursos.map((curso) => (
            <div key={curso._id} className='box-main-curso'>
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
                <p onClick={() => inscribirAlCurso(curso._id, curso.nombre)}>Inscribirse ahora</p>
              </div>
            </div>
        ))}

      </div>

    </div>
    
    </>
  )
}
