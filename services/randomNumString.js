export default function GenerateRandomNumberString(count) {
    var randomNumberString = "";
    
    for (var i = 0; i < count; i++) {
      var randomNumber = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
      randomNumberString += randomNumber.toString(); // Append the random number to the string
    }
    
    return randomNumberString;
  }