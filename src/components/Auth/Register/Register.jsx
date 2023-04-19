import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { Form } from "../../Form/Form";

export const Register = ({ setShowModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e);
        navigate("/login");
    };

    const sendData = async (data) => {
        try {
            await authApi.registerUser({ ...data });
            navigate("/login");
        } catch (error) {
            alert(error);
        }
    };

    const emailRegister = register("email", {
        required: "Email обязателен",
    });
    const passwordRegister = register("password", {
        required: "Пароль обязателен",
        pattern: pattern,
    });

    useEffect(() => {
        setShowModal(true);
    }, [setShowModal]);


    return (
        <>
            <Form submitForm={handleSubmit(sendData)} title={"Регистрация"}>
                <div className="auth__controls">
                    <input
                        type="text"
                        {...emailRegister}
                        placeholder="Email"
                        className="auth__input"
                    />
                    {errors?.email && (
                        <span className="auth__warning">{errors.email?.message}</span>
                    )}

                    <input
                        type="text"
                        {...register('group')}
                        placeholder="Группа"
                        className="auth__input"
                    />
                    <input
                        type={"password"}
                        {...passwordRegister}
                        placeholder="password"
                        className="auth__input"
                    />
                    {errors?.password && (
                        <span className="auth__warning">{errors.password?.message}</span>
                    )}
                    <span className="auth__info">
                        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
                        Политикой конфиденциальности и соглашаетесь на информационную
                        рассылку.
                    </span>

                    <div className="auth__actions">
                        <BaseButton type="submit" color={"yellow"}>
                            <span>Зарегистрироваться</span>
                        </BaseButton>
                        <BaseButton onClick={handleClick} color={"white"}>
                            <span>Войти</span>
                        </BaseButton>
                    </div>
                </div>
            </Form>
        </>
    );
};
