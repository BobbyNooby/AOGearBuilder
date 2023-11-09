// gets data for each item group - was made to automatically populate the item imageId with the statically github stored versions 
export function getData(itemData) {
	let final = [];

    // loop over each item in each group
	for (let item of itemData) {
		// for picking the right none image
		if (item.id == 0) {
			item.mainType = itemData[1].mainType;
		}

        // creates the imageId link
		item.imageId = 'assets/images/'+item.mainType.toLowerCase()+'/'+item.id.toString()+'.'+item.imageId.split(".").at(-1);

		if (item.id == 0) {
			item.mainType = "None";
		}

        // pushes item to the final array to be returned
		final.push(item);
	}

	return final;
}