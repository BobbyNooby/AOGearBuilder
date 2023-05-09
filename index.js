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


    
  
    // Add the power and defense values together
    var totalPower = accessory1Power + accessory2Power + accessory3Power + chestpiecePower + pantsPower;
    var totalDefense = accessory1Defense + accessory2Defense + accessory3Defense + chestpieceDefense + pantsDefense;
    var totalAgility = accessory1Agility + accessory2Agility + accessory3Agility + chestpieceAgility + pantsAgility;
    var totalAttackSpeed = accessory1AttackSpeed + accessory2AttackSpeed + accessory3AttackSpeed + chestpieceAttackSpeed + pantsAttackSpeed;
    var totalAttackSize = accessory1AttackSize + accessory2AttackSize + accessory3AttackSize + chestpieceAttackSize + pantsAttackSize;
    var totalIntensity = accessory1Intensity + accessory2Intensity + accessory3Intensity + chestpieceIntensity + pantsIntensity;
  
    // Update the values on the page
    document.getElementById("power").textContent = totalPower;
    document.getElementById("defense").textContent = totalDefense;
    document.getElementById("agility").textContent = totalAgility;
    document.getElementById("attackspeed").textContent = totalAttackSpeed;
    document.getElementById("attacksize").textContent = totalAttackSize;
    document.getElementById("intensity").textContent = totalIntensity;
  }
  