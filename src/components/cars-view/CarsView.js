import axios from 'axios';
import CarDetails from './partials/CarDetails';
import CarList from './partials/CarList';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CarForm from './partials/CarForm';

function CarsView() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [currentCar, setCurrentCar] = useState(null);

  function handleCurrentCar(value) {
    setCurrentCar(value);
  }

  function getCars() {
    axios
      .get(`http://localhost:3000/cars`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setCars(res.data.cars);
      })
      .catch((err) => {
        setError({
          message: err.response.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  function deleteCar(id) {
    axios
      .delete(`http://localhost:3000/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          email: localStorage.getItem('email'),
        },
      })
      .then((res) => {
        getCars();
        toast.success('Usunięto samochód!');
      })
      .catch((err) => {
        setError({
          message: err.response.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div>
      {currentCar ? (
        <CarDetails
          currentCar={currentCar}
          handleCurrentCar={handleCurrentCar}
          getCars={getCars}
        />
      ) : (
        <>
          <CarList
            cars={cars}
            handleCurrentCar={handleCurrentCar}
            deleteCar={deleteCar}
          />
          <CarForm getCars={getCars} />
        </>
      )}
    </div>
  );
}

export default CarsView;
