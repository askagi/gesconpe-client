import './style.css';
import FilterIcon from '../../assets/filter.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { clear, getItem } from '../../utils/localStorage';
import { decimal } from '../../utils/currencyConverter';
import Modal from '../../components/Modal';
import Transaction from '../../components/Transaction';
import ModalProfile from '../../components/ModalProfile';
import Category from '../../components/Category';


const Home = () => {
    const token = getItem('token');
    const [user, setUser] = useState({ id: '', nome: '', email: '' });
    const [transactions, setTransactions] = useState([]);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [resume, setResume] = useState({ entrada: 0, saida: 0, saldo: 0 });
    const [title, setTitle] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [load, setLoad] = useState(false);
    const [typeAction, setTypeAction] = useState('');
    const [orderByDate, setOrderByDate] = useState(false);
    const [confirmedDelete, setConfirmedDelete] = useState({ id: null, confirmed: false });
    const [openModalProfile, setOpenModalProfile] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const navigate = useNavigate();

    const loadUser = async () => {
        try {
            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser({ ...response.data });

            await loadTransactions();
            await loadResume();
        } catch (error) {
            console.log(error.response.data.mensagem);
            if (error.response.status > 204) {
                navigate('/sign-in');
                clear();
                return;
            }
        }
    }

    const loadTransactions = async () => {
        try {

            const response = await api.get('/transacao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions([...response.data,]);

            if (orderByDate) {
                handleChangeOrderByDate();
            }

        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    const loadResume = async () => {
        try {
            const response = await api.get('/transacoes/extrato', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status > 204) {
                return;
            }

            setResume({
                entrada: decimal(response.data.entrada),
                saida: decimal(response.data.saida),
                saldo: decimal(response.data.entrada - response.data.saida),
            });

        } catch (error) {
            console.log(error.response.data.mensagem);
        }

    }

    const handleChangeModal = (title) => {
        setTitle(title);
        setOpenModal(true);
    }

    const handleChangeCreatedTransaction = () => {
        handleChangeModal('Adicionar Registro');
        setTypeAction('create');
    }

    const handleChangeEdit = (transaction) => {
        const { categoria_nome, ...transactionEdit } = transaction;
        setTypeAction('update');
        setCurrentTransaction(transactionEdit);
        handleChangeModal('Editar Registro');
    }

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`transacao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status > 204) {
                return;
            }
            setConfirmedDelete({ id: null, confirmed: false });
            setLoad(!load);
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    const handleChangeOrderByDate = () => {
        const localTransactions = [...transactions];
        const crescTrasactionsOrderByDate = localTransactions.sort((a, b) => {
            return +(new Date(a.data) - +(new Date(b.data)))
        });
        setTransactions([...crescTrasactionsOrderByDate]);
    }

    useEffect(() => {
        loadUser();
    }, [openModal, openModalProfile, load, orderByDate]);

    return (
        <div className='container'>
            <Header
                settings
                user={user}
                openModalProfile={openModalProfile}
                setOpenModalProfile={setOpenModalProfile}
            />
            <div className='container-home'>
                <button type='button' className='btn-filter' onClick={() => setOpenFilter(!openFilter)}>
                    <img src={FilterIcon} alt='icon de filtro' />
                    Filtro
                </button>
                <section className='content-registers'>

                    <div className='content-transaction'>
                        {openFilter &&
                            <Category
                                openFilter={openFilter}
                                transactions={transactions}
                            />}
                        <ul className='thead'>
                            <li onClick={() => setOrderByDate(!orderByDate)} className='date-filter'>Data
                                <img className={`${orderByDate && 'arrow-rotate'}`} src={ArrowUp} alt='icone filtro' />
                            </li>
                            <li>Dia da semana</li>
                            <li>Descrição</li>
                            <li>Categoria</li>
                            <li>Valor</li>
                            <li className='empty'></li>
                        </ul>

                        <ul className='transaction-body'>
                            {transactions.map(transaction => (
                                <Transaction
                                    handleDelete={handleDelete}
                                    confirmedDelete={confirmedDelete}
                                    setConfirmedDelete={setConfirmedDelete}
                                    handleChangeEdit={handleChangeEdit}
                                    transaction={transaction}
                                />
                            ))}
                        </ul>
                    </div>

                    <aside>
                        <div className='resume'>
                            <h3 >Resumo</h3>
                            <div className='incoming'>
                                <h5>Entradas</h5>
                                <span className='incoming-color'>R$ {resume.entrada}</span>
                            </div>

                            <div className='withdraw'>
                                <h5>Saídas</h5>
                                <span className='withdraw-color'>R$ {resume.saida}</span>
                            </div>
                            <div className='balance'>
                                <h5>Saldo</h5>
                                <span className='balance-color'>R$ {resume.saldo}</span>
                            </div>
                        </div>
                        <button onClick={handleChangeCreatedTransaction}>Adicionar Registro</button>
                    </aside>
                </section>
            </div >
            {openModal &&
                <Modal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    title={title}
                    setLoad={setLoad}
                    load
                    currentTransaction={currentTransaction}
                    setCurrentTransaction={setCurrentTransaction}
                    typeAction={typeAction}
                />
            }

            {openModalProfile &&
                <ModalProfile
                    setOpenModalProfile={setOpenModalProfile}
                    openModalProfile={openModalProfile}
                    user={user}
                />
            }
        </div>
    )
}

export default Home;