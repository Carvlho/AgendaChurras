import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

import TrincaLogo from "../../assets/TrincaLogo.svg";

import { useAppDispatch, useAppSelector } from "../../store";
import { churrasSelector, clearState, setChurras } from "../../store/churras";

type FormDataProps = {
  data: string;
  describe: string;
  observation: string;
};

export function AddChurras() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [data, setData] = useState("");

  const dispatch = useAppDispatch();

  const { isSuccess } = useAppSelector(churrasSelector);

  const handleSaveChurras = (data: FormDataProps) => {
    const body = {
      data: data.data,
      describe: data.describe,
      observation: data.observation,
      contributors: [],
    };

    dispatch(setChurras(body));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/lista-de-churras");
      dispatch(clearState());
    }
  }, [isSuccess]);

  return (
    <div className="container">
      <div className="container-add-churras">
        <div className="container-title">
          <h1 className="title-container">Adicionar Churras</h1>
        </div>

        <div className="container-content">
          <div className="content">
            <form className="form-container">
              <div className="container-input">
                <label className="label-input" htmlFor="data">
                  Data
                </label>

                <Controller
                  control={control}
                  name="data"
                  rules={{
                    required: "Informe a data",
                    pattern: {
                      value: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])$/i,
                      message: "Informe uma data válida",
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <InputMask
                      value={data}
                      placeholder="DD/MM"
                      className="input"
                      name="data"
                      id="data"
                      mask="99/99"
                      maskChar=""
                      onChange={(e) => (
                        onChange(e.target.value), setData(e.target.value)
                      )}
                    />
                  )}
                />

                {errors.data && (
                  <p className="error-input">{errors.data?.message}</p>
                )}
              </div>

              <div className="container-input">
                <label className="label-input" htmlFor="describe">
                  Descrição
                </label>

                <Controller
                  control={control}
                  name="describe"
                  rules={{
                    required: "Informe a descrição",
                  }}
                  render={({ field: { onChange } }) => (
                    <input
                      placeholder="Descrição"
                      className="input"
                      name="describe"
                      id="describe"
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />

                {errors.describe && (
                  <p className="error-input">{errors.describe?.message}</p>
                )}
              </div>

              <div className="container-input">
                <label className="label-input" htmlFor="observation">
                  Observações
                </label>

                <Controller
                  control={control}
                  name="observation"
                  render={({ field: { onChange } }) => (
                    <textarea
                      placeholder="Observações"
                      className="input"
                      name="observation"
                      id="observation"
                      rows={5}
                      style={{ resize: "none" }}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>

              <button
                className="button"
                onClick={handleSubmit(handleSaveChurras)}
              >
                Adicionar
              </button>
            </form>

            <div className="footer">
              <img src={TrincaLogo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
