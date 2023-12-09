import './CarList.css';

function CarList({ cars, handleCurrentCar, deleteCar }) {
  return (
    <div className="car-list-wrapper">
      <p className="car-list-label">Lista samochodów</p>
      <ul className="car-list">
        {cars.map((car, index) => (
          <li key={car._id}>
            {index + 1}. {car.model}
            <button onClick={() => handleCurrentCar(car)}>
              Szczegóły
            </button>
            <button onClick={() => deleteCar(car._id)}>Usuń</button>
          </li>
        ))}
        {!cars.length && <p>Brak samochód do wyświetlenia</p>}
      </ul>
    </div>
  );
}

export default CarList;
