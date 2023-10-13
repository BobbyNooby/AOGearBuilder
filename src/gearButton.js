import React from 'react'
import ItemMenu from './ItemMenu';
import { useState } from 'react';
import './styles.css';
import { playSound } from './playAudioUtil';
import { playCorrect } from './playAudioUtil';
import { playWrong } from './playAudioUtil';

const GearButton = ({category, setAccessory1, setAccessory2, setAccessory3, setChestplate1, setPants1, updateFinalStats, accessory1, accessory2, accessory3, chestplate1, pants1, setEnchant1, setEnchant2, setEnchant3, setEnchant4, setEnchant5, enchant1, enchant2, enchant3, enchant4, enchant5, setAcc1Gem1, setAcc1Gem2, setAcc2Gem1, setAcc2Gem2, setAcc3Gem1, setAcc3Gem2, setChest1Gem1, setChest1Gem2, setPants1Gem1, setPants1Gem2, acc1gem1, acc1gem2, acc2gem1, acc2gem2, acc3gem1, acc3gem2, chest1gem1, chest1gem2, pants1gem1, pants1gem2, acc1gem3, acc2gem3, acc3gem3, chest1gem3, pants1gem3, setAcc1Gem3, setAcc2Gem3, setAcc3Gem3, setChest1Gem3, setPants1Gem3, setModifier1, setModifier2, setModifier3, setModifier4, setModifier5, modifier1, modifier2, modifier3, modifier4, modifier5}) => {

  const [showMenu, setShowMenu] = useState(false);
  


  const defaultImages = {
    pants: 'https://i.imgur.com/U9Z0chG.jpg',
    chestplates: 'https://i.imgur.com/Uj7r6Fm.jpg',
    accessories1: 'https://i.imgur.com/ynJYNoA.jpg',
    accessories2: 'https://i.imgur.com/ynJYNoA.jpg',
    accessories3 : 'https://i.imgur.com/ynJYNoA.jpg',
    enchant1 : 'https://i.imgur.com/PzIWvMv.jpg',
    enchant2 : 'https://i.imgur.com/PzIWvMv.jpg',
    enchant3 : 'https://i.imgur.com/PzIWvMv.jpg',
    enchant4 : 'https://i.imgur.com/PzIWvMv.jpg',
    enchant5 : 'https://i.imgur.com/PzIWvMv.jpg',
    modifier1 : 'https://i.imgur.com/iKfI8Cp.jpg',
    modifier2 : 'https://i.imgur.com/iKfI8Cp.jpg',
    modifier3 : 'https://i.imgur.com/iKfI8Cp.jpg',
    modifier4 : 'https://i.imgur.com/iKfI8Cp.jpg',
    modifier5 : 'https://i.imgur.com/iKfI8Cp.jpg',
  };  

  const handleClick = () => {
    setShowMenu(true);
    playCorrect();
  };

  const handleClose = () => {
    playCorrect();
    setShowMenu(false);
  };

  let itemType = "";
  const [buttonImgSrc, setButtonImgSrc] = useState(defaultImages[category]);
  
  

  switch (category) {
    case 'pants':
      itemType = "pants";
      break;
    case 'chestplates':
      itemType = "chestplates";
      break;
    case 'accessories1':
      itemType = "accessories1";
      break;
    case 'accessories2':
      itemType = "accessories2";
      break;
    case 'accessories3':
      itemType = "accessories3";
      break;
    case 'enchant1':
      itemType = "enchant1";
      break;
    case 'enchant2':
      itemType = "enchant2";
      break;
    case 'enchant3':
      itemType = "enchant3";
      break;
    case 'enchant4':
      itemType = "enchant4";
      break;
    case 'enchant5':
      itemType = "enchant5";
      break;
    case 'modifier1':
      itemType = "modifier1";
      break;
    case 'modifier2':
      itemType = "modifier2";
      break;
    case 'modifier3':
      itemType = "modifier3";
      break;
    case 'modifier4':
      itemType = "modifier4";
      break;
    case 'modifier5':
      itemType = "modifier5";
      break;
    default:
      break;
  }

  

  return (
    <div
    
    
    
    >
      <img src={buttonImgSrc}  onClick={handleClick} />

      {showMenu && (
        <div className="overlay"

        
        
        style={{ 
            position: 'fixed', 
            left : 0,
            top : 0,
            right : 0,
            bottom : 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex : 2,
    
        
        
        
        }}
        
        
        
        >
          <div className="item-grid">
            <img className="grid-item" src="https://i.imgur.com/4UqeZGb.jpg" onClick={handleClose}/>
            <ItemMenu category={itemType} handleClose={handleClose} buttonImgSrc={buttonImgSrc} setButtonImgSrc={setButtonImgSrc} setAccessory1={setAccessory1} setAccessory2={setAccessory2} setAccessory3={setAccessory3} setChestplate1={setChestplate1} setPants1={setPants1} updateFinalStats={updateFinalStats} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} setEnchant1={setEnchant1} setEnchant2={setEnchant2} setEnchant3={setEnchant3} setEnchant4={setEnchant4} setEnchant5={setEnchant5} enchant1={enchant1} enchant2={enchant2} enchant3={enchant3} enchant4={enchant4} enchant5={enchant5} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} acc1gem3={acc1gem3} acc2gem3={acc2gem3} acc3gem3={acc3gem3} chest1gem3={chest1gem3} pants1gem3={pants1gem3} setAcc1Gem3={setAcc1Gem3} setAcc2Gem3={setAcc2Gem3} setAcc3Gem3={setAcc1Gem3} setChest1Gem3={setChest1Gem3} setPants1Gem3={setPants1Gem3} setModifier1={setModifier1} setModifier2={setModifier2} setModifier3={setModifier3} setModifier4={setModifier4} setModifier5={setModifier5} modifier1={modifier1} modifier2={modifier2} modifier3={modifier3} modifier4={modifier4} modifier5={modifier5}/>
            
          </div>
        </div>
      )}
    </div>
  )
}


export default GearButton