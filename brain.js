var brainjs;

if (typeof brainjs == "undefined") {
  brainjs = true;
  console.log("brain.js");

  class Brain {
    constructor(jsonConfig) {
      this.prediction = jsonConfig.prediction;
      this.neurons = {};
	  this.ready = false;
		this.initInputsFromJSON(jsonConfig).then(() => {
		  this.initNeuronsFromJSON(jsonConfig, this.neurons);
  	 	  this.layersDim = {};
		  for (var index = 0; index <= this.neurons["OUTPUT"].getLayer(); index++)
			this.layersDim[index] = [0, 0];
		  for (var name in this.neurons)
			this.layersDim[this.neurons[name].layer][0]++;
		  this.ready = true;
		});
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
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const imagePromises = jsonConfig.inputs
    .filter(inputConfig => inputConfig.type === "img")
    .map(inputConfig => loadImage(inputConfig.data).then(img => ({ img, inputConfig })));

  return Promise.all(imagePromises)
    .then(results => {
      results.forEach(({ img, inputConfig }) => {
        const prefix = inputConfig.neuronprefix;
        const activationFunc = inputConfig.activation;
        
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        
        let imgData = ctx.getImageData(0, 0, img.width, img.height);
        
        for (let x = 0; x < img.width; x++) {
          for (let y = 0; y < img.height; y++) {
            let name = `${prefix}_${x}_${y}`;
            let neuron = initNeuron(name, activationFunc);
            this.neurons[name] = neuron;
            let pixelIndex = (y * img.width + x) * 4;
            neuron.addInput(imgData.data[pixelIndex], 1.0);
            neuron.addInput(imgData.data[pixelIndex + 1], 1.0);
            neuron.addInput(imgData.data[pixelIndex + 2], 1.0);
            neuron.addInput(imgData.data[pixelIndex + 3], 1.0);
            neuron.bias = 0.0;
			neuron.layer = 1;
            neuron.activationParams = inputConfig.activationParams;
          }
        }
      });
    })
    .catch(error => {
      console.error("Error loading images:", error);
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
