import { useState } from "react";
import { useForm } from "react-hook-form";

import "./index.scss";

// const handleSubmit = (onSubmit) => {
//     // smth -> data
//     onSubmit(data)
// }

export const RegistrationForm = ({ sendData, flag = true }) => {
  const [type, setType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
    // sendData(data);
  };
  const nameRegister = {
    required: {
      value: flag,
      message: "Это поле очень очень обязательное",
    },
    minLength: {
      value: 2,
      message: "Такое short имя нельзя",
    },
  };

  console.log({ errors });
  return (
    <>
      <div style={{ padding: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3>Registration</h3>
          <input
            type="text"
            {...register("name", nameRegister)}
            placeholder="Name"
            className="form__input"
          />
          {errors?.name && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
          <input
            type="text"
            {...register("email")}
            placeholder="email"
            className="form__input"
          />
          <div className="form__eye-wrapper">
            <input
              type={type ? "text" : "password"}
              {...register("password", {
                required: "password is required",
                pattern: {
                  message:
                    "Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру",
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                },
              })}
              placeholder="password"
              className="form__input"
            />
            <span className="form__eye" onClick={() => setType(!type)}>
              {type ? "hide" : "show"}
            </span>
          </div>
          {errors?.password && (
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
