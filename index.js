$(document).ready(function() {
  $.getJSON("gearvalues/accessories.json", function(data) {
    populateOptions("accessory1-options", data.accessories);
    populateOptions("accessory2-options", data.accessories);
    populateOptions("accessory3-options", data.accessories);

    $("input[type='text']").on("input", function() {
      var selectedId = $(this).attr("id");
      var selectedValue = $(this).val();

      if (selectedId === "accessory1") {
        disableOption("accessory2", selectedValue);
        disableOption("accessory3", selectedValue);
      } else if (selectedId === "accessory2") {
        disableOption("accessory1", selectedValue);
        disableOption("accessory3", selectedValue);
      } else if (selectedId === "accessory3") {
        disableOption("accessory1", selectedValue);
        disableOption("accessory2", selectedValue);
      }

      calculateTotalStats();
    });
  });

  $.getJSON("gearvalues/chestpiece.json", function(data) {
    populateOptions("chestpiece-options", data.chestpiece);
    $("input[type='text']").on("input", function() {
      calculateTotalStats();
    });
  });

  $.getJSON("gearvalues/pants.json", function(data) {
    populateOptions("pants-options", data.pants);
    $("input[type='text']").on("input", function() {
      calculateTotalStats();
    });
  });
});

function populateOptions(datalistId, gearOptions) {
  var options = '';
  $.each(gearOptions, function(index, gear) {
    options += '<option value="' + gear.name + '">';
  });
  $('#' + datalistId).html(options);
}

function disableOption(selectId, optionValue) {
  $('#' + selectId + ' option').each(function() {
    var option = $(this);
    var optionName = option.val();
    
    if (optionName === "None") {
      option.prop("disabled", false);
    } else if (optionName === optionValue) {
      option.prop("disabled", true);
    } else {
      option.prop("disabled", false);
    }
  });
}

function enableOption(inputId, optionValue) {
  var option = $("#" + inputId).siblings("datalist").children('option[value="' + optionValue + '"]');
  option.prop("disabled", false);
}

// Rest of the code...



function calculateTotalStats() {

  var selectedAccessories = [
    { id: "accessory1", enchantId: "accessory1-enchant" },
    { id: "accessory2", enchantId: "accessory2-enchant" },
    { id: "accessory3", enchantId: "accessory3-enchant" }
  ];
  
  var accessoryTypes = [];
  var isDuplicate = false;

  for (var i = 0; i < selectedAccessories.length; i++) {
    var accessoryId = selectedAccessories[i].id;
    var enchantId = selectedAccessories[i].enchantId;
    var selectedAccessory = $("#" + accessoryId).val();
    
    if (selectedAccessory && accessoryTypes.includes(selectedAccessory)) {
      isDuplicate = true;
      $("#" + accessoryId).val(""); // Reset the current duplicate selection
      $("#" + enchantId).val(""); // Reset the associated enchant selection
      disableOption(accessoryId, selectedAccessory); // Disable the duplicate accessory option in the datalist
      enableOption(accessoryId, "None"); // Enable the "None" option in the previous datalist
      break;
    }
    
    accessoryTypes.push(selectedAccessory);

  }
  
  if (isDuplicate) {
    console.log("Cannot select two accessories of the same type.");
    return;
  }
  var totalStats = {
    power: 0,
    defense: 0,
    agility: 0,
    attackspeed: 0,
    attacksize: 0,
    intensity: 0
  };

  var selectedAccessory1 = $("#accessory1").val();
  if (selectedAccessory1) {
    $.getJSON("gearvalues/accessories.json", function(data) {
      var gear = data.accessories.find(g => g.name === selectedAccessory1);
      var enchant = $("#accessory1-enchant").val();
      totalStats = calculateStats(totalStats, gear, enchant);
      updateStats(totalStats);
    });
  }

  var selectedAccessory2 = $("#accessory2").val();
  if (selectedAccessory2) {
    $.getJSON("gearvalues/accessories.json", function(data) {
      var gear = data.accessories.find(g => g.name === selectedAccessory2);
      var enchant = $("#accessory2-enchant").val();
      totalStats = calculateStats(totalStats, gear, enchant);
      updateStats(totalStats);
    });
  }

  var selectedAccessory3 = $("#accessory3").val();
  if (selectedAccessory3) {
    $.getJSON("gearvalues/accessories.json", function(data) {
      var gear = data.accessories.find(g => g.name === selectedAccessory3);
      var enchant = $("#accessory3-enchant").val();
      totalStats = calculateStats(totalStats, gear, enchant);
      updateStats(totalStats);
    });
  }

  var selectedChestpiece = $("#chestpiece").val();
  if (selectedChestpiece) {
    $.getJSON("gearvalues/chestpiece.json", function(data) {
      var gear = data.chestpiece.find(g => g.name === selectedChestpiece);
      var enchant = $("#chestpiece-enchant").val();
      totalStats = calculateStats(totalStats, gear, enchant);
      updateStats(totalStats);
    });
  }

  var selectedPants = $("#pants").val();
  if (selectedPants) {
    $.getJSON("gearvalues/pants.json", function(data) {
      var gear = data.pants.find(g => g.name === selectedPants);
      var enchant = $("#pants-enchant").val();
      totalStats = calculateStats(totalStats, gear, enchant);
      updateStats(totalStats);
    });
  }
}


function calculateStats(totalStats, gear, enchant) {
  var levelmultiplier = gear.levelmultiplier || 0;
  var enchantMultiplier = getEnchantMultiplier(enchant);

  var power = gear.power || 0;
  var defense = gear.defense || 0;
  var agility = gear.agility || 0;
  var attackspeed = gear.attackspeed || 0;
  var attacksize = gear.attacksize || 0;
  var intensity = gear.intensity || 0;

  totalStats.power += Math.floor((power + (enchantMultiplier["power"] * levelmultiplier)));
  totalStats.defense += Math.floor((defense + (enchantMultiplier["defense"] * levelmultiplier)));
  totalStats.agility += Math.floor((agility + (enchantMultiplier["agility"] * levelmultiplier)));
  totalStats.attackspeed += Math.floor((attackspeed + (enchantMultiplier["attackspeed"] * levelmultiplier)));
  totalStats.attacksize += Math.floor((attacksize + (enchantMultiplier["attacksize"] * levelmultiplier)));
  totalStats.intensity += Math.floor((intensity + (enchantMultiplier["intensity"] * levelmultiplier)));

  return totalStats;
}

function getEnchantMultiplier(enchant) {
  switch (enchant) {
    case "strong":
      return { power: 0.65, defense: 0, agility: 0, attackspeed: 0, attacksize: 0, intensity: 0 };
    case "hard":
      return { power: 0, defense: 6, agility: 0, attackspeed: 0, attacksize: 0, intensity: 0 };
    case "nimble":
      return { power: 0, defense: 0, agility: 1.5, attackspeed: 0, attacksize: 0, intensity: 0 };
    case "amplified":
      return { power: 0, defense: 0, agility: 0, attackspeed: 0, attacksize: 0, intensity: 1.5 };
    case "bursting":
      return { power: 0, defense: 0, agility: 0, attackspeed: 0, attacksize: 1.5, intensity: 0 };
    case "swift":
      return { power: 0, defense: 0, agility: 0, attackspeed: 1.5, attacksize: 0, intensity: 0 };
    case "none":
      return { power: 0, defense: 0, agility: 0, attackspeed: 0, attacksize: 0, intensity: 0 };
  }
}

function updateStats(stats) {
  $("#power").text(stats.power);
  $("#defense").text(stats.defense);
  $("#agility").text(stats.agility);
  $("#attackspeed").text(stats.attackspeed);
  $("#attacksize").text(stats.attacksize);
  $("#intensity").text(stats.intensity);
}
