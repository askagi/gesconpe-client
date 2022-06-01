import './style.css';
import pulsIcon from '../../assets/plus.svg'

const Category = ({ openFilter, transactions }) => {

    return (
        <>
            {openFilter &&
                <div className='container-category opacityAnimation'>
                    <h4>Categorias</h4>
                    <div className='category-body'>
                        {transactions.map(({ categoria_id, categoria_nome }) => (
                            <div key={categoria_id}
                                id={categoria_id}
                                className={`category-item`}
                                onClick={() => { }}
                            >
                                {categoria_nome}
                                <img src={pulsIcon} alt='plus icon' />
                            </div>
                        ))}
                    </div>
                    <div className='category-btns'>
                        <button className='btn-clear-filter'>Limpar Filtros</button>
                        <button className='btn-apply-filter'>Aplicar Filtros</button>
                    </div>
                </div>
            }
        </>

    )
}

export default Category;