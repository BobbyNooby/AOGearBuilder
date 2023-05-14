const accessoryMenu1 = document.getElementById("accessory1");
const accessoryMenu2 = document.getElementById("accessory2");
const accessoryMenu3 = document.getElementById("accessory3");
const chestplateMenu = document.getElementById("chestpiece");
const pantsMenu = document.getElementById("pants");

const enchantMenu1 = document.getElementById("enchant1");
const enchantMenu2 = document.getElementById("enchant2");
const enchantMenu3 = document.getElementById("enchant3");
const enchantMenu4 = document.getElementById("enchant4");
const enchantMenu5 = document.getElementById("enchant5");


function startup(){

  document.getElementById("power").textContent = 0;
  document.getElementById("defense").textContent = 0;
  document.getElementById("agility").textContent = 0;
  document.getElementById("attackspeed").textContent = 0;
  document.getElementById("attacksize").textContent = 0;
  document.getElementById("intensity").textContent = 0;

}




function calculate() {
    // Get the selected values from the dropdown menus
    var accessory1 = document.getElementById("accessory1");
    var accessory1Power = parseInt(accessory1.options[accessory1.selectedIndex].getAttribute("data-power"));
    var accessory1Defense = parseInt(accessory1.options[accessory1.selectedIndex].getAttribute("data-defense"));
    var accessory1Agility = parseInt(accessory1.options[accessory1.selectedIndex].getAttribute("data-agility"));
    var accessory1AttackSpeed = parseInt(accessory1.options[accessory1.selectedIndex].getAttribute("data-attackspeed"));
    var accessory1AttackSize = parseInt(accessory1.options[accessory1.selectedIndex].getAttribute("data-attacksize"));
    var accessory1Intensity = parseInt(accessory1.options[accessory1.selectedIndex].getAttribute("data-intensity"));
    

    var accessory2 = document.getElementById("accessory2");
    var accessory2Power = parseInt(accessory2.options[accessory2.selectedIndex].getAttribute("data-power"));
    var accessory2Defense = parseInt(accessory2.options[accessory2.selectedIndex].getAttribute("data-defense"));
    var accessory2Agility = parseInt(accessory2.options[accessory2.selectedIndex].getAttribute("data-agility"));
    var accessory2AttackSpeed = parseInt(accessory2.options[accessory2.selectedIndex].getAttribute("data-attackspeed"));
    var accessory2AttackSize = parseInt(accessory2.options[accessory2.selectedIndex].getAttribute("data-attacksize"));
    var accessory2Intensity = parseInt(accessory2.options[accessory2.selectedIndex].getAttribute("data-intensity"));

    var accessory3 = document.getElementById("accessory3");
    var accessory3Power = parseInt(accessory3.options[accessory3.selectedIndex].getAttribute("data-power"));
    var accessory3Defense = parseInt(accessory3.options[accessory3.selectedIndex].getAttribute("data-defense"));
    var accessory3Agility = parseInt(accessory3.options[accessory3.selectedIndex].getAttribute("data-agility"));
    var accessory3AttackSpeed = parseInt(accessory3.options[accessory3.selectedIndex].getAttribute("data-attackspeed"));
    var accessory3AttackSize = parseInt(accessory3.options[accessory3.selectedIndex].getAttribute("data-attacksize"));
    var accessory3Intensity = parseInt(accessory3.options[accessory3.selectedIndex].getAttribute("data-intensity"));

    var chestpiece = document.getElementById("chestpiece");
    var chestpiecePower = parseInt(chestpiece.options[chestpiece.selectedIndex].getAttribute("data-power"));
    var chestpieceDefense = parseInt(chestpiece.options[chestpiece.selectedIndex].getAttribute("data-defense"));
    var chestpieceAgility = parseInt(chestpiece.options[chestpiece.selectedIndex].getAttribute("data-agility"));
    var chestpieceAttackSpeed = parseInt(chestpiece.options[chestpiece.selectedIndex].getAttribute("data-attackspeed"));
    var chestpieceAttackSize = parseInt(chestpiece.options[chestpiece.selectedIndex].getAttribute("data-attacksize"));
    var chestpieceIntensity = parseInt(chestpiece.options[chestpiece.selectedIndex].getAttribute("data-intensity"));

    var pants = document.getElementById("pants");
    var pantsPower = parseInt(pants.options[pants.selectedIndex].getAttribute("data-power"));
    var pantsDefense = parseInt(pants.options[pants.selectedIndex].getAttribute("data-defense"));
    var pantsAgility = parseInt(pants.options[pants.selectedIndex].getAttribute("data-agility"));
    var pantsAttackSpeed = parseInt(pants.options[pants.selectedIndex].getAttribute("data-attackspeed"));
    var pantsAttackSize = parseInt(pants.options[pants.selectedIndex].getAttribute("data-attacksize"));
    var pantsIntensity = parseInt(pants.options[pants.selectedIndex].getAttribute("data-intensity"));

    var enchant1 = document.getElementById("enchant1");
    var enchant1Power = parseInt(enchant1.options[enchant1.selectedIndex].getAttribute("data-power"));
    var enchant1Defense = parseInt(enchant1.options[enchant1.selectedIndex].getAttribute("data-defense"));
    var enchant1Agility = parseInt(enchant1.options[enchant1.selectedIndex].getAttribute("data-agility"));
    var enchant1AttackSpeed = parseInt(enchant1.options[enchant1.selectedIndex].getAttribute("data-attackspeed"));
    var enchant1AttackSize = parseInt(enchant1.options[enchant1.selectedIndex].getAttribute("data-attacksize"));
    var enchant1Intensity = parseInt(enchant1.options[enchant1.selectedIndex].getAttribute("data-intensity"));

    var enchant2 = document.getElementById("enchant2");
    var enchant2Power = parseInt(enchant2.options[enchant2.selectedIndex].getAttribute("data-power"));
    var enchant2Defense = parseInt(enchant2.options[enchant2.selectedIndex].getAttribute("data-defense"));
    var enchant2Agility = parseInt(enchant2.options[enchant2.selectedIndex].getAttribute("data-agility"));
    var enchant2AttackSpeed = parseInt(enchant2.options[enchant2.selectedIndex].getAttribute("data-attackspeed"));
    var enchant2AttackSize = parseInt(enchant2.options[enchant2.selectedIndex].getAttribute("data-attacksize"));
    var enchant2Intensity = parseInt(enchant2.options[enchant2.selectedIndex].getAttribute("data-intensity"));

    var enchant3 = document.getElementById("enchant3");
    var enchant3Power = parseInt(enchant3.options[enchant3.selectedIndex].getAttribute("data-power"));
    var enchant3Defense = parseInt(enchant3.options[enchant3.selectedIndex].getAttribute("data-defense"));
    var enchant3Agility = parseInt(enchant3.options[enchant3.selectedIndex].getAttribute("data-agility"));
    var enchant3AttackSpeed = parseInt(enchant3.options[enchant3.selectedIndex].getAttribute("data-attackspeed"));
    var enchant3AttackSize = parseInt(enchant3.options[enchant3.selectedIndex].getAttribute("data-attacksize"));
    var enchant3Intensity = parseInt(enchant3.options[enchant3.selectedIndex].getAttribute("data-intensity"));

    var enchant4 = document.getElementById("enchant4");
    var enchant4Power = parseInt(enchant4.options[enchant4.selectedIndex].getAttribute("data-power"));
    var enchant4Defense = parseInt(enchant4.options[enchant4.selectedIndex].getAttribute("data-defense"));
    var enchant4Agility = parseInt(enchant4.options[enchant4.selectedIndex].getAttribute("data-agility"));
    var enchant4AttackSpeed = parseInt(enchant4.options[enchant4.selectedIndex].getAttribute("data-attackspeed"));
    var enchant4AttackSize = parseInt(enchant4.options[enchant4.selectedIndex].getAttribute("data-attacksize"));
    var enchant4Intensity = parseInt(enchant4.options[enchant4.selectedIndex].getAttribute("data-intensity"));

    var enchant5 = document.getElementById("enchant5");
    var enchant5Power = parseInt(enchant5.options[enchant5.selectedIndex].getAttribute("data-power"));
    var enchant5Defense = parseInt(enchant5.options[enchant5.selectedIndex].getAttribute("data-defense"));
    var enchant5Agility = parseInt(enchant5.options[enchant5.selectedIndex].getAttribute("data-agility"));
    var enchant5AttackSpeed = parseInt(enchant5.options[enchant5.selectedIndex].getAttribute("data-attackspeed"));
    var enchant5AttackSize = parseInt(enchant5.options[enchant5.selectedIndex].getAttribute("data-attacksize"));
    var enchant5Intensity = parseInt(enchant5.options[enchant5.selectedIndex].getAttribute("data-intensity"));

    
  
    // Add the power and defense values together
    var totalPower = accessory1Power + accessory2Power + accessory3Power + chestpiecePower + pantsPower + enchant1Power + enchant2Power + enchant3Power + enchant4Power + enchant5Power;
    var totalDefense = accessory1Defense + accessory2Defense + accessory3Defense + chestpieceDefense + pantsDefense + enchant1Defense + enchant2Defense + enchant3Defense + enchant4Defense + enchant5Defense;
    var totalAgility = accessory1Agility + accessory2Agility + accessory3Agility + chestpieceAgility + pantsAgility + enchant1Agility + enchant2Agility + enchant3Agility + enchant4Agility + enchant5Agility;
    var totalAttackSpeed = accessory1AttackSpeed + accessory2AttackSpeed + accessory3AttackSpeed + chestpieceAttackSpeed + pantsAttackSpeed + enchant1AttackSpeed + enchant2AttackSpeed + enchant3AttackSpeed + enchant4AttackSpeed + enchant5AttackSpeed;
    var totalAttackSize = accessory1AttackSize + accessory2AttackSize + accessory3AttackSize + chestpieceAttackSize + pantsAttackSize + enchant1AttackSize + enchant2AttackSize + enchant3AttackSize + enchant4AttackSize + enchant5AttackSize;
    var totalIntensity = accessory1Intensity + accessory2Intensity + accessory3Intensity + chestpieceIntensity + pantsIntensity + enchant1Intensity + enchant2Intensity + enchant3Intensity + enchant4Intensity + enchant5Intensity;
  
    // Update the values on the page
    document.getElementById("power").textContent = totalPower;
    document.getElementById("defense").textContent = totalDefense;
    document.getElementById("agility").textContent = totalAgility;
    document.getElementById("attackspeed").textContent = totalAttackSpeed;
    document.getElementById("attacksize").textContent = totalAttackSize;
    document.getElementById("intensity").textContent = totalIntensity;
  }


accessoryMenu1.addEventListener("change", calculate);
accessoryMenu2.addEventListener("change", calculate);
accessoryMenu3.addEventListener("change", calculate);
chestplateMenu.addEventListener("change", calculate);
pantsMenu.addEventListener("change", calculate);

enchantMenu1.addEventListener("change", calculate);
enchantMenu2.addEventListener("change", calculate);
enchantMenu3.addEventListener("change", calculate);
enchantMenu4.addEventListener("change", calculate);
enchantMenu5.addEventListener("change", calculate);
