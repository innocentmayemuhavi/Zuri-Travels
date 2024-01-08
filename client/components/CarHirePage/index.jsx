import ServiceData from "../SystemData/ServiceData";
import { ServiceCardEl } from "../Cards/ServiceCardEl";
import { Header } from "../Header/Header";
import { Footer } from "../footer/Footer";
import { useContext, useState } from "react";
import { AuthContext } from "../../src/Assets/Context";

import { Button } from "../Button/Index";
import { Link } from "react-router-dom";
import React from "react";
import "./index.css";

import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import { LoadingCard } from "../Cards/loading-card";
const CarHirePage = () => {
  const { searchval, setSearchval } = useContext(AuthContext);
  const { cars } = useContext(FirebaseContext);

  const [number, setnumber] = useState(0);
  const filltered = Object.values(cars).filter(
    (data) =>
      data.category
        .toLocaleLowerCase()
        .includes(`${searchval.toLocaleLowerCase()}`) ||
      data.description
        .toLocaleLowerCase()
        .includes(`${searchval.toLocaleLowerCase()}`) ||
      data.name.toLocaleLowerCase().includes(`${searchval.toLocaleLowerCase()}`)
  );
  const render = filltered.map((data) => (
    <ServiceCardEl key={data.id} {...data} />
  ));

  return (
    <>
      <main className="fade">
        <Header />
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Car Hiring Services
        </h1>
        <hr></hr>
        <div className="search-div">
          <input
            type="search"
            className="search-input"
            placeholder="Search car..."
            onChange={(value) =>
              value.target.value.length > 0
                ? setSearchval(value.target.value)
                : setSearchval("")
            }
          />
          <div></div>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: 10,
          }}
        >
          <button
            onClick={() => {
              setnumber(0);
              setSearchval("");
            }}
            style={{
              color: number === 0 && "green",
              fill: number === 0 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            All
          </button>
          <button
            onClick={() => {
              setnumber(1);
              setSearchval("coach");
            }}
            style={{
              color: number === 1 && "green",
              fill: number === 1 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            Coach
          </button>
          <button
            onClick={() => {
              setnumber(2);
              setSearchval("bike");
            }}
            style={{
              color: number === 2 && "green",
              fill: number === 2 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            Motor-cycle
          </button>
          <button
            onClick={() => {
              setnumber(3);
              setSearchval("vintage");
            }}
            style={{
              color: number === 3 && "green",
              fill: number === 3 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            vintage
          </button>
          <button
            onClick={() => {
              setnumber(4);
              setSearchval("van");
            }}
            style={{
              color: number === 4 && "green",
              fill: number === 4 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            Vans
          </button>
          <button
            onClick={() => {
              setnumber(5);
              setSearchval("transist");
            }}
            style={{
              color: number === 5 && "green",
              fill: number === 5 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            transist
          </button>
          <button
            onClick={() => {
              setnumber(6);
              setSearchval("caravan");
            }}
            style={{
              color: number === 6 && "green",
              fill: number === 6 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            CARAVANS
          </button>
          <button
            onClick={() => {
              setnumber(7);
              setSearchval("SUV");
            }}
            style={{
              color: number === 7 && "green",
              fill: number === 7 && "green",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="12"
            >
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>{" "}
            SUV
          </button>
        </div>

        {filltered.length < 1 ? (
          <div className="load-grid">
            <LoadingCard />
            <LoadingCard /> <LoadingCard /> <LoadingCard /> <LoadingCard />
            <LoadingCard /> <LoadingCard /> <LoadingCard />
          </div>
        ) : (
          <section className="services">{render}</section>
        )}
        <Link to={"/"}>
          <Button text="Back" type="button" />
        </Link>
        <Footer />
      </main>
    </>
  );
};
export default CarHirePage;
