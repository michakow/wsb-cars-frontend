import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import CarForm from './CarForm';
import './CarDetails.css';

function CarDetails({ currentCar, handleCurrentCar, getCars }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);

  function handleUpdateCar() {
    getCarByCurrentCarId();
    setIsEditMode(false);
  }

  function getCarByCurrentCarId() {
    axios
      .get(`http://localhost:3000/cars/${currentCar._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        handleCurrentCar(res.data.car);
      })
      .catch((err) => {
        setError({
          message: err.response.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  return (
    <div className="car-details-wrapper">
      <p className="car-details-label">
        Szczegóły samochodu {currentCar.model} o ID {currentCar._id}
      </p>
      {!isEditMode ? (
        <div className="car-details">
          <p>
            Model: <span>{currentCar.model}</span>
          </p>
          <p>
            Producent: <span>{currentCar.producent}</span>
          </p>
          <p>
            Rok:{' '}
            <span>
              {moment(currentCar.year).format('YYYY-MM-DD')}
            </span>
          </p>
          <p>
            Waga: <span>{currentCar.weight} ton</span>
          </p>
          <p>
            Kolor:
            <i style={{ backgroundColor: currentCar.color }}></i>
          </p>
        </div>
      ) : (
        <CarForm
          getCars={getCars}
          currentCar={currentCar}
          handleUpdateCar={handleUpdateCar}
        />
      )}
      <div className="buttons">
        <button onClick={() => handleCurrentCar(null)}>
          Powrót do listy
        </button>
        <button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? 'Anuluj edycję' : 'Edytuj samochód'}
        </button>
      </div>
    </div>
  );
}

export default CarDetails;
