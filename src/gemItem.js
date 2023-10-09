import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import Itemstat from './Itemstat';
import { playCorrect } from './playAudioUtil';
import { playWrong } from './playAudioUtil';


function GemItem({item, handleClose, setButtonImgSrc, category, setAcc1Gem1, setAcc1Gem2, setAcc2Gem1, setAcc2Gem2, setAcc3Gem1, setAcc3Gem2, setChest1Gem1, setChest1Gem2, setPants1Gem1, setPants1Gem2, acc1gem1, acc1gem2, acc2gem1, acc2gem2, acc3gem1, acc3gem2, chest1gem1, chest1gem2, pants1gem1, pants1gem2, defaultImages, accessory1, accessory2, accessory3, chestplate1, pants1, acc1gem3, acc2gem3, acc3gem3, chest1gem3, pants1gem3, setAcc1Gem3, setAcc2Gem3, setAcc3Gem3, setChest1Gem3, setPants1Gem3}) {

  
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const itemStatRef = useRef(null)

  const handleMouseOver = (event) => {
    setIsHovering(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleImageChange = () => {

    setButtonImgSrc(item.imageId);
  }

  

  const handleMouseMove = (event) => {
    const boxWidth = 300; // Change this to the width of your box
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const x = event.clientX;
    const y = event.clientY;

    if (x + boxWidth > windowWidth - 50) {
      setMousePosition({ x: x - boxWidth - 40 , y });
    } else{
      setMousePosition({ x, y });
    }

    if (y > windowHeight / 2) {
      setMousePosition({ x , y : y - 400 });
    } else{
      setMousePosition({ x, y });
    }

    
  };

  const handleStatChange = (category) => {

    switch (category) {
      case 'acc1gem1':
        setAcc1Gem1(item);
        break;
      case 'acc1gem2':
        setAcc1Gem2(item);
        break;
      case 'acc1gem3':
        setAcc1Gem3(item);
        break;
      case 'acc2gem1':
        setAcc2Gem1(item);
        break;
      case 'acc2gem2':
        setAcc2Gem2(item);
        break;
      case 'acc2gem3':
        setAcc2Gem3(item);
        break;
      case 'acc3gem1':
        setAcc3Gem1(item);
        break;
      case 'acc3gem2':
        setAcc3Gem2(item);
        break;
      case 'acc3gem3':
        setAcc3Gem3(item);
        break;
      case 'chest1gem1':
        setChest1Gem1(item);
        break;
      case 'chest1gem2':
        setChest1Gem2(item);
        break;
      case 'chest1gem3':
        setChest1Gem3(item);
        break;
      case 'pants1gem1':
        setPants1Gem1(item);
        break;
      case 'pants1gem2':
        setPants1Gem2(item);
        break;
      case 'pants1gem3':
        setPants1Gem3(item);
        break;
      default:
        break;

      


    }

      // if (category == 'acc1gem1') {
      //   setAcc1Gem1(item)


      // } else if (category == 'acc1gem2') {
      //   setAcc1Gem2(item);


      // }
      // else if (category == 'acc2gem1') {
      //   setAcc2Gem1(item);


      // }
      // else if (category == 'acc2gem2') {
      //   setAcc2Gem2(item);


      // }
      // else if (category == 'acc3gem1') {
      //   setAcc3Gem1(item);

      // }

      // else if (category == 'acc3gem2') {
      //   setAcc3Gem2(item);

      // }

      // else if (category == 'chest1gem1') {
      //   setChest1Gem1(item);

      // }

      // else if (category == 'chest1gem2') {
      //   setChest1Gem2(item);

      // }

      // else if (category == 'pants1gem1') {
      //   setPants1Gem1(item);

      // }

      // else if (category == 'pants1gem2') {
      //   setPants1Gem2(item);

      // }
    }

  return (
  

    <div
      className={`grid-item`}
      
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMove}
      onClick={ () => {
        handleClose();
        handleImageChange();
        handleStatChange(category);
      }}
      
    
      style={{ position: 'static', display: 'inline-block' }}
    >
      <img src={item.imageId} alt={item.name} />


      {isHovering && (
        <div
          style={{
            position: 'absolute',
            top: mousePosition.y ,
            left: mousePosition.x + 20,
            backgroundColor: 'black',
            width: '300px',
            padding: '10px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            border: '3px solid white',
            
            

          }}

          ref={itemStatRef}
        > 
          <h2 class="merriweatherFont" style={{color:'white' }}>{item.name}</h2>
          <p class="legendstyle" style={{color :'white'}}>{item.legend}</p>
          <div  >
          <Itemstat item={item}/>
          </div>
        </div>
      )}
      
  
    </div>
  );
}

export default GemItem;
