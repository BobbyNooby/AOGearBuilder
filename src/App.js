
import './App.css';
import './styles.css';
import GearButton from './gearButton';
import { useState } from 'react';
import { pants } from './data/pants';
import GemButton from './gemButton';


function App() {

  const [popupVisible, setPopupVisible] = useState(false);

  const errorShow = () => {
    setPopupVisible(true);

    // Hide the popup after a few seconds (optional)
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000); // 3000 milliseconds (3 seconds)
  };


  const [accessory1, setAccessory1] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,
    gemNo : 0,
    accessoryType : "",

  });

  const [accessory2, setAccessory2] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,
    gemNo : 0,
    accessoryType : "",

  });

  const [accessory3, setAccessory3] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,
    gemNo : 0,
    accessoryType : "",

  });

  const [chestplate1, setChestplate1] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,
    gemNo : 0,

  });

  const [pants1, setPants1] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,
    gemNo : 0,

  });

  const [enchant1, setEnchant1] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,

  });

  const [enchant2, setEnchant2] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,

  });

  const [enchant3, setEnchant3] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,

  });

  const [enchant4, setEnchant4] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,

  });

  const [enchant5, setEnchant5] = useState({
    name : "",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,

  });

  const [acc1gem1, setAcc1Gem1] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [acc1gem2, setAcc1Gem2] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [acc2gem1, setAcc2Gem1] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [acc2gem2, setAcc2Gem2] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [acc3gem1, setAcc3Gem1] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [acc3gem2, setAcc3Gem2] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [chest1gem1, setChest1Gem1] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [chest1gem2, setChest1Gem2] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [pants1gem1, setPants1Gem1] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  const [pants1gem2, setPants1Gem2] = useState({
    name : "None",
    defense : 0,
    power : 0,
    agility : 0,
    attackSize : 0,
    attackSpeed : 0,
    intensity : 0,
    levelMultiplier :0,


  });

  

  
  
  
  
  return (
    <div > <body class="pagebackground">




  <div class="centertop"> {/*  Information Box Above */}
  <h2>BobbyNooby's Arcane Odyssey Gear Builder! (1.13.3.6) </h2>
  <p>This gear builder features the important endgame gearsets for Arcane Odyssey.</p>
  <p>If i missed anything or if you'd like to contribute, message me on discord at BobbyNooby#8993</p>
  <p>If you'd like to contribute to the Arcane Odyssey Database Project, join the discord <a href='https://discord.gg/wuczy67us7'>here</a></p>
  <p>or look at the source code for the website  at <a href="https://github.com/BobbyNooby/AOGearBuilder">here</a></p>
  <p>Go to the github link to see update logs.</p>
  <p><a href="https://www.twitch.tv/bobbynooby">Twitch</a> | <a href="https://www.youtube.com/@bobbynooby/">Youtube</a> | <a href="https://twitter.com/bobbynoobyu">Twitter</a> | <a href="https://github.com/BobbyNooby/AOGearBuilder">Github</a></p>
  </div>

<br></br>




    <div class="center">

      <div class="row">

        <div class="column center3"> {/* Gear Buttons Section */}
        <div class="row">
        <div class="column">

          <div>
            <GearButton  category={"accessories1"} setAccessory1={setAccessory1} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2}/>
            <GearButton category={"accessories2"} setAccessory2={setAccessory2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2}/>
            <GearButton category={"accessories3"} setAccessory3={setAccessory3} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2}/>
            <GearButton category={"chestplates"} setChestplate1={setChestplate1} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2}/>
            <GearButton category={"pants"} setPants1={setPants1} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2}/>
          </div>
        
        </div>

        <div class="column">

          <div >
            <GemButton category={"acc1gem1"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"acc2gem1"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"acc3gem1"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"chest1gem1"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"pants1gem1"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
          </div>
        </div>

        <div class="column">

          <div >
            <GemButton category={"acc1gem2"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"acc2gem2"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"acc3gem2"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"chest1gem2"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GemButton category={"pants1gem2"} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>   
          </div>
        </div>


        <div class="column">

          <div >
            <GearButton  category={"enchant1"} setEnchant1={setEnchant1} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GearButton category={"enchant2"}  setEnchant2={setEnchant2} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GearButton category={"enchant3"} setEnchant3={setEnchant3} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GearButton category={"enchant4"} setEnchant4={setEnchant4} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
            <GearButton category={"enchant5"} setEnchant5={setEnchant5} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1}/>
          </div>
        </div>
        
          
        
        </div>
        </div>

        <div class="column"> {/* Final stat calculation box*/}
          <div class="center2" id="gearStats">

            <div><p class="powerResult">
            <img style={{height:'1.5em'}} src="https://i.imgur.com/Qnt1WCW.png"/>+ 
            <span>
              {
                accessory1.power + Math.floor(accessory1.levelMultiplier * enchant1.power) + acc1gem1.power + acc1gem2.power +
                accessory2.power + Math.floor(accessory2.levelMultiplier * enchant2.power) + acc2gem1.power + acc2gem2.power +
                accessory3.power + Math.floor(accessory3.levelMultiplier * enchant3.power) + acc3gem1.power + acc3gem2.power +
                chestplate1.power + Math.floor(chestplate1.levelMultiplier * enchant4.power) + chest1gem1.power + chest1gem2.power +
                pants1.power + Math.floor(pants1.levelMultiplier * enchant5.power) + pants1gem1.power + pants1gem2.power
              }
            </span> POWER</p>
            </div>

          <div>
            <p class="defenseResult">
              <img style={{height:'1.5em'}} src="https://i.imgur.com/xm6Io7L.png"/>+ 
              <span id="defense">
                {
                  accessory1.defense + Math.floor(accessory1.levelMultiplier * enchant1.defense) + acc1gem1.defense + acc1gem2.defense +
                  accessory2.defense + Math.floor(accessory2.levelMultiplier * enchant2.defense) + acc2gem1.defense + acc2gem2.defense +
                  accessory3.defense + Math.floor(accessory3.levelMultiplier * enchant3.defense) + acc3gem1.defense + acc3gem2.defense +
                  chestplate1.defense + Math.floor(chestplate1.levelMultiplier * enchant4.defense) + chest1gem1.defense + chest1gem2.defense +
                  pants1.defense + Math.floor(pants1.levelMultiplier * enchant5.defense) + pants1gem1.defense + pants1gem2.defense
                }
              </span> DEFENSE</p>
          </div>
        
        
          <div>
            <p class="agilityResult">
              <img style={{height:'1.5em'}} src="https://i.imgur.com/ul1c2Ta.png"/>+ 
              <span id="agility">
                {
                  accessory1.agility + Math.floor(accessory1.levelMultiplier * enchant1.agility) + acc1gem1.agility + acc1gem2.agility +
                  accessory2.agility + Math.floor(accessory2.levelMultiplier * enchant2.agility) + acc2gem1.agility + acc2gem2.agility +
                  accessory3.agility + Math.floor(accessory3.levelMultiplier * enchant3.agility) + acc3gem1.agility + acc3gem2.agility +
                  chestplate1.agility + Math.floor(chestplate1.levelMultiplier * enchant4.agility) + chest1gem1.agility + chest1gem2.agility +
                  pants1.agility + Math.floor(pants1.levelMultiplier * enchant5.agility) + pants1gem1.agility + pants1gem2.agility
                }
              </span> AGILITY</p>
          </div>
        
        
          <div>
            <p class="attackSpeedResult">
              <img style={{height:'1.5em'}} src="https://i.imgur.com/KWzGEI7.png"/>+ 
              <span id="attackspeed">
                {
                  accessory1.attackSpeed + Math.floor(accessory1.levelMultiplier * enchant1.attackSpeed) + acc1gem1.attackSpeed + acc1gem2.attackSpeed +
                  accessory2.attackSpeed + Math.floor(accessory2.levelMultiplier * enchant2.attackSpeed) + acc2gem1.attackSpeed + acc2gem2.attackSpeed +
                  accessory3.attackSpeed + Math.floor(accessory3.levelMultiplier * enchant3.attackSpeed) + acc3gem1.attackSpeed + acc3gem2.attackSize +
                  chestplate1.attackSpeed + Math.floor(chestplate1.levelMultiplier * enchant4.attackSpeed) + chest1gem1.attackSpeed + chest1gem2.attackSpeed +
                  pants1.attackSpeed + Math.floor(pants1.levelMultiplier * enchant5.attackSpeed) + pants1gem1.attackSpeed + pants1gem2.attackSpeed
                }
              </span> ATTACK SPEED</p>
          </div>
        
        
          <div>
            <p class="attackSizeResult">
            <img style={{height:'1.5em'}} src="https://i.imgur.com/TwDybjN.png"/>+ 
            <span id="attacksize">
              {
                accessory1.attackSize + Math.floor(accessory1.levelMultiplier * enchant1.attackSize) + acc1gem1.attackSize + acc1gem2.attackSize +
                accessory2.attackSize + Math.floor(accessory2.levelMultiplier * enchant2.attackSize) + acc2gem1.attackSize + acc2gem2.attackSize +
                accessory3.attackSize + Math.floor(accessory3.levelMultiplier * enchant3.attackSize) + acc3gem1.attackSize + acc3gem2.attackSize +
                chestplate1.attackSize + Math.floor(chestplate1.levelMultiplier * enchant4.attackSize) + chest1gem1.attackSize + chest1gem2.attackSize +
                pants1.attackSize + Math.floor(pants1.levelMultiplier * enchant5.attackSize)  + pants1gem1.attackSize + pants1gem2.attackSize
              }
            </span> ATTACK SIZE</p>
          </div>
        
        
          <div>
            <p class="intensityResult">
            <img style={{height:'1.5em'}} src="https://i.imgur.com/Qgqq9fz.png"/>+ 
            <span id="intensity">
              {
                accessory1.intensity + Math.floor(accessory1.levelMultiplier * enchant1.intensity) + acc1gem1.intensity + acc1gem2.intensity +
                accessory2.intensity + Math.floor(accessory2.levelMultiplier * enchant2.intensity) + acc2gem1.intensity + acc2gem2.intensity +
                accessory3.intensity + Math.floor(accessory3.levelMultiplier * enchant3.intensity) + acc3gem1.intensity + acc3gem2.intensity +
                chestplate1.intensity + Math.floor(chestplate1.levelMultiplier * enchant4.intensity) + chest1gem1.intensity + chest1gem2.intensity +
                pants1.intensity + Math.floor(pants1.levelMultiplier * enchant5.intensity) + pants1gem1.intensity + pants1gem2.intensity
              }
            </span> INTENSITY</p>
          </div>
          
          </div>
        </div>
        
          
      </div>

      

    </div>
  
    </body>
    </div>

    














    

  );
}

export default App;
