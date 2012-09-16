var BrnFkr = require("../core/brnfkr.js");

var inpsource = require("fs").readFileSync(process.argv[2]).toString();
var pos=0;
function inpter(){
	return "2*4".charAt(pos++);
}
var brnfkr = new BrnFkr()
brnfkr.exec(inpsource,{},{read:inpter});
console.log(brnfkr.getIO()[1].toString());
