var math = require("mathjs");
var activation = require("./activation");

module.exports = class Neuron {
  constructor(name, activation, type) {
    this.name = name;
    this.activation = activation;
    this.inputs = new Array();
    this.weights = new Array();
    this.outVal = 0.0;
    this.outTarget = 0.0;
    this.preActivation = 0.0;
    this.bias = this.getRandomFloat(-1.0, 1.0);
    this.activationParams = new Array();
    this.x = 0;
    this.y = 0;
    this.layer = 0;
    this.type = type; // RNN LSTM HighwayNetwork ...
    if (type != "" && type != undefined) console.log(type);
  }

  getRandomInt(from, to) {
    return math.floor(from + math.random() * (to - from));
  }

  getRandomFloat(from, to) {
    return from + math.random() * (to - from);
  }

  forward() {
    let len = this.inputs.length;

    let total = 0;
    if (this.type == "RNN") total += this.outVal;

    for (let i = 0; i < len; i++) {
      if (typeof this.inputs[i] == "object")
        total += this.inputs[i].output() * this.weights[i];
      else if (typeof this.inputs[i] == "function")
        total += this.inputs[i]() * this.weights[i];
      else total += this.inputs[i] * this.weights[i];
    }
    this.preActivation = total + this.bias;
    this.outVal = this.activation(this.preActivation, this);
    this.calculateBackPropValue();
  }

  calculateBackPropValue() {
    const outputError = this.output - this.target; // Erreur de sortie
    const delta =
      outputError *
      activation.activationD(this.activation.name, this.preActivation, this);

    this.backPropValue =
      delta +
      (this.nextBackPropValue || 0) *
        this.weights.reduce((sum, w) => sum + w, 0);
  }

  updateWeights() {
    this.calculateBackPropValue();

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] -=
        this.learningRate * this.backPropValue * this.inputs[i];
    }

    this.bias -= this.learningRate * this.backPropValue;
  }

  mutate() {
    let changeFactor = getRandomInt(0, this.weights.size);
    if (changeFactor == 0) this.bias += changeFactor;
    else {
      let variation = 2.0 * math.random() + 1.0;
      this.weights[changeFactor - 1] += variation;
    }
  }

  addInput(input, weight) {
    this.inputs.push(input);
    this.weights.push(weight);
  }

  output() {
    return this.outVal;
  }

  // Helper function to get a random color
  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  plotActivationFunctions(ctx, scale, width, height) {
    // Draw axes
    let xshift = 60 * scale;
    let yshift = -60 * scale;
    ctx.beginPath();
    let prevX, prevY;
    ctx.moveTo(width / 2 + this.x + xshift, 0 + this.y + yshift);
    ctx.lineTo(width / 2 + this.x + xshift, height + this.y + yshift);
    ctx.moveTo(0 + this.x + xshift, height / 2 + this.y + yshift);
    ctx.lineTo(width + this.x + xshift, height / 2 + this.y + yshift);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    let from = -5;
    let to = 5;
    let step = 0.01;
    ctx.beginPath();
    for (let i = from; i <= to; i += step) {
      let x = i;
      let y = this.activation(x, this);
      if (y < from || y > to) ctx.strokeStyle = "#fff";
      else ctx.strokeStyle = "#f00";
      x *= width / (10 * scale);
      y *= height / (10 * scale);
      const canvasX = width / 2 + x * scale + this.x + xshift;
      const canvasY = height / 2 - y * scale + this.y + yshift;
      if (i === from) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();
      }
      prevX = canvasX;
      prevY = canvasY;
    }
    let textSize = 4 * scale;
    ctx.font = `${textSize * 4}px Arial`;
    ctx.fillText(
      this.activation.name,
      this.x + xshift + 4 * textSize / 2,
      this.y + yshift - 4 * textSize / 2
    );

    // Set different colors for each function
    ctx.strokeStyle = "#f00";
    ctx.stroke();
  }

  ySpacing = 50;
  xShift = 200;
  xSpacing = 350;

  getLayer() {
    var max = 0;
    let len = this.inputs.length;

    for (let i = 0; i < len; i++) {
      if (typeof this.inputs[i] == "object")
        max = math.max(this.inputs[i].getLayer(), max);
    }
    this.layer = max + 1;
    return this.layer;
  }

  drawNeuron(ctx, scale, index = 0) {
    this.calculateBackPropValue();
    const radius = this.ySpacing * scale;
    const textSize = 12 * scale;

    const weightLabelColor = "#00f0000";
    const neuronBackgroundColor = "#ffffff";
    const neuronBorderColor = "#000000";
    const outputTextColor = "#000000";
    const backColor = "#ff0000";

    if (this.x === "auto" || this.x == undefined)
      this.x = (this.getLayer() * this.xSpacing - this.xShift) * scale;

    if (this.y === "auto" || this.y == undefined)
      this.y = this.ySpacing * index * scale * this.inputs.length;

    ctx.beginPath();

    ctx.fillStyle = weightLabelColor;
    ctx.font = `${textSize}px Arial`;
    ctx.fillText(this.name, this.x - textSize, this.y + 70 * scale);

    ctx.lineWidth = 2 * scale;
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = neuronBackgroundColor;
    ctx.fill();
    ctx.strokeStyle = neuronBorderColor;
    ctx.stroke();

    ctx.fillStyle = outputTextColor;
    ctx.font = `${textSize}px Arial`;
    var prefix = this.bias > 0 ? "+" : "";
    ctx.fillText(
      `${prefix}${this.bias.toFixed(2)}`,
      this.x + 5 * scale,
      this.y + textSize / 2
    );

    ctx.font = `${textSize * 4}px Arial`;
    ctx.fillText(`Σ`, this.x - 35 * scale, this.y + textSize / 2);
    ctx.font = `${textSize}px Arial`;
    ctx.fillText(
      this.preActivation.toFixed(2),
      this.x - textSize * 3,
      this.y + 4 * textSize / 2
    );

    ctx.moveTo(this.x, this.y - this.ySpacing * scale);
    ctx.lineTo(this.x, this.y + this.ySpacing * scale);
    ctx.stroke();

    this.plotActivationFunctions(ctx, scale, scale * 50, scale * 50);
    //RNN only ?
    const arrowRadius = radius * 0.707;
    const arrowStartAngle = Math.PI;
    const arrowEndAngle = 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y - arrowRadius,
      arrowRadius,
      arrowStartAngle,
      arrowEndAngle
    );
    ctx.strokeStyle = backColor; // Couleur de la flèche de rétropropagation
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    const arrowHeadSize = 10 * scale;
    const arrowX = this.x + arrowRadius * Math.cos(arrowStartAngle);
    const arrowY =
      this.y - arrowRadius + arrowRadius * Math.sin(arrowStartAngle);

    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - arrowHeadSize, arrowY - arrowHeadSize);
    ctx.lineTo(arrowX - arrowHeadSize, arrowY + arrowHeadSize);
    ctx.closePath();
    ctx.fillStyle = "#ff0000";
    ctx.fill();

    ctx.fillStyle = outputTextColor;
    ctx.font = `${textSize}px Arial`;
    ctx.fillText(
      this.backPropValue.toFixed(2),
      this.x - textSize,
      this.y - 2 * arrowRadius
    );
  }

  // Function to draw the neuron output and bias
  drawOutput(ctx, scale) {
    const textSize = 16 * scale;

    // Drawing neuron output value
    ctx.fillStyle = "#000000"; // Output text color
    ctx.font = `${textSize}px Arial`;
    var prefix = "";
    if (this.outVal > 0) prefix = "+";
    ctx.fillText(
      `${prefix}${this.outVal.toFixed(2)}`,
      this.x + 60 * scale,
      this.y + textSize / 2
    );
    this.drawConnector(ctx, this.x + 140 * scale, this.y, scale);
  }

  // Function to draw neuron inputs, connectors, and weights
  drawInputs(ctx, scale) {
    const textSize = 16 * scale;
    const startX = this.x - 100 * scale;
    const startY =
      this.y - (this.inputs.length - 1) * (this.ySpacing / 2) * scale;

    for (let i = 0; i < this.inputs.length; i++) {
      const inputY = startY + i * this.ySpacing * scale;
      const weight = this.weights[i];

      // Draw connector symbol
      this.drawConnector(ctx, startX, inputY, scale);

      // Drawing line from input to neuron
      this.drawInputLine(ctx, startX, inputY, this.x, this.y, weight, scale);

      //Draw input name near of the connector
      ctx.fillStyle = "#000000"; // Weight label color
      ctx.font = `${textSize}px Arial`;
      if (
        typeof this.inputs[i] === "function" ||
        typeof this.inputs[i] === "object"
      ) {
        ctx.fillText(
          this.inputs[i].name,
          startX - 40 * scale,
          inputY - 15 * scale
        );
      } else {
        ctx.fillText(this.inputs[i], startX - 40 * scale, inputY - 15 * scale);
      }

      // Drawing weight label
      ctx.fillStyle = "#000000";
      ctx.font = `${textSize}px Arial`;
      ctx.fillText(weight.toFixed(2), startX + 20 * scale, inputY + 10 * scale);
      if (typeof this.inputs[i] == "object") {
        ctx.strokeStyle = "#000000";
        if (this.inputs[i].outVal > 0.1) ctx.strokeStyle = "#00ff00";
        else if (this.inputs[i].outVal < -0.1) ctx.strokeStyle = "#ff0000";

        ctx.lineWidth = math.log(Math.abs(this.inputs[i].outVal) * 5 * scale);
        ctx.moveTo(startX - 20 * scale, inputY);
        ctx.lineTo(this.inputs[i].x + 120 * scale, this.inputs[i].y);
        ctx.stroke();
      }
    }
  }

  // Function to draw connector symbol
  drawConnector(ctx, x, y, scale) {
    ctx.beginPath();
    ctx.arc(x - 20 * scale, y, 5 * scale, 0, 2 * Math.PI);
    ctx.fillStyle = "#000000"; // Connector color
    ctx.fill();
  }

  // Function to draw line from input to neuron
  drawInputLine(ctx, startX, startY, neuronX, neuronY, weight, scale) {
    ctx.beginPath();
    ctx.moveTo(startX - 20, startY);
    ctx.lineTo(startX, startY);
    ctx.lineTo(neuronX - 50 * scale, neuronY);
    ctx.strokeStyle = weight >= 0 ? "#00ff00" : "#ff0000"; // Green for positive weight, red for negative
    ctx.lineWidth = math.log(Math.abs(weight) * 5 * scale);

    ctx.stroke();
  }

  // Combined draw function to render the neuron
  draw(ctx, scale = 1.0, index = 0) {
    this.drawNeuron(ctx, scale, index);
    this.drawOutput(ctx, scale);
    this.drawInputs(ctx, scale);
  }
};
