import React from 'react'
import ItemMenu from './ItemMenu';
import { useState, useEffect } from 'react';
import './styles.css';
import { playSound } from './playAudioUtil';
import { playCorrect } from './playAudioUtil';
import { playWrong } from './playAudioUtil';
import GemItemMenu from './gemItemMenu';


const GemButton = ({category, setAcc1Gem1, setAcc1Gem2, setAcc2Gem1, setAcc2Gem2, setAcc3Gem1, setAcc3Gem2, setChest1Gem1, setChest1Gem2, setPants1Gem1, setPants1Gem2, acc1gem1, acc1gem2, acc2gem1, acc2gem2, acc3gem1, acc3gem2, chest1gem1, chest1gem2, pants1gem1, pants1gem2, setAccessory1, setAccessory2, setAccessory3, setChestplate1, setPants1, updateFinalStats, accessory1, accessory2, accessory3, chestplate1, pants1, acc1gem3, acc2gem3, acc3gem3, chest1gem3, pants1gem3, setAcc1Gem3, setAcc2Gem3, setAcc3Gem3, setChest1Gem3, setPants1Gem3}) => {

  const [showMenu, setShowMenu] = useState(false);
  


  const defaultImages = {
    acc1gem1 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc1gem2 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc1gem3 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc2gem1 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc2gem2 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc2gem3 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc3gem1 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc3gem2 : 'https://i.imgur.com/5pGLWmQ.jpg',
    acc3gem3 : 'https://i.imgur.com/5pGLWmQ.jpg',
    chest1gem1 : 'https://i.imgur.com/5pGLWmQ.jpg',
    chest1gem2 : 'https://i.imgur.com/5pGLWmQ.jpg',
    chest1gem3 : 'https://i.imgur.com/5pGLWmQ.jpg',
    pants1gem1 : 'https://i.imgur.com/5pGLWmQ.jpg',
    pants1gem2 : 'https://i.imgur.com/5pGLWmQ.jpg',
    pants1gem3 : 'https://i.imgur.com/5pGLWmQ.jpg',
  };  

  const handleClick = () => {

    if (

      (category == "acc1gem1" && accessory1.gemNo < 1) ||
      (category == "acc1gem2" && accessory1.gemNo < 2) ||
      (category == "acc1gem3" && accessory1.gemNo < 3) ||
      (category == "acc2gem1" && accessory2.gemNo < 1) ||
      (category == "acc2gem2" && accessory2.gemNo < 2) ||
      (category == "acc2gem3" && accessory2.gemNo < 3) ||
      (category == "acc3gem1" && accessory3.gemNo < 1) ||
      (category == "acc3gem2" && accessory3.gemNo < 2) ||
      (category == "acc3gem3" && accessory3.gemNo < 3) ||
      (category == "chest1gem1" && chestplate1.gemNo < 1) ||
      (category == "chest1gem2" && chestplate1.gemNo < 2) ||
      (category == "chest1gem3" && chestplate1.gemNo < 3) ||
      (category == "pants1gem1" && pants1.gemNo < 1) ||
      (category == "pants1gem2" && pants1.gemNo < 2) ||
      (category == "pants1gem3" && pants1.gemNo < 3)



    ) {
      playWrong();
      
    } else {
      setShowMenu(true);
      document.body.classList.add('page-freeze');
      playCorrect();
    }

    
  };

  const handleClose = () => {
    playCorrect();
    setShowMenu(false);
    document.body.classList.remove('page-freeze');
  };

  let itemType = "";
  const [buttonImgSrc, setButtonImgSrc] = useState(defaultImages[category]);
  
  useEffect(() => {
    
    if (
      
        (acc1gem1.name === "None" && category === "acc1gem1") ||
        (acc1gem2.name === "None" && category === "acc1gem2") ||
        (acc1gem3.name === "None" && category === "acc1gem3") ||
        (acc2gem1.name === "None" && category === "acc2gem1") ||
        (acc2gem2.name === "None" && category === "acc2gem2") ||
        (acc2gem3.name === "None" && category === "acc2gem3") ||
        (acc3gem1.name === "None" && category === "acc3gem1") ||
        (acc3gem2.name === "None" && category === "acc3gem2") ||
        (acc3gem3.name === "None" && category === "acc3gem3") ||
        (chest1gem1.name === "None" && category === "chest1gem1") ||
        (chest1gem2.name === "None" && category === "chest1gem2") ||
        (chest1gem3.name === "None" && category === "chest1gem3") ||
        (pants1gem1.name === "None" && category === "pants1gem1") ||
        (pants1gem2.name === "None" && category === "pants1gem2") ||
        (pants1gem3.name === "None" && category === "pants1gem3") 
        
      
      
      
      
      ){
      setButtonImgSrc(defaultImages[category]);
    } 
  }, [accessory1, accessory2, accessory3, chestplate1, pants1, category]);


  



  switch (category) {
    case 'acc1gem1':
      itemType = "acc1gem1";
      break;
    case 'acc1gem2':
      itemType = "acc1gem2";
      break;
    case 'acc1gem3':
      itemType = "acc1gem3";
      break;
    case 'acc2gem1':
      itemType = "acc2gem1";
      break;
    case 'acc2gem2':
      itemType = "acc2gem2";
      break;
    case 'acc2gem3':
      itemType = "acc2gem3";
      break;
    case 'acc3gem1':
      itemType = "acc3gem1";
      break;
    case 'acc3gem2':
      itemType = "acc3gem2";
      break;
  case 'acc3gem3':
      itemType = "acc3gem3";
      break;
    case 'chest1gem1':
      itemType = "chest1gem1";
      break;
    case 'chest1gem2':
      itemType = "chest1gem2";
      break;
    case 'chest1gem3':
      itemType = "chest1gem3";
      break;
    case 'pants1gem1':
      itemType = "pants1gem1";
      break;
    case 'pants1gem2':
      itemType = "pants1gem2";
      break;
    case 'pants1gem3':
      itemType = "pants1gem3";
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
          overflowY : 'auto',
  
      
      
      
      }}
      
      onClick={handleClose}
        
        
        
        >
          <div className="item-grid" >
            <img className="grid-item" src="https://i.imgur.com/4UqeZGb.jpg" onClick={handleClose}/>
            <GemItemMenu className="grid-item" category={itemType} handleClose={handleClose} buttonImgSrc={buttonImgSrc} setButtonImgSrc={setButtonImgSrc} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} defaultImages={defaultImages} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} acc1gem3={acc1gem3} acc2gem3={acc2gem3} acc3gem3={acc3gem3} chest1gem3={chest1gem3} pants1gem3={pants1gem3} setAcc1Gem3={setAcc1Gem3} setAcc2Gem3={setAcc2Gem3} setAcc3Gem3={setAcc1Gem3} setChest1Gem3={setChest1Gem3} setPants1Gem3={setPants1Gem3}/>
            
          </div>
        </div>
      )}
    </div>
  )
}


export default GemButton