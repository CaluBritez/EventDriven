import './css/Home.css';
import { useEffect } from 'react';
import { Header } from '../components/Header.jsx';

import { useCursosStore } from '../hooks/useCursosStore.js';

import imgnode from '../assets/imgnode.png';
import imgreact from '../assets/imgreact.jpg';
import imgjs from '../assets/imgjs.jpg';
import imgramdom from '../assets/ramdom.jpeg';
import { useSelector } from 'react-redux';
import { ModalCrearCurso } from '../components/ModalCrearCurso.jsx';
import { useUiStore } from '../hooks/useUiStore.js';

export const Home = () => {
  const { cursos, fetchCursos, inscribirAlumno, obtenerCursoPorProfe } = useCursosStore();
  const { user } = useSelector(state => state.auth);
  const { openModal } = useUiStore();


  useEffect(() => {
    if (user.role === "Profesor") {
      obtenerCursoPorProfe(user.uid);
      console.log('se activó obtener cursos por profe')
    } else if (user.role === "Alumno") {
      fetchCursos();
      console.log('se activó fetch cursos')
    }
  }, []);


  const inscribirAlCurso = async (cursoId, nombreCurso) => {
    try {
      await inscribirAlumno(cursoId, nombreCurso);
      console.log('Alumno inscrito con éxito');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id='box-body-home'>
        <Header />

        <div id='box-center-home'>
          {user.role === "Profesor" ? (
            <>
              <div className='box-nav-profesor'>
                <nav className='nav-profesor'>
                  <p>Hola, profe {user.name}</p>
                  <button onClick={openModal}>Agregar Curso</button>
                </nav>
              </div>

              <div className='box-body-profesor'>
                <div className='box-title'>
                  <h2>Mis Cursos</h2>
                </div>

                <hr style={{ width: '100%', height: '2px', color: '#FC5439' }} />

                <div className='box-cursos'>
                  {cursos.map((curso) => (
                    <div key={curso._id} className='box-main-curso'>
                      <div className='box-main-curso-img'>
                        <img
                          src={
                            curso.nombre === 'NodeJS' ? imgnode :
                              curso.nombre === 'ReactJS' ? imgreact :
                                curso.nombre === 'Javascript' ? imgjs :
                                  imgramdom
                          }
                          alt={curso.nombre}
                        />
                      </div>
                      <div className='box-main-curso-text'>
                        <h3>{curso.nombre}</h3>
                        <p>Alumnos Inscriptos:</p>
                        <ul>
                          {curso.alumnos.map((alumno) => (
                            <li key={alumno._id}>{alumno.nombre} {alumno.apellido}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='box-nav-alumno'>
                <nav className='nav-alumno'>
                  <p>Hola, estudiante {user.name}</p>
                  <button>Ver mis Cursos</button>
                </nav>
              </div>
              <div className='box-body-alumno'>
                <div className='box-title'>
                  <h2>Cursos Disponibles</h2>
                </div>

                <hr style={{ width: '100%', color: '#FC5439' }} />

                <div className='box-cursos'>
                  {cursos.map((curso) => (
                    <div key={curso._id} className='box-main-curso'>
                      <div className='box-main-curso-img'>
                        <img
                          src={
                            curso.nombre === 'NodeJS' ? imgnode :
                              curso.nombre === 'ReactJS' ? imgreact :
                                curso.nombre === 'Javascript' ? imgjs :
                                  imgramdom
                          }
                          alt={curso.nombre}
                        />
                      </div>
                      <div className='box-main-curso-text'>
                        <h3>{curso.nombre}</h3>
                        <p onClick={() => inscribirAlCurso(curso._id, curso.nombre)}>Inscribirse ahora</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ModalCrearCurso />
    </>
  );
};