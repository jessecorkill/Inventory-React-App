  //Function to allow child components to add new changes to inventory.     



//Function to setup faux environment
const configEnv = (inventoryUpdate, inventoryHistory, itemChange, returnWhat) => {

    let newInventory = { ...inventoryUpdate };
    let containerKey = itemChange.container; // Eg. 'Truck A' 
    if(!newInventory[containerKey]){
      newInventory[containerKey] = {items:[]} //Initiate container array if it doesn't exist
    }
    newInventory[containerKey]['items'].push(itemChange); // Make a new version of the inventory change index w/ the new item change object added.
    let lastElement = inventoryHistory[inventoryHistory.length - 1];
    if(lastElement !== newInventory || inventoryHistory.length == 0){ // Ensure that this isn't a re-run of the same item.
      inventoryUpdate = newInventory; // May be overwriting existing inventoryUpdate instead of appending to it.
      
      let tempHistory = inventoryHistory;
      tempHistory.push(newInventory);
      let newHistory = tempHistory;
      inventoryHistory = newHistory; 
    }
    else{
      return "Ran more than one time."
    } 

    if(returnWhat = 'inventoryUpdate'){
      return inventoryUpdate;
    }




}

////Test if aIC adds new itemChange to inventory.
const configOne = () => {
  let fauxChange = {
    "itemID":"1234567890",
    "container": "Container A",
    "count": "3"
  }

  return configEnv({}, [], fauxChange, 'inventoryUpdate')
}


test('aIC adds new itemChange to inventory', () => {
  expect(configOne()["Container A"].items[0].itemID).toBe('1234567890');
})




const configTwo = () => {
  let fauxChange = {
    "itemID":"0987654321",
    "container": "Container B",
    "count": "2"
  }

  return configEnv(
    {
    "Container A": {
      "items": [
        {
        "itemID":"1234567890",
        "container": "Container A",
        "count": "3"
        }]
    }
  }, [], fauxChange, 'inventoryUpdate')
}

test('aIC adds second new itemChange to inventory without overwriting the old item', () => {
  expect(configTwo()["Container A"].items[0].itemID).toBe('1234567890');
})

test('aIC adds second new itemChange to inventory', () => {
  expect(configTwo()["Container B"].items[0].itemID).toBe('0987654321');
})




const configThree = () => {
  let fauxChange = {
    "itemID":"135711",
    "container": "Container C",
    "count": "1"
  }

  return configEnv(
    {
    "Container A": {
      "items": [
        {
        "itemID":"1234567890",
        "container": "Container A",
        "count": "3"
        }]
    },
    "Container B": {
      "items": [
        {
        "itemID":"0987654321",
        "container": "Container B",
        "count": "2"
        }]
    },

  }, [], fauxChange, 'inventoryUpdate')
}

test('aIC adds third new itemChange to inventory w/o loosing first change', () => {
  expect(configThree()["Container A"].items[0].itemID).toBe('1234567890');
})