// activation.js
// ========

const math = require("mathjs");

module.exports = {
  identity: function(z, neuron) {
    return z;
  },

  relu: function(z, neuron) {
    if (z < 0) return 0;
    else return z;
  },

  tanh: function(z, neuron) {
    return math.tanh(z);
  },

  atan: function(z, neuron) {
    return math.atan(z);
  },

  smht: function(z, neuron) {
    let a = neuron.activationParams[0];
    let b = neuron.activationParams[1];
    let c = neuron.activationParams[2];
    let d = neuron.activationParams[3];
    return (
      (math.exp(a * z) - math.exp(-b * z)) /
      (math.exp(c * z) + math.exp(-d * z))
    );
  },

  heaviside: function(z, neuron) {
    if (z < 0) return 0;
    else return 1;
  },

  sigmoid: function(z, neuron) {
    return 1.0 / (math.exp(-z) + 1.0);
  },

  gelu: function(z, neuron) {
    return z / 2.0 * (1.0 + math.erf(z / math.sqrt(2.0)));
  },

  softplus: function(z, neuron) {
    return math.log(1.0 + math.exp(z));
  },

  elu: function(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (z < 0) return alpha * (math.exp(z) - 1.0);
    else return z;
  },

  selu: function(z, neuron) {
    let alpha = 1.67326;
    let lambda = 1.0507;
    if (z < 0) return lambda * (alpha * (math.exp(z) - 1.0));
    else return lambda * z;
  },

  leakyrelu: function(z, neuron) {
    if (z < 0) return 0.01 * z;
    else return z;
  },

  prelu: function(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (z < 0) return alpha * z;
    else return z;
  },

  silu: function(z, neuron) {
    return z / (1.0 + math.exp(-z));
  },

  gaussian: function(z, neuron) {
    return math.exp(-(z * z));
  },

  sep: function(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (alpha < 0) {
      return math.log(1 - alpha * (z + alpha)) / alpha;
    } else if (alpha == 0.0) {
      return z;
    } else {
      return (math.exp(alpha * z) - 1.0) / alpha + alpha;
    }
  },

  sin: function(z, neuron) {
    return math.sin(z);
  },

  csin: function(z, neuron) {
    if (z == 0.0) return 1.0;
    else return math.sin(z) / z;
  },

  identityD: function(z, neuron) {
    return 1;
  },

  reluD: function(z, neuron) {
    return z < 0 ? 0 : 1;
  },

  tanhD: function(z, neuron) {
    return 1 - Math.pow(Math.tanh(z), 2);
  },

  atanD: function(z, neuron) {
    return 1 / (1 + Math.pow(z, 2));
  },

  smhtD: function(z, neuron) {
    let a = neuron.activationParams[0];
    let b = neuron.activationParams[1];
    let c = neuron.activationParams[2];
    let d = neuron.activationParams[3];
    let expAz = Math.exp(a * z);
    let expBz = Math.exp(-b * z);
    let expCz = Math.exp(c * z);
    let expDz = Math.exp(-d * z);
    let numerator =
      (a * expAz + b * expBz) * (expCz + expDz) -
      (expAz - expBz) * (c * expCz + d * expDz);
    let denominator = Math.pow(expCz + expDz, 2);
    return numerator / denominator;
  },

  heavisideD: function(z, neuron) {
    return 0; // La d�riv�e de Heaviside est 0 partout sauf en z = 0 o� elle est ind�finie
  },

  sigmoidD: function(z, neuron) {
    let sigmoid = 1.0 / (math.exp(-z) + 1.0);
    return sigmoid * (1 - sigmoid);
  },

  geluD: function(z, neuron) {
    let sqrt2 = Math.sqrt(2.0);
    let erfComponent = math.erf(z / sqrt2);
    let expComponent = math.exp(-Math.pow(z, 2) / 2);
    return (
      0.5 * (1 + erfComponent) + z * expComponent / (sqrt2 * Math.sqrt(Math.PI))
    );
  },

  softplusD: function(z, neuron) {
    return 1.0 / (1.0 + Math.exp(-z));
  },

  eluD: function(z, neuron) {
    let alpha = neuron.activationParams[0];
    return z < 0 ? alpha * Math.exp(z) : 1;
  },

  seluD: function(z, neuron) {
    let alpha = 1.67326;
    let lambda = 1.0507;
    return z < 0 ? lambda * alpha * Math.exp(z) : lambda;
  },

  leakyreluD: function(z, neuron) {
    return z < 0 ? 0.01 : 1;
  },

  preluD: function(z, neuron) {
    let alpha = neuron.activationParams[0];
    return z < 0 ? alpha : 1;
  },

  siluD: function(z, neuron) {
    let sigmoid = 1.0 / (Math.exp(-z) + 1.0);
    return sigmoid * (1 + z * (1 - sigmoid));
  },

  gaussianD: function(z, neuron) {
    return -2 * z * Math.exp(-(z * z));
  },

  sepD: function(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (alpha < 0) {
      return 1 / (1 - alpha * (z + alpha));
    } else if (alpha == 0.0) {
      return 1;
    } else {
      return Math.exp(alpha * z);
    }
  },

  sinD: function(z, neuron) {
    return Math.cos(z);
  },

  csinD: function(z, neuron) {
    if (z == 0.0) return 0.0;
    return (Math.cos(z) * z - Math.sin(z)) / (z * z);
  },

  activationD: function(name, z, neuron) {
    toD = {
      identity: this.identityD,
      relu: this.reluD,
      tanh: this.tanhD,
      atan: this.atanD,
      smht: this.smhtD,
      heaviside: this.heavisideD,
      sigmoid: this.sigmoidD,
      gelu: this.geluD,
      softplus: this.softplusD,
      elu: this.eluD,
      selu: this.seluD,
      leakyrelu: this.leakyreluD,
      prelu: this.preluD,
      silu: this.siluD,
      gaussian: this.gaussianD,
      sep: this.sepD,
      sin: this.sinD,
      csin: this.csinD
    };
    return toD[name](z, neuron);
  }
};
