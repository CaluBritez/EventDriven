import { useSelector } from 'react-redux'
import codeAcademyApi from '../api/codeAcademyApi.js';

import { useDispatch } from 'react-redux';
import { showCursos } from '../store/cursos/cursosSlice.js';
import {useAuthStore} from '../hooks/useAuthStore.js';
import { toast } from 'sonner';


export const useCursosStore = () => {

  const {cursos} = useSelector(state => state.cursos);

  const { user } = useAuthStore();

  const dispatch = useDispatch();

  const fetchCursos = async () => {
    try {

      const { data } = await codeAcademyApi.get('/curso');
      dispatch(showCursos(data));

    } catch (error) {
      console.log(error);
    }
  }

  const inscribirAlumno = async (cursoId, nombreCurso) => {
    try {

      const email = user.email;
      const nombre = nombreCurso; 
      const { data } = await codeAcademyApi.post(`/curso/inscribir/${cursoId}`, {email, nombre});
      console.log(data);
      

    } catch (error) {
      console.log(error);
    }
  }

  const publicarCurso = async (data) => {
    try {
      const curso = await codeAcademyApi.post('/curso', data);
      if (!curso.data.ok) {
        toast.error('Error al publicar el curso');
      } else {
        toast.success('Curso publicado con exito');
      }
      return curso;
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerCursoPorProfe = async (profesorId) => {
    try {
      const { data } = await codeAcademyApi.get(`/curso/${profesorId}`);
      dispatch(showCursos(data));
    } catch (error) {
      console.log(error);
    }
  }

  return(
    {
      //Metodos
      fetchCursos,
      inscribirAlumno,
      publicarCurso,
      obtenerCursoPorProfe,

      //Propiedades
      cursos
    }
  )
};