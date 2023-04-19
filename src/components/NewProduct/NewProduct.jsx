import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import { api } from '../../utils/api';
import { BaseButton } from '../BaseButton/BaseButton';
import InputBase from '../BaseInput/input';
import { Form } from '../Form/Form';
import { openNotification } from '../Notifiaction/Notification';
import './index.scss'
import { ContentHeader } from "../../components/ContentHeader/content-header";
import cn from "classnames";

export const NewProduct = ({ id, reviews, onProductLike }) => {

    const [rate, setRate] = useState(3);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);
    const [product, setNewProduct] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    console.log({ currentUser });

    const navigate = useNavigate();

    const sendNewProduct = async (data) => {
        console.log(data);
        try {
            const newProduct = await api.addProduct( {
                name: product.name, price: product.price, discount: product.discount, pictures: product.pictures, description: product.description, stock: product.stock, wight: product.wight, available: product.available
            });
            console.log({ new: newProduct });
            setNewProduct({ ...newProduct })
            openNotification('success', 'Успешно', 'Данные успешно добавлены')
        } catch (error) {
            openNotification('error', 'error', 'Не удалось добавить данные')
        }
    }

    const required = {
        required: {
            value: true
        }
    }

    return <div className="profile">
        <ContentHeader >
            <h1>
                Добавить новый товар
            </h1>
           <>
                <Form submitForm={handleSubmit(sendNewProduct)}>
                    <div className='profile__user'>
                        <input className='auth__input'{...register('name', {
                            required: true
                        })}  type="text" placeholder='Наименование товара' />
                        <input className='auth__input'  {...register('description', required)} type="text" placeholder='Описание товара' />
                        <input className='auth__input' type="number"
                            {...register("test",)} {...register('price', {
                                valueAsNumber: true,
                                required: true
                            } )} placeholder='Цена (рублей)' />
                        <input className='auth__input' {...register('discount')} type="number" placeholder='Скидка (%)' />
                        <input className='auth__input'  {...register('stock')} type="number" placeholder='Запас (шт.)' />
                        <input className='auth__input'  {...register('wight')}  placeholder='Вес (гр.)' />
                        <input className='auth__input' {...register('available')} type="boolean" placeholder='Планируемое наличие товара (ДА/НЕТ)' />
                        <input className='auth__input' {...register('pictures')} placeholder='Изображение товара' />
                        <BaseButton type="submit" color={'yellow'}>Отправить</BaseButton>
                    </div>
                </Form>


            </>
            <BaseButton onClick={() => { navigate('/') }} color={'lightBlue'}>
                <span>На главную</span>
            </BaseButton>
        </ContentHeader>
    </div>
}