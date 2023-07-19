export const DataTools = {
  generateRandomNumberString: function(count){
    var randomNumberString = "";
    
    for (var i = 0; i < count; i++) {
      var randomNumber = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
      randomNumberString += randomNumber.toString(); // Append the random number to the string
    }
    
    return randomNumberString;
  },
  getInventoryContainersArray: function(inventoryObj){
    if(inventoryObj){
      return Object.keys(inventoryObj);
    }
  },
  getContainerOptions: function(inventoryObj){
    let arr = [];
    let containerArr = this.getInventoryContainersArray(inventoryObj)
    containerArr.forEach(element => {
      let obj = {}
      obj['label'] = element;
      obj['value'] = element;
      arr.push(obj);
    });
    return arr;
  }

}