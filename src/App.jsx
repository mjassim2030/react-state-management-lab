import { useState } from 'react'
import { useEffect } from 'react';
import './assets/fonts/shlop.otf';
import './assets/fonts/shlop_rg.otf';

import './App.css'

function App() {


  const initailZombieFighters = [
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6
    },
  ]

  const fightersAssetsPath = `/ZombieFighters`
  let budget = 100;

  const [team, setTeam] = useState([])
  const [money, setMoney] = useState(budget)
  const [zombieFighters, setZombieFighters] = useState(initailZombieFighters)
  const [showAlert, setShowAlert] = useState(false)

  let totalStrength = team.reduce((sum, fighter) => sum + fighter.strength, 0);
  let totalAgility = team.reduce((sum, fighter) => sum + fighter.agility, 0)


  useEffect(() => {
    const backgroundAudio = new Audio('/sounds/horror.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.4;

    const playAudio = () => {
      backgroundAudio.play().catch((err) => {
      });
    };

    document.addEventListener('click', playAudio, { loop: true });

    return () => {
      backgroundAudio.play();
      backgroundAudio.currentTime = 0;
      document.removeEventListener('click', playAudio);
    };
  }, []);


  const handleAddFighter = (zombieFighter, index) => {

    if (money >= zombieFighter.price) {

      const updatedTeam = [...team, zombieFighter]
      const newZombieFighter = [...zombieFighters]
      newZombieFighter.splice(index, 1)

      setTeam(updatedTeam)
      setZombieFighters(newZombieFighter)
      setMoney(money - zombieFighter.price)

    } else {
      setShowAlert(true)
    }

  }

  const handleRemoveFighter = (zombieFighter, index) => {
    const updatedTeam = [...team]
    updatedTeam.splice(index, 1)
    const updatedZombieFighters = [...zombieFighters, zombieFighter]

    setTeam(updatedTeam)
    setZombieFighters(updatedZombieFighters)
    setMoney(updatedTeam.length == 0 ? budget : money > budget ? budget : money + zombieFighter.price)

  }

  return (
    <>
      <h1 className='gameTitle'>Zombie Fighters</h1>
      <div className='container'>
        <div className="statsCard">
          <div className="statLine">
            <span>Money:</span>
            <span>{money}</span>
          </div>
          <div className="statLine">
            <span>Team Strength:</span>
            <span>{totalStrength}</span>
          </div>
          <div className="statLine">
            <span>Team Agility:</span>
            <span>{totalAgility}</span>
          </div>
        </div>
      </div>

      <h1 className='section'>Team</h1>
      {team.length > 0 ?
        <div className='gridContainer'>
          {team.map((zombieFighter, index) => (

            <div className="card" key={zombieFighter.id + 10}>
              <img src={`${fightersAssetsPath}/${zombieFighter.name}.png`} alt={zombieFighter.name} />
              <div className="cardContent">
                <span className="fighterName">{zombieFighter.name}</span>

                <div className="abilities">
                  <div><span>Price: </span>{zombieFighter.price}</div>
                  <div><span>Strength: </span>{zombieFighter.strength}</div>
                  <div><span>Agility: </span>{zombieFighter.agility}</div>
                </div>
                <button className="remove" onClick={() => handleRemoveFighter(zombieFighter, index)}>Remove</button>

              </div>
            </div>

          ))}

        </div>

        : <p>Pick some team members</p>}

      <h1 className='section'>Fighters</h1>
      <div className='gridContainer'>
        {zombieFighters.map((zombieFighter, index) => (

          <div className="card" key={zombieFighter.id}>
            <img src={`${fightersAssetsPath}/${zombieFighter.name}.png`} alt={zombieFighter.name} />
            <div className="cardContent">
                <span className="fighterName">{zombieFighter.name}</span>

              <div className="abilities">
                <div><span>Price: </span>{zombieFighter.price}</div>
                <div><span>Strength: </span>{zombieFighter.strength}</div>
                <div><span>Agility: </span>{zombieFighter.agility}</div>
              </div>
              <button className="add" onClick={() => handleAddFighter(zombieFighter, index)}>Add</button>

            </div>
          </div>

        ))}

      </div>
      {showAlert && (
        <div className="popupOverlay">
          <div className="popup">
            <p>Not enough money to add this fighter!</p>
            <button onClick={() => setShowAlert(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App