import { formatDate, getWeekday } from '../../utils/convertDate';
import PenIcon from '../../assets/pen.svg';
import TrashIcon from '../../assets/trash.svg';
import { decimal } from '../../utils/currencyConverter';


const Transaction = ({ transaction, handleChangeEdit, confirmedDelete, setConfirmedDelete, handleDelete }) => {

    return (
        <li className='transaction' key={transaction.id}>
            <span className='transaction-date'>{formatDate(transaction.data)}</span>
            <span>{getWeekday(transaction.data)}</span>
            <span>{transaction.descricao}</span>
            <span>{transaction.categoria_nome}</span>
            <span className={`transaction-value ${transaction.tipo === 'entrada' ? 'incoming-color' : 'withdraw-color'}`}>R$ {decimal(transaction.valor)}</span>
            <div className='content-edition'>
                <img
                    src={PenIcon}
                    alt='icone editar'
                    onClick={() => handleChangeEdit(transaction)}
                />
                <div className='content-btn-delete'>
                    <img
                        onClick={(e) => setConfirmedDelete({ id: transaction.id, confirmed: !confirmedDelete.confirmed })}
                        src={TrashIcon}
                        alt='icone deletar'
                    />
                    {confirmedDelete.confirmed && confirmedDelete.id === transaction.id ?
                        <div className='box-confirmed'>
                            <div className='content-box'>
                                <div className='square'></div>
                                <span>Apagar item?</span>
                                <div className='btn-group'>
                                    <button onClick={() => handleDelete(transaction.id)}>Sim</button>
                                    <button onClick={(e) => setConfirmedDelete({ id: transaction.id, confirmed: !confirmedDelete.confirmed })}>Não</button>
                                </div>
                            </div>
                        </div>
                        : ''}
                </div>

            </div>
        </li>
    )
}

export default Transaction;