const math = require("mathjs"); 

const answMat = [[1], [2], [3]]; 

const inv = math.inv([[1, 2, 4], [4, 5, 6], [1, 5, 2]])

console.log(math.multiply(inv, answMat)); 