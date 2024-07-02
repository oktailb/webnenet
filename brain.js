var brainjs;

if (typeof brainjs == "undefined") {
  brainjs = true;
  console.log("brain.js");

  class Brain {
    constructor(jsonConfig) {
      this.prediction = jsonConfig.prediction;
      this.neurons = {};

      this.initInputsFromJSON(jsonConfig, this.neurons);
      //console.log(this.getSize());
      this.initNeuronsFromJSON(jsonConfig, this.neurons);
      //console.log(this.getSize());

      this.layersDim = {};
      for (var index = 0; index <= this.neurons["OUTPUT"].getLayer(); index++)
        this.layersDim[index] = [0, 0];
      for (var name in this.neurons) {
        this.layersDim[this.neurons[name].layer][0]++;
      }
    }

    getSize() {
      var size = 0;
      for (var name in this.neurons) size++;
      return size;
    }

    mutate() {
      for (var name in this.neurons) this.neurons[name].mutate();
    }

    learn() {
      this.neurons["OUTPUT"].learn(brain.prediction);
    }

    backPropagate() {
      this.neurons["OUTPUT"].backPropagate();
    }

    compute() {
      for (var name in this.neurons) this.neurons[name].compute();
    }

    draw(canvas, scale = 1.0) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var layersDimCopy = this.layersDim;
      for (var name in this.neurons)
        this.neurons[name].draw(
          ctx,
          scale,
          layersDimCopy[this.neurons[name].layer][0]--
        );
    }
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    initInputsFromJSON(jsonConfig) {
      jsonConfig.inputs.forEach((inputConfig, index) => {
        if (inputConfig.type === "img") {
          var filename = inputConfig.data;
          var prefix = inputConfig.neuronprefix;
          var activationFunc = inputConfig.activation;
          var img = new Image();

          console.log(img.complete);
          img.onload = function() {};
          img.src = filename;
          console.log(img.complete);

          /*          while (!img.complete) {
            console.log(img.complete);
            this.sleep(10);
          }

          var canvas = document.getElementById("secondaryCanvas");
          var ctx = canvas.getContext("2d");
          var imgData = ctx.getImageData(0, 0, img.width, img.height);
          for (var x = 0; x < img.width; x++) {
            for (var y = 0; y < img.height; y++) {
              var name = prefix + "_" + x + "_" + y;
              var neuron = initNeuron(name, activationFunc);
              this.neurons[name] = neuron;
              neuron.addInput(imgData.data[4 * img.width * y + x * 4 + 0], 1.0);
              neuron.addInput(imgData.data[4 * img.width * y + x * 4 + 1], 1.0);
              neuron.addInput(imgData.data[4 * img.width * y + x * 4 + 2], 1.0);
              neuron.addInput(imgData.data[4 * img.width * y + x * 4 + 3], 1.0);
              neuron.bias = 0.0;
              neuron.activationParams = inputConfig.activationParams;
            }
          }
          */
        }
      });
    }

    initNeuronsFromJSON(jsonConfig) {
      jsonConfig.neurons.forEach((neuronConfig, index) => {
        const activationFunc = neuronConfig.activation;
        const name = neuronConfig.name;
        const neuron = new initNeuron(name, activationFunc);
        this.neurons[name] = neuron;
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
          if (typeof input.value === "string") {
            value = this.neurons[input.value];
          } else if (typeof input.value === "function") {
            value = input.value;
          } else {
            value = input.value;
          }
          neuron.addInput(value, input.factor);
        });
      });
    }

    getLayerSize(neurons, layer) {
      var size = 0;
      for (var name in neurons) {
        if (neurons[name].layer == layer) size++;
      }
      return size;
    }
  }

  function initBrain(jsonConfig) {
    return new Brain(jsonConfig);
  }
}
