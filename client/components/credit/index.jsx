import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import "./index.css";
import React from "react";
const CreditCard = () => {
  const [isFront, setIsFront] = useState(true);
  const [swipeStartX, setSwipeStartX] = useState(null);
  const [swipeEndX, setSwipeEndX] = useState(null);
  const { user } = useContext(FirebaseContext);

  const [data, setData] = useState({
    cardNumber: "################",
    month: "",
    year: "",
    cvv: "",
    name: user.displayName ?? "",
  });
  const [tab, setTab] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cvv") {
      document
        .querySelector(".credit-card-div")
        .classList.add("credit-card-div-hover");

      setIsFront(false);
    } else {
      document
        .querySelector(".credit-card-div")
        .classList.remove("credit-card-div-hover");
      setIsFront(true);
    }

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    data.cardNumber.length < 1 &&
      setData((prev) => {
        return { ...prev, cardNumber: "################" };
      });
  }, [data]);

  const submit = (e) => {
    event.preventDefault();

    console.log(data);
  };
  return (
    <div className="product-body">
      <div
        className="credit-card-div"
        onClick={() => {
          if (!isFront) {
            document
              .querySelector(".credit-card-div")
              .classList.remove("credit-card-div-hover");
            setIsFront(true);
            setTab(6);
          } else {
            document
              .querySelector(".credit-card-div")
              .classList.add("credit-card-div-hover");

            setIsFront(false);
          }
        }}
        onMouseOver={() => {
          document
            .querySelector(".credit-card-div")
            .classList.add("credit-card-div-hover");

          setIsFront(false);
        }}
        onMouseOut={() => {
          document
            .querySelector(".credit-card-div")
            .classList.remove("credit-card-div-hover");
          setIsFront(true);
        }}
      >
        {isFront ? (
          <div className="front">
            <div className="front header">
              <h3>VISA</h3>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="60"
                id="svg895"
                version="1.1"
                viewBox="-96 -98.908 832 593.448"
              >
                <defs id="defs879"></defs>
                <path
                  id="rect887"
                  display="inline"
                  fill="#ff5f00"
                  stroke-width="5.494"
                  d="M224.833 42.298h190.416v311.005H224.833z"
                />
                <path
                  id="path889"
                  d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z"
                  fill="#eb001b"
                  stroke-width="5.494"
                />
                <path
                  id="path891"
                  d="M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z"
                  class="e"
                  fill="#f79e1b"
                  stroke-width="5.494"
                />
                <path
                  id="path893"
                  d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z"
                  class="e"
                  fill="#f79e1b"
                  stroke-width="5.494"
                />
              </svg>{" "}
            </div>
            <div className="card-number">
              <h4>CARD NUMBER</h4>
              <div className={tab === 0 && "focused"}>
                <h5>
                  {data.cardNumber.length > 0 &&
                    data.cardNumber.match(/.{1,4}/g).join(" ")}
                </h5>
              </div>
            </div>
            <div className="credit-card-footer">
              <div>
                <h4>Card Holder</h4>
                <div className={tab === 1 && "focused"}>
                  {" "}
                  <h5>
                    {data.name.length < 1 ? "***Owner NAme***" : data.name}
                  </h5>
                </div>
              </div>
              <div>
                <h4>EXP</h4>
                <div className={tab === 2 && "focused"}>
                  <h5>
                    {data.month.length < 1 ? "MM" : data.month} /
                    {data.year.length < 1 ? "yy" : data.year.slice(-2)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="back">
            <div className="strip"></div>
            <h4 className="cvv-label">CVV</h4>
            <div className={`cvv-strip  ${tab === 2 && "focused"}`}>
              <h5>{data.cvv.length < 1 ? "***" : data.cvv}</h5>
            </div>
          </div>
        )}
      </div>
      <div className="hire_info">
        <form className="card-form" onSubmit={submit}>
          <div className="page-input1">
            <label>Name:</label>

            <input
              type="text"
              name="name"
              required={true}
              placeholder={user.displayName ?? "Name On Card"}
              onChange={handleChange}
              onFocus={() => {
                setTab(1);
                document
                  .querySelector(".credit-card-div")
                  .classList.remove("credit-card-div-hover");
                setIsFront(true);
              }}
            ></input>
          </div>
          <div className="page-input1">
            <label>Card Number</label>
            <input
              placeholder="Card Number"
              type="number"
              required={true}
              name="cardNumber"
              onChange={handleChange}
              onFocus={() => {
                setTab(0);
                document
                  .querySelector(".credit-card-div")
                  .classList.remove("credit-card-div-hover");
                setIsFront(true);
              }}
            ></input>
          </div>

          <div className="form-split">
            <div className=" ">
              <div className="page-input">
                <label>Expiration Date:</label>
                <div className="form-exp-date">
                  <select
                    required={true}
                    name="month"
                    onChange={handleChange}
                    onFocus={() => {
                      setTab(2);
                      document
                        .querySelector(".credit-card-div")
                        .classList.remove("credit-card-div-hover");
                      setIsFront(true);
                    }}
                  >
                    <option selected disabled>
                      Month
                    </option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>

                  <select
                    required={true}
                    name="year"
                    onChange={handleChange}
                    onFocus={() => {
                      setTab(2);
                      document
                        .querySelector(".credit-card-div")
                        .classList.remove("credit-card-div-hover");
                      setIsFront(true);
                    }}
                  >
                    <option selected disabled>
                      Year
                    </option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                    <option>2031</option>
                    <option>2032</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="cvv">
              <div className="page-input1">
                <label>CVV</label>
                <input
                  placeholder="CVV"
                  maxLength={3}
                  type="number"
                  name="cvv"
                  required={true}
                  onChange={handleChange}
                  onFocus={() => {
                    document
                      .querySelector(".credit-card-div")
                      .classList.add("credit-card-div-hover");
                    setIsFront(false);
                  }}
                ></input>
              </div>
            </div>
          </div>

          <button className="button" type="submit">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCard;
