import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import TrincaLogo from "../../assets/TrincaLogo.svg";

import "./login.css";
import { useState } from "react";
import { ModalError } from "../../components/ModalError";

type FormDataProps = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [error, setError] = useState("");
  const [modalError, setModalError] = useState(false);

  const handleLogin = (data: FormDataProps) => {
    if (data.email === "admin@admin.com" || data.password === "admin") {
      navigate("/lista-de-churras");
    } else {
      setError("E-mail ou senha inválida");
      setModalError(true);
    }
  };

  return (
    <div className="container container-background">
      <div className="content">
        <h1 className="title-container">Agenda de Churras</h1>

        <form className="form-container">
          <div className="container-input">
            <label className="label-input" htmlFor="email">
              Login
            </label>

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Informe o e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Informe um endereço de email válido",
                },
              }}
              render={({ field: { onChange } }) => (
                <input
                  placeholder="e-mail"
                  className="input"
                  name="email"
                  id="email"
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
            {errors.email && (
              <p className="error-input">{errors.email?.message}</p>
            )}
          </div>

          <div className="container-input">
            <label className="label-input" htmlFor="password">
              Senha
            </label>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <input
                  placeholder="senha"
                  className="input"
                  name="password"
                  id="password"
                  type="password"
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
            {errors.password && (
              <p className="error-input">{errors.password?.message}</p>
            )}
          </div>

          <button
            className="button"
            type="submit"
            onClick={handleSubmit(handleLogin)}
          >
            Entrar
          </button>
        </form>
      </div>

      <div className="footer">
        <img src={TrincaLogo} />
      </div>

      <ModalError
        isOpen={modalError}
        close={() => setModalError(false)}
        text={error}
      />
    </div>
  );
}
