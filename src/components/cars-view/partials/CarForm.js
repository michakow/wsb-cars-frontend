import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';
import './CarForm.css';

function CarForm({ getCars, currentCar, handleUpdateCar }) {
  const [error, setError] = useState(null);
  const [model, setModel] = useState(currentCar?.model || '');
  const [year, setYear] = useState(currentCar?.year || '');
  const [producent, setProducent] = useState(
    currentCar?.producent || ''
  );
  const [weight, setWeight] = useState(currentCar?.weight || '');
  const [color, setColor] = useState(currentCar?.color || '#ffffff');

  const isAddMode = !currentCar;

  function onFormSubmit(event) {
    event.preventDefault();

    if (isAddMode) addCar();
    else updateCar();
  }

  function addCar() {
    axios
      .post(
        `http://localhost:3000/cars`,
        {
          model,
          year,
          producent,
          weight,
          color,
          email: localStorage.getItem('email'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        getCars();
        setColor('#ffffff');
        setModel('');
        setProducent('');
        setWeight('');
        setYear('');
        toast.success('Dodano samochód!');
      })
      .catch((err) => {
        setError({
          message: err.response.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  function updateCar() {
    axios
      .put(
        `http://localhost:3000/cars/${currentCar?._id}`,
        {
          model,
          year,
          producent,
          weight,
          color,
          email: localStorage.getItem('email'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        getCars();
        handleUpdateCar();
        toast.success('Zaktualizowano samochód!');
      })
      .catch((err) => {
        setError({
          message: err.response?.data.message,
          status: err.response.status,
        });
        toast.error(err.response.data.message);
      });
  }

  return (
    <>
      <fieldset>
        <legend>
          {isAddMode ? 'Dodaj samochód' : 'Edytuj samochód'}
        </legend>
        <form onSubmit={onFormSubmit}>
          <input
            onChange={(e) => setModel(e.target.value)}
            value={model}
            placeholder="Podaj model"
            required
          />
          <input
            onChange={(e) => setProducent(e.target.value)}
            value={producent}
            placeholder="Podaj producenta"
            required
          />
          <input
            onChange={(e) => setYear(e.target.value)}
            value={moment(year).format('YYYY-MM-DD')}
            type="date"
            required
          />
          <input
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            type="number"
            placeholder="Podaj wagę (tony)"
            required
          />
          <input
            className="input-color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            type="color"
          />
          <button type="submit">
            {isAddMode ? 'Dodaj samochód' : 'Edytuj samochód'}
          </button>
        </form>
      </fieldset>
    </>
  );
}

export default CarForm;
