var BrnFkr=(function(){

   function _exec(input,options,I,O){
var loopstack=[];
var jumpstack=0;
var mem=[];
var ptr=0;
var maxmem=options.cells;
var cellmax=(1<<options.cellsize)-1;
for(var i=0;i<maxmem;i++){
   mem[i]=0;
}
function incptr(){
    ptr = (ptr+1)%maxmem;   
}
function decptr(){
    ptr = (ptr + maxmem-1)%maxmem;
}
function incv(){

    mem[ptr] = (mem[ptr]+1)%cellmax;
//   console.log(mem[ptr]);
}
function decv(){
    mem[ptr]=(mem[ptr]+cellmax-1)%cellmax;
 //  console.log(mem[ptr]);
}

for(var i=0;i<input.length;){
//   console.log([mem[0],mem[1],mem[2],mem[3],i,input[i],ptr]);
    switch(input[i]){
         case ">":
             incptr();i++;
         break;
         case "<":
              decptr();i++;
          break;
         case "." :
              O.write(String.fromCharCode(mem[ptr]));i++;
          break;
         case ",":
              mem[ptr]=I.read().charCodeAt(0)&cellmax;i++;
          break;
         case "-":
              decv();i++;
          break;
         case "+":
              incv();i++;
          break;
         case "[":
          if(mem[ptr]==0){
            // jump past matching ]
             jumpstack=0;
             jumpstack++;i++;
              while(jumpstack>0){
                  if(input.charAt(i)=="["){
                       jumpstack++;
                  } else if(input.charAt(i)=="]"){
                       jumpstack--;
                  }
                   i++;
              }
          } else {
            loopstack.push(i);
	    i++;
          } 
          break;
         case "]":
	   i = loopstack.pop();
          break;
         default: 
	  i++;
          break;
    }
   }
   }
   function mixin(trg,src){
       var ret = {};
	   for(var p in trg){
	        if(trg.hasOwnProperty(p)){
			     ret[p] = trg[p];
			}
	   }
	   
	    for(var p in src){
	        if(src.hasOwnProperty(p)){
			     ret[p] = src[p];
			}
	    }
	   
	   return ret;
   }
  
   var StringStream = function(str){
       this.str=str;
	   this.cnt=0;
   }
   StringStream.prototype.read=function(){
       return this.str.charAt(this.cnt++);
   }
   StringStream.prototype.write=function(ch){
       this.str+=ch;
   }
   StringStream.prototype.toString=function(){
       return this.str;
   }
   var _BF=function(){
       this.options={cells:30000,cellsize:8};
	   this.O = new StringStream("");
	   this.I = new StringStream("");
   };
   
   _BF.prototype.setIO=function(I,O){
        if(typeof I == "string"){
		    I = new StringStream(I);
		}
        this.I = I;
		this.O = O;
   };
   _BF.prototype.getIO=function(){
        return [this.I,this.O];
   };
   _BF.prototype.setOptions=function(obj){
        this.options = obj;
    };
    _BF.prototype.getOptions=function(){
	      return this.options;
	};
   _BF.prototype.exec=function(input,options,I,O){
         if(typeof I == "string"){
		      I = new StringStream(I);
		 }
       _exec(input,mixin(this.options||{},options||{}),I||this.I,O||this.O);
   };
   
    return _BF;
   
})();
if(module){
	module.exports= BrnFkr;
}
