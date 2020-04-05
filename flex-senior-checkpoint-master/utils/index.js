// UTILITY FUNCTIONS

const utils = {};

utils.getInitials = (str = '') => {
  //your code here
  let resultArr = []
  resultArr = str.split(" ");
  console.log(resultArr);
  return resultArr.reduce((acc, word, currIdx) => {

    let firstLetter = word.slice(0,1).toUpperCase();
     acc = `${acc}${firstLetter}`;
     return acc;
  }, '')
}

utils.makeObjectFromArray = arr => {
  // INPUT arguments
  //   - A 1-dimensional array of key names followed by their values
  //     - example: ['name', 'R2-D2', 'home_planet', 'Tatooine']
  //
  // RETURN value
  //   - An object whose keys are the odd elements of the input array and whose values are the even elements of the input array
  //     - example: {name: 'R2-D2', home_planet: 'Tatooine'}
  //
  //your code here

  let objResult = {};
 
  for (let count = 0; count < arr.length; count++) {
 
    if(count%2 === 0){
    objResult[arr[count]] = arr[count+1];
    }
  }
 
 return objResult;
};

utils.generateGroups = (arr,num) => {
  // INPUT arguments
  //   - A 1-dimensional array
  //   - The length of each subgroup that should be created
  //
  // RETURN value
  //   - A 2-dimensional array of arrays. Each subarray should be as long as the length argument passed in to the function, except for the final subarray, which can be shorter and contain a "remainder" smaller than that length.
  //
  //your code here

  let arrResult =[]
  let arrToPush = []
  for(let i =0; i< arr.length;  i++) {
      arrToPush.push(arr[i])
    if(arrToPush.length === num) {
      arrResult.push(arrToPush);
      arrToPush = new Array();
      continue;
    }
      if(i === arr.length -1){
         arrResult.push(arrToPush)
       }
  }
return arrResult;
};

module.exports = utils;
