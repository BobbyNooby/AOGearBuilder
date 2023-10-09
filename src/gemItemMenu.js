import React from 'react';

import { gems } from './data/gems.js';
import GemItem from './gemItem.js';

function GemItemMenu({category, handleClose, setButtonImgSrc, setAcc1Gem1, setAcc1Gem2, setAcc2Gem1, setAcc2Gem2, setAcc3Gem1, setAcc3Gem2, setChest1Gem1, setChest1Gem2, setPants1Gem1, setPants1Gem2, acc1gem1, acc1gem2, acc2gem1, acc2gem2, acc3gem1, acc3gem2, chest1gem1, chest1gem2, pants1gem1, pants1gem2, defaultImages, accessory1, accessory2, accessory3, chestplate1, pants1, acc1gem3, acc2gem3, acc3gem3, chest1gem3, pants1gem3, setAcc1Gem3, setAcc2Gem3, setAcc3Gem3, setChest1Gem3, setPants1Gem3 }) {

  let itemType = [];

  switch (category) {
    case 'acc1gem1':
      itemType = gems;
      break;
    case 'acc1gem2':
      itemType = gems;
      break;
    case 'acc1gem3':
      itemType = gems;
      break;
    case 'acc2gem1':
      itemType = gems;
      break;
    case 'acc2gem2':
      itemType = gems;
      break;
    case 'acc2gem3':
      itemType = gems;
      break;
    case 'acc3gem1':
      itemType = gems;
      break;
    case 'acc3gem2':
      itemType = gems;
      break;
    case 'acc3gem3':
      itemType = gems;
      break;
    case 'chest1gem1':
      itemType = gems;
      break;
    case 'chest1gem2':
      itemType = gems;
      break;
    case 'chest1gem3':
      itemType = gems;
      break;
    case 'pants1gem1':
      itemType = gems;
      break;
    case 'pants1gem2':
      itemType = gems;
      break;
    case 'pants1gem3':
      itemType = gems;
      break;
    default:
      break;
  }



  return (
    <div>
      
    <div className="item-grid">
      {itemType.map((item) => (
        <GemItem key={item.id} item={item} handleClose={handleClose} setButtonImgSrc={setButtonImgSrc} category={category} acc1gem1={acc1gem1} acc1gem2={acc1gem2} acc2gem1={acc2gem1} acc2gem2={acc2gem2} acc3gem1={acc3gem1} acc3gem2={acc3gem2} chest1gem1={chest1gem1} chest1gem2={chest1gem2} pants1gem1={pants1gem1} pants1gem2={pants1gem2} setAcc1Gem1={setAcc1Gem1} setAcc1Gem2={setAcc1Gem2} setAcc2Gem1={setAcc2Gem1} setAcc2Gem2={setAcc2Gem2} setAcc3Gem1={setAcc3Gem1} setAcc3Gem2={setAcc3Gem2} setChest1Gem1={setChest1Gem1} setChest1Gem2={setChest1Gem2} setPants1Gem1={setPants1Gem1} setPants1Gem2={setPants1Gem2} defaultImages={defaultImages} accessory1={accessory1} accessory2={accessory2} accessory3={accessory3} chestplate1={chestplate1} pants1={pants1} acc1gem3={acc1gem3} acc2gem3={acc2gem3} acc3gem3={acc3gem3} chest1gem3={chest1gem3} pants1gem3={pants1gem3} setAcc1Gem3={setAcc1Gem3} setAcc2Gem3={setAcc2Gem3} setAcc3Gem3={setAcc1Gem3} setChest1Gem3={setChest1Gem3} setPants1Gem3={setPants1Gem3}/>
      ))}
    </div>

  </div>
  
  );
}

export default GemItemMenu;
