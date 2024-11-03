import { useSelector } from 'react-redux'
import codeAcademyApi from '../api/codeAcademyApi.js';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showCursos } from '../store/cursos/cursosSlice.js';


export const useCursosStore = () => {

  const {cursos} = useSelector(state => state.cursos);

  const dispatch = useDispatch();

  const fetchCursos = async () => {
    try {

      const { data } = await codeAcademyApi.get('/curso');
      dispatch(showCursos(data));

    } catch (error) {
      console.log(error);
    }
  }
  const inscribirAlumno = async (cursoId) => {
    try {
      const { data } = await codeAcademyApi.post(`/curso/inscribir/${cursoId}`);
      console.log(data);
      

    } catch (error) {
      console.log(error);
    }
  }

  return(
    {
      //Metodos
      fetchCursos,
      inscribirAlumno,

      //Propiedades
      cursos
    }
  )
};