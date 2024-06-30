var brainjs;

if (typeof brainjs == "undefined") {
  brainjs = true;
  console.log("brain.js");

  class Brain {
    constructor(jsonConfig) {
      this.prediction = jsonConfig.prediction;
      this.neurons = initNeuronsFromJSON(jsonConfig);
      this.layersDim = {};
      for (var index = 0; index <= this.neurons["OUTPUT"].getLayer(); index++)
        this.layersDim[index] = 0;
      for (var name in this.neurons) {
        this.layersDim[this.neurons[name].layer]++;
      }
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
          layersDimCopy[this.neurons[name].layer]--
        );
    }
  }

  function initNeuronsFromJSON(jsonConfig) {
    var neuronsByName = {};
    jsonConfig.neurons.forEach((neuronConfig, index) => {
      const activationFunc = neuronConfig.activation;
      const name = neuronConfig.name;
      const neuron = new initNeuron(name, activationFunc);
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
        if (typeof input.value === "string") {
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

  function getLayerSize(neurons, layer) {
    var size = 0;
    for (var name in neurons) {
      if (neurons[name].layer == layer) size++;
    }
    return size;
  }

  function initBrain(jsonConfig) {
    return new Brain(jsonConfig);
  }
}
