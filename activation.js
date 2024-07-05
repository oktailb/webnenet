var activationjs;

if (typeof activationjs == "undefined") {
  activationjs = true;
  console.log("activation.js");

  function identity(z, neuron) {
    return z;
  }

  function relu(z, neuron) {
    if (z < 0) return 0;
    else return z;
  }

  function tanh(z, neuron) {
    return math.tanh(z);
  }

  function atan(z, neuron) {
    return math.atan(z);
  }

  function smht(z, neuron) {
    let a = neuron.activationParams[0];
    let b = neuron.activationParams[1];
    let c = neuron.activationParams[2];
    let d = neuron.activationParams[3];
    return (
      (math.exp(a * z) - math.exp(-b * z)) /
      (math.exp(c * z) + math.exp(-d * z))
    );
  }

  function heaviside(z, neuron) {
    if (z < 0) return 0;
    else return 1;
  }

  function sigmoid(z, neuron) {
    return 1.0 / (math.exp(-z) + 1.0);
  }

  function gelu(z, neuron) {
    return z / 2.0 * (1.0 + math.erf(z / math.sqrt(2.0)));
  }

  function softplus(z, neuron) {
    return math.log(1.0 + math.exp(z));
  }

  function elu(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (z < 0) return alpha * (math.exp(z) - 1.0);
    else return z;
  }

  function selu(z, neuron) {
    let alpha = 1.67326;
    let lambda = 1.0507;
    if (z < 0) return lambda * (alpha * (math.exp(z) - 1.0));
    else return lambda * z;
  }

  function leakyrelu(z, neuron) {
    if (z < 0) return 0.01 * z;
    else return z;
  }

  function prelu(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (z < 0) return alpha * z;
    else return z;
  }

  function silu(z, neuron) {
    return z / (1.0 + math.exp(-z));
  }

  function gaussian(z, neuron) {
    return math.exp(-(z * z));
  }

  function sep(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (alpha < 0) {
      return math.log(1 - alpha * (z + alpha)) / alpha;
    } else if (alpha == 0.0) {
      return z;
    } else {
      return (math.exp(alpha * z) - 1.0) / alpha + alpha;
    }
  }

  function sin(z, neuron) {
    return math.sin(z);
  }

  function csin(z, neuron) {
    if (z == 0.0) return 1.0;
    else return math.sin(z) / z;
  }
  
  
  function identityD(z, neuron) {
	return 1;
  }

  function reluD(z, neuron) {
    return z < 0 ? 0 : 1;
  }
  
  function tanhD(z, neuron) {
    return 1 - Math.pow(Math.tanh(z), 2);
  }
  
  function atanD(z, neuron) {
    return 1 / (1 + Math.pow(z, 2));
  }
  
  function smhtD(z, neuron) {
    let a = neuron.activationParams[0];
    let b = neuron.activationParams[1];
    let c = neuron.activationParams[2];
    let d = neuron.activationParams[3];
    let expAz = Math.exp(a * z);
    let expBz = Math.exp(-b * z);
    let expCz = Math.exp(c * z);
    let expDz = Math.exp(-d * z);
    let numerator = (a * expAz + b * expBz) * (expCz + expDz) - (expAz - expBz) * (c * expCz + d * expDz);
    let denominator = Math.pow(expCz + expDz, 2);
    return numerator / denominator;
  }
  
  function heavisideD(z, neuron) {
    return 0; // La dérivée de Heaviside est 0 partout sauf en z = 0 où elle est indéfinie
  }
  
  function sigmoidD(z, neuron) {
    let sigmoid = 1.0 / (math.exp(-z) + 1.0);
    return sigmoid * (1 - sigmoid);
  }
  
  function geluD(z, neuron) {
    let sqrt2 = Math.sqrt(2.0);
    let erfComponent = math.erf(z / sqrt2);
    let expComponent = math.exp(-Math.pow(z, 2) / 2);
    return 0.5 * (1 + erfComponent) + (z * expComponent) / (sqrt2 * Math.sqrt(Math.PI));
  }
  
  function softplusD(z, neuron) {
    return 1.0 / (1.0 + Math.exp(-z));
  }
  
  function eluD(z, neuron) {
    let alpha = neuron.activationParams[0];
    return z < 0 ? alpha * Math.exp(z) : 1;
  }
  
  function seluD(z, neuron) {
    let alpha = 1.67326;
    let lambda = 1.0507;
    return z < 0 ? lambda * alpha * Math.exp(z) : lambda;
  }
  
  function leakyreluD(z, neuron) {
    return z < 0 ? 0.01 : 1;
  }
  
  function preluD(z, neuron) {
    let alpha = neuron.activationParams[0];
    return z < 0 ? alpha : 1;
  }
  
  function siluD(z, neuron) {
    let sigmoid = 1.0 / (Math.exp(-z) + 1.0);
    return sigmoid * (1 + z * (1 - sigmoid));
  }
  
  function gaussianD(z, neuron) {
    return -2 * z * Math.exp(-(z * z));
  }
  
  function sepD(z, neuron) {
    let alpha = neuron.activationParams[0];
    if (alpha < 0) {
  	return 1 / (1 - alpha * (z + alpha));
    } else if (alpha == 0.0) {
  	return 1;
    } else {
  	return Math.exp(alpha * z);
    }
  }
  
  function sinD(z, neuron) {
    return Math.cos(z);
  }
  
  function csinD(z, neuron) {
    if (z == 0.0) return 0.0;
    return (Math.cos(z) * z - Math.sin(z)) / (z * z);
  }
  
  const toD = {};
  toD["identity"] = identityD;
  toD["relu"] =  reluD;
  toD["tanh"] =  tanhD;
  toD["atan"] =  atanD;
  toD["smht"] =  smhtD;
  toD["heaviside"] =  heavisideD;
  toD["sigmoid"] =  sigmoidD;
  toD["gelu"] =  geluD;
  toD["softplus"] =  softplusD;
  toD["elu"] =  eluD;
  toD["selu"] =  seluD;
  toD["leakyrelu"] =  leakyreluD;
  toD["prelu"] =  preluD;
  toD["silu"] =  siluD;
  toD["gaussian"] =  gaussianD;
  toD["sep"] =  sepD;
  toD["sin"] =  sinD;
  toD["csin"] =  csinD;
  
  
  function activationD(name, z, neuron)
  {
  	return toD[name](z, neuron);
  }

}