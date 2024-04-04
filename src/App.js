import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const App = () => {
  // Retrieve data from local storage or use default values
  const initialNormalRooms = parseInt(localStorage.getItem('normalRooms'), 10) || 50;
  const initialOxygenRooms = parseInt(localStorage.getItem('oxygenRooms'), 10) || 50;
  const initialICURooms = parseInt(localStorage.getItem('ICURooms'), 10) || 20;
  const initialFlatBeds = parseInt(localStorage.getItem('FlatBeds'), 10) || 80;
  const initialReclinerBeds = parseInt(localStorage.getItem('reclinerBeds'), 10) || 100;
  const initialVentilators = parseInt(localStorage.getItem('ventilators'), 10) || 20;
  const initialOxygenCylinders = parseInt(localStorage.getItem('oxygenCylinders'), 10) || 110;
  const initialNonRebreatherMasks = parseInt(localStorage.getItem('nonRebreatherMasks'), 10) || 200;
  const initialNormalMasks = parseInt(localStorage.getItem('normalMasks'), 10) || 120;

  // simillary we have to keep record  of flat beds availibility is 80, then recliner beds 100, ventilator 20, oxygen cylinder 110, non rebreather masks 200, normal masks 120
  const [FlatBeds, setFlatBeds] = useState(initialFlatBeds);
  const [reclinerBeds, setReclinerBeds] = useState(initialReclinerBeds);
  const [ventilators, setVentilators] = useState(initialVentilators);
  const [oxygenCylinders, setOxygenCylinders] = useState(initialOxygenCylinders);
  const [nonRebreatherMasks, setNonRebreatherMasks] = useState(initialNonRebreatherMasks);
  const [normalMasks, setNormalMasks] = useState(initialNormalMasks);


  const [normalRooms, setNormalRooms] = useState(initialNormalRooms);
  const [oxygenRooms, setOxygenRooms] = useState(initialOxygenRooms);
  const [ICURooms, setICURooms] = useState(initialICURooms);
  const [reservationMessage, setReservationMessage] = useState('');

  // Save data to local storage whenever room counts change
  useEffect(() => {
    localStorage.setItem('normalRooms', normalRooms);
    localStorage.setItem('oxygenRooms', oxygenRooms);
    localStorage.setItem('ICURooms', ICURooms);
    localStorage.setItem('FlatBeds', FlatBeds);
    localStorage.setItem('reclinerBeds', reclinerBeds);
    localStorage.setItem('ventilators', ventilators);
    localStorage.setItem('oxygenCylinders', oxygenCylinders);
    localStorage.setItem('nonRebreatherMasks', nonRebreatherMasks);
    localStorage.setItem('normalMasks', normalMasks);

  }, [normalRooms, oxygenRooms, ICURooms, FlatBeds, reclinerBeds, ventilators, oxygenCylinders, nonRebreatherMasks, normalMasks]);

  const reserveRoom = (roomType) => {
    if (roomType === 'ICU') {
      if (ICURooms > 0) {
        setICURooms(ICURooms - 1);
        setVentilators(ventilators - 1);
        setOxygenCylinders(oxygenCylinders - 1);
        setReclinerBeds(reclinerBeds - 1);
        if(ventilators>0 || oxygenCylinders>0 || reclinerBeds>0){
        setReservationMessage(`01 ICU room (with 1 ventilator + 1 oxygen cylinder + 1 recliner bed) reserved.`);
        }else{
          if(ventilators===0){
            alert("ventilators are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }else if(oxygenCylinders===0){
            alert("oxygen cylinders are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }else if(reclinerBeds===0){
            alert("recliner beds are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }
        }
      } else {
        setReservationMessage('Sorry, no ICU rooms could be reserved.');
      }
    } else if (roomType === 'Oxygen') {
      if (oxygenRooms > 0) {
        setOxygenRooms(oxygenRooms - 1);
        setOxygenCylinders(oxygenCylinders - 2);
        setReclinerBeds(reclinerBeds - 1);
        setNonRebreatherMasks(nonRebreatherMasks - 2);
        if(FlatBeds>0 || oxygenCylinders>0 || nonRebreatherMasks>0){
        setReservationMessage(`01 Oxygen room (2 oxygen cylinder + 1 recliner bed + 2 non rebreather masks) reserved.`);
        }else{
          if(FlatBeds===0){
            alert("flat beds are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }else if(oxygenCylinders===0){
            alert("oxygen cylinders are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }else if(nonRebreatherMasks===0){
            alert("non rebreather masks are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }
        
        }
      } else {
        setReservationMessage('Sorry, no Oxygen rooms could be reserved.');
      }
    } else if (roomType === 'Normal') {
      if (normalRooms > 0) {
        setNormalRooms(normalRooms - 1);
        setFlatBeds(FlatBeds - 1);
        setNormalMasks(normalMasks - 2);
        if(FlatBeds>0 || normalMasks>0){

          setReservationMessage(`01 Normal room (1 normal bed + 2 normal masks ) reserved.`);
        }else{
          if(FlatBeds===0){

            alert("flat beds are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }else if(normalMasks===0){
            alert("normal masks are not available so room cant be reserved")
            setReservationMessage('Sorry, no ICU rooms could be reserved.');
          }
        }
      } else {
        setReservationMessage('Sorry, no Normal rooms could be reserved.');
      }
    }
  };

 
      

  return (
    <div className="container">
      <h1>Reservation System</h1>
     <div className='status-container'>
     <div className="room-status">
        <p>Normal Rooms: {normalRooms}</p>
        <p>Oxygen Rooms: {oxygenRooms}</p>
        <p>ICU Rooms: {ICURooms}</p>
       

      </div>
      <div className="equipment-status">
        <p>Normal Beds: {FlatBeds ? FlatBeds : "flatbeds are not available so room cant be reserved"}</p>
        <p>Recliner Beds: {reclinerBeds}</p>
        <p>Ventilators: {ventilators}</p>
        <p>Oxygen Cylinders: {oxygenCylinders}</p>
        <p>Non Rebreather Masks: {nonRebreatherMasks}</p>
        <p>Normal Masks: {normalMasks}</p>
     </div>
     </div>

    
      <div className="reservation-message">
        {reservationMessage && <p>{reservationMessage}</p>}
      </div>
      <div className="buttons">
        <button onClick={() => reserveRoom('ICU')} >Reserve ICU Room</button>
        <button onClick={() => reserveRoom('Oxygen')}>Reserve Oxygen Room</button>
        <button onClick={() => reserveRoom('Normal')}>Reserve Normal Room</button>
      </div>
    </div>
  );
};

export default App;
