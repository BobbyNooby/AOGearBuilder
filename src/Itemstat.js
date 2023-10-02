import React from 'react'

const Itemstat = ({ item }) => {
  return (
    <div>
        <div>{ item.power > 0 && <p class="powerResult"><img style={{height:'1.5em'}} src="https://i.imgur.com/Qnt1WCW.png"/>+ <span id="power">{item.power}</span> POWER</p>}</div>
        <div>{ item.defense > 0 && <p class="defenseResult"><img style={{height:'1.5em'}} src="https://i.imgur.com/xm6Io7L.png"/>+ <span id="defense">{item.defense}</span> DEFENSE</p>}</div>
        <div>{ item.agility > 0 && <p class="agilityResult"><img style={{height:'1.5em'}} src="https://i.imgur.com/ul1c2Ta.png"/>+ <span id="agility">{item.agility}</span> AGILITY</p>}</div>
        <div>{ item.attackSpeed > 0 && <p class="attackSpeedResult"><img style={{height:'1.5em'}} src="https://i.imgur.com/KWzGEI7.png"/>+ <span id="attackspeed">{item.attackSpeed}</span> ATTACK SPEED</p>}</div>
        <div>{ item.attackSize > 0 && <p class="attackSizeResult"><img style={{height:'1.5em'}} src="https://i.imgur.com/TwDybjN.png"/>+ <span id="attacksize">{item.attackSize}</span> ATTACK SIZE</p>}</div>
        <div>{ item.intensity > 0 && <p class="intensityResult"><img style={{height:'1.5em'}} src="https://i.imgur.com/Qgqq9fz.png"/>+ <span id="intensity">{item.intensity}</span> INTENSITY</p>}</div>
    </div>

    
  )
}

export default Itemstat