import { useState } from 'react'
import './App.css'

function App() {
  const initailZombieFighters = [
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
    },
  ]

  let budget = 100;

  const [team, setTeam] = useState([])
  const [money, setMoney] = useState(budget)
  const [zombieFighters, setZombieFighters] = useState(initailZombieFighters)
  const [showAlert, setShowAlert] = useState(false)

  let totalStrength = team.reduce((sum, fighter) => sum + fighter.strength, 0);
  let totalAgility = team.reduce((sum, fighter) => sum + fighter.agility, 0)

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
    setMoney(money > budget ? budget : money + zombieFighter.price)

  }

  return (
    <>
      <h1>Zombie Fighters</h1>

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

      <h3>Team</h3>
      {team.length > 0 ?
        <div className='gridContainer'>
          {team.map((zombieFighter) => (

            <div className="card" key={zombieFighter.id + 10}>
              <img src={zombieFighter.img} alt={zombieFighter.name} />
              <div className="cardContent">
                <h3>{zombieFighter.name}</h3>

                <div className="abilities">
                  <div><span>Price: </span>{zombieFighter.price}</div>
                  <div><span>Strength: </span>{zombieFighter.strength}</div>
                  <div><span>Agility: </span>{zombieFighter.agility}</div>
                </div>
                <button className="remove" onClick={() => handleRemoveFighter(zombieFighter)}>Remove</button>

              </div>
            </div>

          ))}

        </div>

        : <p>Pick some team members</p>}

      <h3>Fighters</h3>
      <div className='gridContainer'>
        {zombieFighters.map((zombieFighter, index) => (

          <div className="card" key={zombieFighter.id}>
            <img src={zombieFighter.img} alt={zombieFighter.name} />
            <div className="cardContent">
              <h3>{zombieFighter.name}</h3>

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