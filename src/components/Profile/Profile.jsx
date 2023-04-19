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
import { lightBlue, yellow } from '@mui/material/colors';
import cn from "classnames";

export const Profile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    console.log({ currentUser });

    const navigate = useNavigate();
    const handleChangeAvatar = async () => {
        await api.updateAvatar({ avatar: 'https://images.unsplash.com/photo-1535615615570-3b839f4359be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' })
    }

    const sendProfileData = async (data) => {
        console.log(data);
        try {
            const newUser = await api.updateUserInfo({ name: data.name, about: data.about });
            console.log({ newUser });
            setCurrentUser({ ...newUser })
            openNotification('success', 'Успешно', 'Данные успешно изменены')
        } catch (error) {
            openNotification('error', 'error', 'Не удалось изменить данные')
        }
    }

    const required = {
        required: {
            value: true
        }
    }

    const sendAvatar = async ({ avatar }) => {
        console.log({ avatar });

        try {
            const newUser = await api.updateAvatar({ avatar: avatar });
            setCurrentUser({ ...newUser })

            openNotification('success', 'Успешно', 'Автар успешно изменен')
        } catch (error) {
            openNotification('error', 'error', 'Не удалось изменить данные')
        }
    }

  
    return <div className="profile">
        <ContentHeader >
        <h1>
            Мои данные
        </h1>
        {currentUser?.name && currentUser?.about && (<>
            <Form submitForm={handleSubmit(sendProfileData)}>
                <div className='profile__user'>
                    <input {...register('name', required)} defaultValue={currentUser.name} className='auth__input' type="text" placeholder='name' />
                    <input className='auth__input' defaultValue={currentUser.about} {...register('about', required)} placeholder='about' />
                    <input className='auth__input' {...register('email')} disabled defaultValue={currentUser?.email} placeholder='email' />
                    <input className='auth__input' {...register('id')} disabled defaultValue={currentUser?._id} placeholder='id' />
                    <BaseButton type="submit" color={'yellow'}>Отправить</BaseButton>
                </div>
            </Form>


            <div className='profile__avatar'>
                <Form submitForm={handleSubmit(sendAvatar)}>
                    <div className='profile__user'>
                        <img className='profile__avatar-img' src={currentUser.avatar} alt="" />
                        <input className='auth__input' {...register('avatar')} defaultValue={currentUser?.avatar} placeholder='avatar' />
                        <BaseButton type="submit" color={'yellow'}>Отправить</BaseButton>
                    </div>
                </Form>

                </div>

            </>)
            }
            <BaseButton onClick={() => { navigate('/') }} color={'lightBlue'}>
                <span>На главную</span>
            </BaseButton>
        </ContentHeader>
    </div>
}