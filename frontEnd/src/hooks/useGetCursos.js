import { useEffect } from 'react';
import codeAcademyApi from '../api/codeAcademyApi.js';

import { useState } from 'react';


export const useGetCursos = () => {

  const [cursos, setCursos] = useState([]);

  useEffect(() => {

    const fetchCursos = async () => {
      try {

        const { data } = await codeAcademyApi.get('/curso');
        setCursos(data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchCursos();
  }, []);

  return cursos
};