import type { ArmorItemData, ItemStats } from "$lib/itemTypes";

export function getAtlanteanStat(stats : ItemStats) : string | boolean{


    const atlantenOrder = ['power', 'defense', 'attackSize', 'attackSpeed', 'agility', 'intensity'];


    //Calculations for Atlantean
    for (const currentAttribute of atlantenOrder) {
        console.log(currentAttribute);
        if (tempItem[currentAttribute] == 0) {
            return currentAttribute;
       
        }
    }
    // Only happens when all of them have a value so hence the loop around
    return "power";
} else {
 return false;
}

}