import './css/ModalCrearCurso.css'
import { IoClose } from 'react-icons/io5'
import { useUiStore } from '../hooks/useUiStore.js';
import { useForm } from '../hooks/useForm.js';
import { useCursosStore } from '../hooks/useCursosStore.js';

const cursoForm = {
    nombre: '',
    descripcion: ''
}

export const ModalCrearCurso = () => {

    const { isModalOpen, closeModal } = useUiStore();
    const { nombre, descripcion, onInputChange, onResetForm } = useForm(cursoForm);
    const { publicarCurso } = useCursosStore();

    const publicarCursoOnSubmit = (e) => {
        e.preventDefault();
        publicarCurso({ nombre, descripcion });
        closeModal();
        onResetForm();
    }

    return (
        <div className={isModalOpen ? 'modalMostrarActivo' : 'modalMostrarInactivo'}>
            <div className='box-modal'>
                <div className="box-header-modal-curso">
                    <div className='modal-close'>
                        <button
                            onClick={closeModal}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <div className='modal-title'>
                        <h2>Publica tu Curso</h2>
                    </div>
                </div>
                <div className="box-body-modal-curso">
                    <form action="" className="form-curso" onSubmit={publicarCursoOnSubmit}>
                        <div className="box-input-modal-curso">
                            <label htmlFor="nombre-curso">Nombre del Curso</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                id="nombre-curso" 
                                value={nombre} 
                                onChange={onInputChange}
                            /> 
                        </div>
                        <div className="box-input-modal-curso">
                            <label htmlFor="descripcion-curso">Descripción</label>
                            <input 
                                type="text" 
                                name="descripcion" 
                                id="descripcion-curso"
                                value={descripcion}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <button type='submit'>Publicar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};