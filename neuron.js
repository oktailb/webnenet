var neuronjs;

if (typeof neuronjs == 'undefined')
{
    neuronjs = true;
    console.log("neuron.js");

    function identity(z, neuron)
    {
	return (z);
    }

    function relu(z, neuron)
    {
	if (z < 0)
	    return 0;
	else
	    return (z);
    }

    function tanh(z, neuron)
    {
	return math.tanh(z, neuron);
    }
    
    function atan(z)
    {
	return math.atan(z, neuron);
    }

    function smht(z, neuron)
    {
	let a = neuron.activationParams[0];
	let b = neuron.activationParams[1];
	let c = neuron.activationParams[2];
	let d = neuron.activationParams[3];
	return (((math.exp(a * z)) - (math.exp(-b * z))) / ((math.exp(c * z)) + (math.exp(-d * z))));
    }
    
    function heaviside(z, neuron)
    {
	if (z < 0)
	    return 0;
	else
	    return 1;
    }

    function sigmoid(z, neuron)
    {
	return (1.0 / (math.exp(-z) + 1.0));
    }

    function gelu(z, neuron)
    {
	return ( (z / 2.0) * (1.0 + math.erf(z / math.sqrt(2.0))) );
    }
    
    function softplus(z, neuron)
    {
	return math.log(1.0 + math.exp(z));
    }

    function elu(z, neuron)
    {
	let alpha = neuron.activationParams[0];
	if (z < 0)
	    return (alpha * (math.exp(z) - 1.0));
	else
	    return z;
    }

    function selu(z, neuron)
    {
	let alpha = 1.67326;
	let lambda = 1.0507;
	if (z < 0)
	    return lambda * (alpha * (math.exp(z) - 1.0));
	else
	    return lambda * z;
    }

    function leakyrelu(z, neuron)
    {
	if (z < 0)
	    return 0.01 * z;
	else
	    return z;
    }

    function prelu(z, neuron)
    {
	let alpha = neuron.activationParams[0];
	if (z < 0)
	    return alpha * z;
	else
	    return z;
    }

    function silu(z, neuron)
    {
	return (z / (1.0 + math.exp(-z)));
    }

    function gaussian(z, neuron)
    {
	return (math.exp(-(z * z)));
    }
    
    function sep(z, neuron)
    {
	let alpha = neuron.activationParams[0];
	if (alpha < 0)
	{
	    return (math.log(1 - alpha * (z + alpha)) / alpha);
	}
	else if (alpha == 0.0)
	{
	    return z;
	}
	else
	{
	    return ( ( (math.exp(alpha * z) - 1.0) / alpha ) + alpha );
	}
    }

    function sin(z, neuron)
    {
	return (math.sin(z));
    }
    
    function csin(z, neuron)
    {
	if (z == 0.0)
	    return 1.0;
	else
	    return (math.sin(z) / z);
    }
    
    function getRandomInt(min, max)
    {
	return math.floor(min + math.random() * (max - min));
    }

    function getRandomFloat(min, max)
    {
	return min + math.random() * (max - min);
    }

    class Neuron {
	constructor(name, activation) {
	    this.name = name;
	    this.activation = activation;
	    this.inputs = new Array();
	    this.oldInputs = new Array();
	    this.outVal = 0.0;
	    this.preActivation = 0.0;
	    this.oldBias = getRandomFloat(-1.0, 1.0);
	    this.bias = getRandomFloat(-1.0, 1.0);
	    this.activationParams = new Array();
	    this.back = 1.0;
	    this.x = 0;
	    this.y = 0;
	}

	mutate()
	{
	    let changeFactor = getRandomInt(0, this.inputs.size);
	    if (changeFactor == 0)
		this.bias += changeFactor;
	    else
	    {
		let variation = 2.0 * math.random() + 1.0;
		this.inputs[changeFactor - 1][1] += variation;
	    }
	}

	learn(target)
	{
	    this.back = (target / this.output);
	    this.backPropagate();
	}

	backPropagate()
	{
	    let len = this.inputs.length;
	    
	    for (let i = 0; i < len; i++)
	    {
		if (typeof this.inputs[i][0] == 'object')
		    this.inputs[i][0].learn(this.back / this.inputs[i][1]);
	    }
	}
	
	forget(){
	    this.bias = this.oldBias;
	    this.inputs = this.oldInputs;
	}

	remember(){
	    this.oldBias = this.bias;
	    this.oldInputs = this.inputs;
	}

	addInput(value, factor) {
	    this.inputs.push([value, factor]);
	}
	
	// Method
	compute() {
	    let len = this.inputs.length;
	    
	    let total = 0;
	    for (let i = 0; i < len; i++)
	    {
		if (typeof this.inputs[i][0] == 'object')
		    total += this.inputs[i][0].output() * this.inputs[i][1];
		else if (typeof this.inputs[i][0] == 'function')
		    total += this.inputs[i][0]() * this.inputs[i][1];
		else
		    total += this.inputs[i][0] * this.inputs[i][1];
	    }
	    this.preActivation = total + this.bias;
	    this.outVal = this.activation(this.preActivation, this);
	}
	
	output() {
	    return this.outVal;
	}

	drawNeuron(ctx, scale) {
            const radius = 50 * scale;
	    
            // Drawing neuron circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff'; // Neuron background color
            ctx.fill();
            ctx.strokeStyle = '#000000'; // Neuron border color

            // Drawing bias
            const textSize = 12 * scale;
            // Drawing neuron output value
            ctx.fillStyle = '#000000'; // Output text color
            ctx.font = `${textSize}px Arial`;
	    var prefix = "";
	    if (this.bias > 0)
		prefix = "+";
            ctx.fillText(`${prefix}${this.bias.toFixed(2)}`, this.x + 5 * scale, this.y + textSize / 2);
            ctx.font = `${textSize*4}px Arial`;
//          σ;
            ctx.fillText(`Σ`, this.x - 35 * scale, this.y + 3*textSize / 2);
	    ctx.moveTo(this.x, this.y - 50);
	    ctx.lineTo(this.x, this.y + 50);
            ctx.stroke();
	}
	
	// Function to draw the neuron output and bias
	drawOutput(ctx, scale) {
            const textSize = 16 * scale;
	    
            // Drawing neuron output value
            ctx.fillStyle = '#000000'; // Output text color
            ctx.font = `${textSize}px Arial`;
	    var prefix = "";
	    if (this.outVal > 0)
		prefix = "+";
            ctx.fillText(`${prefix}${this.outVal.toFixed(2)}`, this.x + 60 * scale, this.y + textSize / 2);
	    this.drawConnector(ctx, this.x + 140 * scale, this.y, scale);
	}
	

	// Function to draw neuron inputs, connectors, and weights
	drawInputs(ctx, scale) {
            const textSize = 16 * scale;
            const startX = this.x - 100 * scale;
            const startY = this.y - (this.inputs.length - 1) * 50 * scale;

            for (let i = 0; i < this.inputs.length; i++) {
		const inputY = startY + i * 100 * scale;
		const weight = this.inputs[i][1];
		
		// Draw connector symbol
		this.drawConnector(ctx, startX, inputY, scale);
		
		// Drawing line from input to neuron
		this.drawInputLine(ctx, startX, inputY, this.x, this.y, weight, scale);
		
		// Drawing weight label
		ctx.fillStyle = '#000000'; // Weight label color
		ctx.font = `${textSize}px Arial`;
		ctx.fillText(weight.toFixed(2), startX + 20 * scale, inputY + 10 * scale);
		if (typeof this.inputs[i][0] == "object")
		{
		    ctx.strokeStyle = (this.inputs[i][0].outVal >= 0) ? '#00ff00' : '#ff0000'; // Green for positive weight, red for negative
		    ctx.lineWidth = Math.abs(this.inputs[i][0].outVal) * 5 * scale;
		    ctx.moveTo(startX - 20 * scale, inputY);
		    ctx.lineTo(this.inputs[i][0].x + 120 * scale,  this.inputs[i][0].y);
		    ctx.stroke();
		}
            }
	}
	
	// Function to draw connector symbol
	drawConnector(ctx, x, y, scale) {
            ctx.beginPath();
            ctx.arc(x - 20 * scale, y, 5 * scale, 0, 2 * Math.PI);
            ctx.fillStyle = '#000000'; // Connector color
            ctx.fill();
	}

	// Function to draw line from input to neuron
	drawInputLine(ctx, startX, startY, neuronX, neuronY, weight, scale) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(neuronX - 50 * scale, neuronY);
            ctx.strokeStyle = (weight >= 0) ? '#00ff00' : '#ff0000'; // Green for positive weight, red for negative
            ctx.lineWidth = Math.abs(weight) * 5 * scale;
	    
            ctx.stroke();
	}

	// Combined draw function to render the neuron
	draw(ctx, x, y, scale = 1.0) {
	    this.x = x;
	    this.y = y;
            this.drawNeuron(ctx, scale);
            this.drawOutput(ctx, scale);
            this.drawInputs(ctx, scale);
	}
    }

    function initNeuronsFromJSON(jsonConfig)
    {
	var neuronsByName = {};
	jsonConfig.neurons.forEach((neuronConfig, index) => {
	    const activationFunc = neuronConfig.activation;
	    const name = neuronConfig.name;
	    const neuron = new Neuron(name, activationFunc);
	    neuronsByName[name] = neuron;
	    neuron.x = neuronConfig.x;
	    neuron.y = neuronConfig.y;
	    if (neuronConfig.bias !== undefined) {
		neuron.bias = neuronConfig.bias;
	    }
	    
	    if (neuronConfig.activationParams) {
		neuron.activationParams = neuronConfig.activationParams;
	    }
	    
	    neuronConfig.inputs.forEach(input => {
		let value;
		if (typeof input.value === 'string') {
		    value = neuronsByName[input.value];
		} else if (typeof input.value === "function") {
			value = input.value;
		} else {
			value = input.value;
		}
		neuron.addInput(value, input.factor);
	    });
	    
	});
	
	return neuronsByName;
    }
	
    function initNeuron(brain)
    {    
	var editor =  document.getElementById("neuronEditor");
	var parameters =  document.getElementById("neuronParameters");
	var log =  document.getElementById("neuronLog");

	var input = document.createElement("textarea");
	input.name = "post";
	input.maxLength = "5000";
	input.cols = "80";
	input.rows = "20";
	parameters.appendChild(input); //appendChild
	input.value += "INSERT JSON HERE";
	
	var pre = document.createElement("pre");
	log.appendChild(pre);
	log = pre;
	log.innerHTML += "LOG\n";
	
	var canvas = document.createElement("canvas");
	canvas.id = "neuronVisualisator";
	canvas.width = getWidth() - 10;
	canvas.height = getHeight() / 2;
	editor.appendChild(canvas);
	
	var ctx = canvas.getContext("2d");

	var neurons = initNeuronsFromJSON(brain);

	for (var name in neurons)
	    neurons[name].compute();
	
	for (var name in neurons)
	{
	    var neuron = neurons[name];
	    neuron.draw(ctx, neuron.x, neuron.y);
	}
	
	/*
	  neurons[1].learn(42.0);
	  neurons[1].backPropagate();
	  neurons[0].compute();
	  neurons[1].compute();
	*/
    }
}
