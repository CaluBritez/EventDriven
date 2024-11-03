import { createSlice } from '@reduxjs/toolkit'

export const cursosSlice = createSlice({
  name: 'cursos',
  initialState: {
    cursos: [],
    errorMessage: undefined
  },
  reducers: {
    showCursos: (state, { payload }) => {
      state.cursos = payload
      state.errorMessage = undefined
    },
    clearCursos: (state) => {
      state.cursos = []
      state.errorMessage = undefined
    },
    deleteCursoRedux: (state, { payload }) => {
      // Filtra los cursos y elimina el que coincide con el ID pasado en payload
      state.cursos = state.cursos.filter(curso => curso._id !== payload);
    }
  }
})

export const { showCursos, clearCursos, deleteCursoRedux } = cursosSlice.actions