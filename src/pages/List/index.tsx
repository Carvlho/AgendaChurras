import { useNavigate } from "react-router-dom";

import TrincaLogo from "../../assets/TrincaLogo.svg";
import IconPeople from "../../assets/IconPeople.svg";
import IconMoney from "../../assets/IconMoney.svg";
import IconChurras from "../../assets/IconChurras.svg";

import { useAppSelector } from "../../store";
import { churrasSelector } from "../../store/churras";

import "./list.css";

export function List() {
  const navigate = useNavigate();

  const { churras } = useAppSelector(churrasSelector);

  console.log(churras);

  const amountRaised = (id: number) => {
    const churrasID = id;

    const currentChurras = churras[churrasID];

    const contributors = currentChurras.contributors
      .filter((contributor: any) => contributor.paid)
      .map((contributor: any) => {
        const value = parseFloat(
          contributor.value
            ?.replace(/[R$\s]/g, "")
            .replace(".", "")
            .replace(",", ".")
        ).toFixed(2);

        return value;
      });

    const amount = contributors.reduce(
      (total: number, item: any) => total + parseFloat(item),
      0
    );

    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="container">
      <div className="container-title">
        <h1 className="title-container">Agenda de Churras</h1>
      </div>

      <div className="container-content">
        <div className="content">
          <div className="grid-content">
            <div
              className="btn-add-new-event"
              onClick={() => navigate("/adicionar-churras")}
            >
              <div className="btn-add-new-event_icon">
                <img src={IconChurras} />
              </div>
              <p>Adicionar Churras</p>
            </div>

            {churras &&
              churras.map((churras, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => navigate("/detalhes-churras/" + index)}
                >
                  <h4 className="card-date">{churras.data}</h4>
                  <h5 className="card-title">{churras.describe}</h5>

                  <div className="card-row">
                    <div className="card-row_content">
                      <img src={IconPeople} alt="Icon People" />
                      <p>{churras.contributors.length}</p>
                    </div>

                    <div className="card-row_content">
                      <img src={IconMoney} alt="Icon Money" />
                      <p>{amountRaised(index)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="footer">
          <img src={TrincaLogo} alt="Trinca Logo" />
        </div>
      </div>
    </div>
  );
}
