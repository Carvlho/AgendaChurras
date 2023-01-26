import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TrincaLogo from "../../assets/TrincaLogo.svg";
import IconPeople from "../../assets/IconPeople.svg";
import IconMoney from "../../assets/IconMoney.svg";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  churrasSelector,
  deleteContributors,
  setContributorPaied,
} from "../../store/churras";

import "./detailsChurras.css";

export function DetailsChurras() {
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { churras } = useAppSelector(churrasSelector);

  const churrasID = id ? parseInt(id) : 0;

  const currentChurras = churras[churrasID];

  const handlePaied = (value: number, paid: any) => {
    const body = {
      eventID: churrasID,
      contributorID: value,
      paid: !paid,
    };

    dispatch(setContributorPaied(body));
  };

  const amountRaised = () => {
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

  const [isHovering, setIsHovering] = useState<number | null>(0);

  const handleMouseOver = (index: number) => {
    setIsHovering(index);
  };

  const handleMouseOut = () => {
    setIsHovering(null);
  };

  const deleteContributor = (contributorID: number) => {
    const body = {
      eventID: churrasID,
      contributorID: contributorID,
    };

    dispatch(deleteContributors(body));
  };

  return (
    <div className="container">
      <div className="container-title">
        <h1 className="title-container">Agenda de Churras</h1>
      </div>

      <div className="container-content">
        <div className="content">
          <div className="container-details">
            <div className="header-churras">
              <div className="header-churras_col">
                <h4>{currentChurras.data}</h4>
                <h3>{currentChurras.describe}</h3>
              </div>
              <div className="header-churras_col">
                <div className="header-churras_col-item">
                  <img src={IconPeople} alt="Icon People" />
                  <p>{currentChurras.contributors.length}</p>
                </div>
                <div className="header-churras_col-item">
                  <img src={IconMoney} alt="Icon Money" />
                  <p>
                    {currentChurras.contributors.length > 0
                      ? amountRaised()
                      : "R$ 00,00"}
                  </p>
                </div>
              </div>
            </div>

            <div className="description-churras">
              <h4>{currentChurras.observation}</h4>
            </div>

            <div className="container-people">
              {currentChurras.contributors.map(
                (contributor: any, index: number) => (
                  <div
                    className="card-people"
                    key={index}
                    onClick={() => handlePaied(index, contributor.paid)}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                  >
                    <div className="card-people_title">
                      <label className="checkboxContainer">
                        <input
                          type="checkbox"
                          className="checkboxInput"
                          disabled
                          checked={contributor.paid ? true : false}
                        />
                        <span className="checkboxSpan"></span>
                      </label>
                      <p>{contributor.name}</p>
                    </div>
                    <div className="card-people_row">
                      <p
                        className={
                          contributor.paid
                            ? "card-people_contribution text-line-through"
                            : "card-people_contribution"
                        }
                      >
                        {contributor.value}
                      </p>

                      <div
                        className="button-delete"
                        onClick={() => deleteContributor(index)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <button
              className="btn-add-people"
              onClick={() => navigate("adicionar-pessoa")}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="footer">
          <img src={TrincaLogo} alt="Trinca Logo" />
        </div>
      </div>
    </div>
  );
}
