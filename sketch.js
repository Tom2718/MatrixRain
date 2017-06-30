var txtSize = 30;
var txtSpeed = 6;
var changeRate = 15;
var streams;


function setup() {
	createCanvas(innerWidth,innerHeight);
	background(0);
	textSize(txtSize);

	streams = [];
	for (q = 0; q<innerWidth/txtSize; q++){
		nxtStream = new Stream(round(random(0.3*innerHeight/txtSize,innerHeight/txtSize)), q*txtSize, txtSize*round(random(0,20)));
		streams.push(nxtStream);
	}

}

function draw() {
	background(0);

	//DAMNNNNNNN Ternary operator for whooo!
	//assignment = (comparison) ? if_true_val : if_false_val;
	// symbol.y =  symbol.y>innerHeight ? 0 : symbol.y+2;
	// if (symbol.y>innerHeight){
	// 	symbol.y = 0;
	// } else{
	// 	symbol.y += txtSpeed;
	// }

	//Damn... Some nested for eaches
	streams.forEach(function(nxtStream){
		isFirst = true;
		nxtStream.stream.forEach(function(item){

			if (frameCount%changeRate == 0){
				item.genSymbol();
			}
			item.y =  item.y>innerHeight ? 0 : item.y+2;
			item.render(isFirst);
			isFirst = false;
		});
	});
}

function Symbol(x, y){
	this.x = x;
	this.y = y;
	this.value;

	this.genSymbol = function(){
		this.value = String.fromCharCode(0x30A0 + round(random(0,96)));
	}

	this.render = function(first){
		this.first = first;

		if (this.first){
			fill(180,255,180);
		}else{
			fill(0,255,100);
		}
		text(this.value, this.x, this.y);
	}
}

function Stream(len, xPos, yPos){
	this.stream = [];

	for (i = 0; i < len; i ++){
		symbol = new Symbol(xPos,(-txtSize)*i + yPos);
		symbol.genSymbol();
		this.stream.push(symbol);
	}
}
