const CarHireCard = (props) => {
  return (
    <div className="car-card" key={props.id}>
      <div className="car-card-picture">
        <img src={props.picture} alt={props.name} />
      </div>

      <p className="car-card-name">{props.name}</p>
      <p className="car-card-desc">{props.description.slice(0, 25) + "..."}</p>
      <p className="car-card-price">
        Ksh. {parseInt(props.price).toLocaleString()}
      </p>
    </div>
  );
};

export { CarHireCard };
