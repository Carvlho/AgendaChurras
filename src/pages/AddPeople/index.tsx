import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { CurrencyInput, Currencies, Locales } from "input-currency-react";

import TrincaLogo from "../../assets/TrincaLogo.svg";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  addContributors,
  churrasSelector,
  clearState,
} from "../../store/churras";

type FormDataProps = {
  name: string;
  value: string;
};

export function AddPeople() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const dispatch = useAppDispatch();

  const { isSuccess } = useAppSelector(churrasSelector);

  const handleSavePeople = (data: FormDataProps) => {
    const body = {
      name: data.name,
      value: data.value,
      paid: false,
      eventID: id,
    };

    dispatch(addContributors(body));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
      dispatch(clearState());
    }
  }, [isSuccess]);

  return (
    <div className="container">
      <div className="container-title">
        <h1 className="title-container">Adicionar Pessoa</h1>
      </div>

      <div className="container-content">
        <div className="content">
          <form className="form-container">
            <div className="container-input">
              <label className="label-input" htmlFor="name">
                Nome
              </label>

              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Informe o Nome",
                }}
                render={({ field: { onChange } }) => (
                  <input
                    placeholder="Nome"
                    className="input"
                    name="name"
                    id="name"
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />

              {errors.name && (
                <p className="error-input">{errors.name?.message}</p>
              )}
            </div>

            <div className="container-input">
              <label className="label-input" htmlFor="describe">
                Valor
              </label>

              <Controller
                control={control}
                name="value"
                rules={{
                  required: "Informe o valor",
                }}
                render={({ field: { onChange, value } }) => (
                  <CurrencyInput
                    value={value}
                    className="input"
                    options={{
                      precision: 2,
                      allowNegative: false,
                      locale: Locales["Portuguese (Brazil)"], // Format Type
                      i18nCurrency: Currencies["Brazilian Real"], // Symbol
                    }}
                    onChangeEvent={(_, maskedValue) => {
                      onChange(maskedValue);
                    }}
                    required={true}
                  />
                )}
              />

              {errors.value && (
                <p className="error-input">{errors.value?.message}</p>
              )}
            </div>

            <div className="container-recommendedValue">
              <h3>Valores Recomendados</h3>

              <div className="container-values">
                <div className="container-value">
                  <h5>Valor s/ bebida</h5>
                  <p>R$ 10,00</p>
                </div>
                <div className="container-value">
                  <h5>Valor c/ bebida</h5>
                  <p>R$ 20,00</p>
                </div>
              </div>
            </div>

            <button className="button" onClick={handleSubmit(handleSavePeople)}>
              Adicionar
            </button>
          </form>
        </div>

        <div className="footer">
          <img src={TrincaLogo} />
        </div>
      </div>
    </div>
  );
}
