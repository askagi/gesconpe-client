import './style.css';
import CloseIcon from '../../assets/close.svg';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { formatDate, formatDateEdit } from '../../utils/convertDate';
import { coin, decimal } from '../../utils/currencyConverter';

const Modal = ({
    title,
    openModal,
    setOpenModal,
    setLoad,
    load,
    currentTransaction,
    setCurrentTransaction,
    typeAction
}) => {

    const token = getItem('token');

    const [form, setForm] = useState(
        {
            tipo: 'entrada',
            descricao: '',
            valor: '',
            data: '',
            categoria_id: null,
        });

    const [selectCategory, setSelectCategory] = useState({ id: 0, descricao: '' });
    const [optionsCategories, setOptionsCategories] = useState([]);

    useEffect(() => {
        loadCategories();
        if (openModal) {
            if (currentTransaction) {
                setForm({ ...currentTransaction, data: formatDateEdit(currentTransaction.data), valor: currentTransaction.valor / 100 })
            }
        }

        return () => {
            clearInput();
            setLoad(!load)
        }

    }, []);

    const loadCategories = async () => {
        try {
            const response = await api.get('/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status > 204) {
                return;
            }
            setOptionsCategories([...response.data]);
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    const clearInput = () => {
        setForm({
            tipo: 'entrada',
            descricao: '',
            valor: '',
            data: '',
            categoria_id: null,
        });

        setCurrentTransaction(null)

    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!form.tipo || !form.descricao || !form.valor || !form.data || !form.categoria_id) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        try {
            if (typeAction === 'create') {
                const response = await api.post('/transacao', {
                    ...form,
                    valor: form.valor * 100
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status > 204) {
                    return;
                }

                console.log('Exibir tela de confirmação: Conta criada com sucesso');
                clearInput();
                setLoad(!load);
            }

            if (typeAction === 'update') {
                const response = await api.put(`transacao/${currentTransaction.id}`, {
                    ...form,
                    valor: form.valor * 100
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status > 204) {
                    return;
                }

                console.log('Exibir tela de confirmação: Conta criada com sucesso');
                clearInput();
                setLoad(!load);
                setOpenModal(false);
            }

        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    const handleChangeInput = ({ target }) => {
        setForm({ ...form, [target.name]: target.value });

        if (target.name === 'categoria_id') {
            setForm({ ...form, [target.name]: Number(target.value) });
        }

    }

    return (
        <>
            {openModal &&
                <div className='container-modal'>
                    <div className='modal'>
                        <div className='modal-header'>
                            <h2>{`${title}`}</h2>
                            <img src={CloseIcon} alt='close icon' onClick={() => setOpenModal(!openModal)} />
                        </div>
                        <form className='modal-form' onSubmit={handleSubmit}>
                            <div className='content-input'>
                                <div className='btn-type-group'>
                                    <div
                                        className={`type-incoming ${form.tipo === 'entrada' ? 'type-incoming-active' : ''}`}
                                        onClick={() => setForm({ ...form, tipo: 'entrada' })}
                                    >
                                        Entrada
                                    </div>

                                    <div
                                        className={`type-withdraw ${form.tipo === 'saida' ? 'type-withdraw-active' : ''}`}
                                        onClick={() => setForm({ ...form, tipo: 'saida' })}
                                    >
                                        Saída
                                    </div>
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='valor'>Valor</label>
                                    <input
                                        type='text'
                                        name='valor'
                                        id='valor'
                                        value={form.valor}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='categoria'>Categoria</label>
                                    <select name='categoria_id' onChange={handleChangeInput}>
                                        <option />
                                        {optionsCategories.map((category => (
                                            <option
                                                selected={category.id === form.categoria_id ? category.id : ""}
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.descricao}
                                            </option>
                                        )))}
                                    </select>
                                </div>

                                <div className='input-group'>
                                    <label htmlFor='data'>Data</label>
                                    <input
                                        type='date'
                                        name='data'
                                        id='data'
                                        value={form.data}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='descricao'>Descrição</label>
                                    <input
                                        type='text'
                                        name='descricao'
                                        id='descricao'
                                        value={form.descricao}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                            </div>
                            <button type='submit'>Confirmar</button>
                        </form>
                    </div >
                </div >
            }
        </>
    )
}

export default Modal;