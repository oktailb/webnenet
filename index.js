var activation = require("./activation");
var Neuron = require("./neuron");
var Brain = require("./brain");
var math = require("mathjs");
var http = require("http");
const host = "localhost";
const port = 8000;

function random() {
  return -10.0 + math.random() * (10.0 - -10.0);
}

const brainScheme = {
  neurons: [
    {
      name: "n00",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_0_0", factor: 0.42 },
        { value: "img_0_1", factor: 0.42 },
        { value: "img_0_2", factor: 0.42 },
        { value: "img_0_3", factor: 0.42 },
        { value: "img_0_4", factor: 0.42 },
        { value: "img_0_5", factor: 0.42 },
        { value: "img_0_6", factor: 0.42 },
        { value: "img_0_7", factor: 0.42 },
        { value: "img_0_8", factor: 0.42 },
        { value: "img_0_9", factor: 0.42 },
        { value: "img_0_10", factor: 0.42 },
        { value: "img_0_11", factor: 0.42 },
        { value: "img_0_12", factor: 0.42 },
        { value: "img_0_13", factor: 0.42 },
        { value: "img_0_14", factor: 0.42 },
        { value: "img_0_15", factor: 0.42 },
        { value: "csv_0_0", factor: 0.5 }
      ]
    },
    {
      name: "n01",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_1_0", factor: 0.42 },
        { value: "img_1_1", factor: 0.42 },
        { value: "img_1_2", factor: 0.42 },
        { value: "img_1_3", factor: 0.42 },
        { value: "img_1_4", factor: 0.42 },
        { value: "img_1_5", factor: 0.42 },
        { value: "img_1_6", factor: 0.42 },
        { value: "img_1_7", factor: 0.42 },
        { value: "img_1_8", factor: 0.42 },
        { value: "img_1_9", factor: 0.42 },
        { value: "img_1_10", factor: 0.42 },
        { value: "img_1_11", factor: 0.42 },
        { value: "img_1_12", factor: 0.42 },
        { value: "img_1_13", factor: 0.42 },
        { value: "img_1_14", factor: 0.42 },
        { value: "img_1_15", factor: 0.42 },
        { value: "csv_0_1", factor: 0.5 }
      ]
    },
    {
      name: "n02",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_2_0", factor: 0.42 },
        { value: "img_2_1", factor: 0.42 },
        { value: "img_2_2", factor: 0.42 },
        { value: "img_2_3", factor: 0.42 },
        { value: "img_2_4", factor: 0.42 },
        { value: "img_2_5", factor: 0.42 },
        { value: "img_2_6", factor: 0.42 },
        { value: "img_2_7", factor: 0.42 },
        { value: "img_2_8", factor: 0.42 },
        { value: "img_2_9", factor: 0.42 },
        { value: "img_2_10", factor: 0.42 },
        { value: "img_2_11", factor: 0.42 },
        { value: "img_2_12", factor: 0.42 },
        { value: "img_2_13", factor: 0.42 },
        { value: "img_2_14", factor: 0.42 },
        { value: "img_2_15", factor: 0.42 },
        { value: "csv_0_2", factor: 0.5 }
      ]
    },
    {
      name: "n03",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_3_0", factor: 0.42 },
        { value: "img_3_1", factor: 0.42 },
        { value: "img_3_2", factor: 0.42 },
        { value: "img_3_3", factor: 0.42 },
        { value: "img_3_4", factor: 0.42 },
        { value: "img_3_5", factor: 0.42 },
        { value: "img_3_6", factor: 0.42 },
        { value: "img_3_7", factor: 0.42 },
        { value: "img_3_8", factor: 0.42 },
        { value: "img_3_9", factor: 0.42 },
        { value: "img_3_10", factor: 0.42 },
        { value: "img_3_11", factor: 0.42 },
        { value: "img_3_12", factor: 0.42 },
        { value: "img_3_13", factor: 0.42 },
        { value: "img_3_14", factor: 0.42 },
        { value: "img_3_15", factor: 0.42 },
        { value: "csv_0_3", factor: 0.5 }
      ]
    },
    {
      name: "n04",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_4_0", factor: 0.42 },
        { value: "img_4_1", factor: 0.42 },
        { value: "img_4_2", factor: 0.42 },
        { value: "img_4_3", factor: 0.42 },
        { value: "img_4_4", factor: 0.42 },
        { value: "img_4_5", factor: 0.42 },
        { value: "img_4_6", factor: 0.42 },
        { value: "img_4_7", factor: 0.42 },
        { value: "img_4_8", factor: 0.42 },
        { value: "img_4_9", factor: 0.42 },
        { value: "img_4_10", factor: 0.42 },
        { value: "img_4_11", factor: 0.42 },
        { value: "img_4_12", factor: 0.42 },
        { value: "img_4_13", factor: 0.42 },
        { value: "img_4_14", factor: 0.42 },
        { value: "img_4_15", factor: 0.42 },
        { value: "csv_0_4", factor: 0.5 }
      ]
    },
    {
      name: "n05",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_5_0", factor: 0.42 },
        { value: "img_5_1", factor: 0.42 },
        { value: "img_5_2", factor: 0.42 },
        { value: "img_5_3", factor: 0.42 },
        { value: "img_5_4", factor: 0.42 },
        { value: "img_5_5", factor: 0.42 },
        { value: "img_5_6", factor: 0.42 },
        { value: "img_5_7", factor: 0.42 },
        { value: "img_5_8", factor: 0.42 },
        { value: "img_5_9", factor: 0.42 },
        { value: "img_5_10", factor: 0.42 },
        { value: "img_5_11", factor: 0.42 },
        { value: "img_5_12", factor: 0.42 },
        { value: "img_5_13", factor: 0.42 },
        { value: "img_5_14", factor: 0.42 },
        { value: "img_5_15", factor: 0.42 },
        { value: "csv_0_5", factor: 0.5 }
      ]
    },
    {
      name: "n06",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_6_0", factor: 0.42 },
        { value: "img_6_1", factor: 0.42 },
        { value: "img_6_2", factor: 0.42 },
        { value: "img_6_3", factor: 0.42 },
        { value: "img_6_4", factor: 0.42 },
        { value: "img_6_5", factor: 0.42 },
        { value: "img_6_6", factor: 0.42 },
        { value: "img_6_7", factor: 0.42 },
        { value: "img_6_8", factor: 0.42 },
        { value: "img_6_9", factor: 0.42 },
        { value: "img_6_10", factor: 0.42 },
        { value: "img_6_11", factor: 0.42 },
        { value: "img_6_12", factor: 0.42 },
        { value: "img_6_13", factor: 0.42 },
        { value: "img_6_14", factor: 0.42 },
        { value: "img_6_15", factor: 0.42 },
        { value: "csv_1_0", factor: 0.5 }
      ]
    },
    {
      name: "n07",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_7_0", factor: 0.42 },
        { value: "img_7_1", factor: 0.42 },
        { value: "img_7_2", factor: 0.42 },
        { value: "img_7_3", factor: 0.42 },
        { value: "img_7_4", factor: 0.42 },
        { value: "img_7_5", factor: 0.42 },
        { value: "img_7_6", factor: 0.42 },
        { value: "img_7_7", factor: 0.42 },
        { value: "img_7_8", factor: 0.42 },
        { value: "img_7_9", factor: 0.42 },
        { value: "img_7_10", factor: 0.42 },
        { value: "img_7_11", factor: 0.42 },
        { value: "img_7_12", factor: 0.42 },
        { value: "img_7_13", factor: 0.42 },
        { value: "img_7_14", factor: 0.42 },
        { value: "img_7_15", factor: 0.42 },
        { value: "csv_1_1", factor: 0.5 }
      ]
    },
    {
      name: "n08",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_8_0", factor: 0.42 },
        { value: "img_8_1", factor: 0.42 },
        { value: "img_8_2", factor: 0.42 },
        { value: "img_8_3", factor: 0.42 },
        { value: "img_8_4", factor: 0.42 },
        { value: "img_8_5", factor: 0.42 },
        { value: "img_8_6", factor: 0.42 },
        { value: "img_8_7", factor: 0.42 },
        { value: "img_8_8", factor: 0.42 },
        { value: "img_8_9", factor: 0.42 },
        { value: "img_8_10", factor: 0.42 },
        { value: "img_8_11", factor: 0.42 },
        { value: "img_8_12", factor: 0.42 },
        { value: "img_8_13", factor: 0.42 },
        { value: "img_8_14", factor: 0.42 },
        { value: "img_8_15", factor: 0.42 },
        { value: "csv_1_2", factor: 0.5 }
      ]
    },
    {
      name: "n09",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_9_0", factor: 0.42 },
        { value: "img_9_1", factor: 0.42 },
        { value: "img_9_2", factor: 0.42 },
        { value: "img_9_3", factor: 0.42 },
        { value: "img_9_4", factor: 0.42 },
        { value: "img_9_5", factor: 0.42 },
        { value: "img_9_6", factor: 0.42 },
        { value: "img_9_7", factor: 0.42 },
        { value: "img_9_8", factor: 0.42 },
        { value: "img_9_9", factor: 0.42 },
        { value: "img_9_10", factor: 0.42 },
        { value: "img_9_11", factor: 0.42 },
        { value: "img_9_12", factor: 0.42 },
        { value: "img_9_13", factor: 0.42 },
        { value: "img_9_14", factor: 0.42 },
        { value: "img_0_15", factor: 0.42 },
        { value: random, factor: 0.5 },
        { value: "csv_1_3", factor: 0.5 }
      ]
    },
    {
      name: "n10",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_10_0", factor: 0.42 },
        { value: "img_10_1", factor: 0.42 },
        { value: "img_10_2", factor: 0.42 },
        { value: "img_10_3", factor: 0.42 },
        { value: "img_10_4", factor: 0.42 },
        { value: "img_10_5", factor: 0.42 },
        { value: "img_10_6", factor: 0.42 },
        { value: "img_10_7", factor: 0.42 },
        { value: "img_10_8", factor: 0.42 },
        { value: "img_10_9", factor: 0.42 },
        { value: "img_10_10", factor: 0.42 },
        { value: "img_10_11", factor: 0.42 },
        { value: "img_10_12", factor: 0.42 },
        { value: "img_10_13", factor: 0.42 },
        { value: "img_10_14", factor: 0.42 },
        { value: "img_10_15", factor: 0.42 },
        { value: random, factor: 0.5 },
        { value: "csv_1_4", factor: 0.5 }
      ]
    },
    {
      name: "n11",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_11_0", factor: 0.42 },
        { value: "img_11_1", factor: 0.42 },
        { value: "img_11_2", factor: 0.42 },
        { value: "img_11_3", factor: 0.42 },
        { value: "img_11_4", factor: 0.42 },
        { value: "img_11_5", factor: 0.42 },
        { value: "img_11_6", factor: 0.42 },
        { value: "img_11_7", factor: 0.42 },
        { value: "img_11_8", factor: 0.42 },
        { value: "img_11_9", factor: 0.42 },
        { value: "img_11_10", factor: 0.42 },
        { value: "img_11_11", factor: 0.42 },
        { value: "img_11_12", factor: 0.42 },
        { value: "img_11_13", factor: 0.42 },
        { value: "img_11_14", factor: 0.42 },
        { value: "img_11_15", factor: 0.42 },
        { value: random, factor: 0.5 },
        { value: "csv_1_5", factor: 0.5 }
      ]
    },
    {
      name: "n12",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_12_0", factor: 0.42 },
        { value: "img_12_1", factor: 0.42 },
        { value: "img_12_2", factor: 0.42 },
        { value: "img_12_3", factor: 0.42 },
        { value: "img_12_4", factor: 0.42 },
        { value: "img_12_5", factor: 0.42 },
        { value: "img_12_6", factor: 0.42 },
        { value: "img_12_7", factor: 0.42 },
        { value: "img_12_8", factor: 0.42 },
        { value: "img_12_9", factor: 0.42 },
        { value: "img_12_10", factor: 0.42 },
        { value: "img_12_11", factor: 0.42 },
        { value: "img_12_12", factor: 0.42 },
        { value: "img_12_13", factor: 0.42 },
        { value: "img_12_14", factor: 0.42 },
        { value: "img_12_15", factor: 0.42 },
        { value: random, factor: 0.5 }
      ]
    },
    {
      name: "n13",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_13_0", factor: 0.42 },
        { value: "img_13_1", factor: 0.42 },
        { value: "img_13_2", factor: 0.42 },
        { value: "img_13_3", factor: 0.42 },
        { value: "img_13_4", factor: 0.42 },
        { value: "img_13_5", factor: 0.42 },
        { value: "img_13_6", factor: 0.42 },
        { value: "img_13_7", factor: 0.42 },
        { value: "img_13_8", factor: 0.42 },
        { value: "img_13_9", factor: 0.42 },
        { value: "img_13_10", factor: 0.42 },
        { value: "img_13_11", factor: 0.42 },
        { value: "img_13_12", factor: 0.42 },
        { value: "img_13_13", factor: 0.42 },
        { value: "img_13_14", factor: 0.42 },
        { value: "img_13_15", factor: 0.42 },
        { value: random, factor: 0.5 }
      ]
    },
    {
      name: "n14",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_14_0", factor: 0.42 },
        { value: "img_14_1", factor: 0.42 },
        { value: "img_14_2", factor: 0.42 },
        { value: "img_14_3", factor: 0.42 },
        { value: "img_14_4", factor: 0.42 },
        { value: "img_14_5", factor: 0.42 },
        { value: "img_14_6", factor: 0.42 },
        { value: "img_14_7", factor: 0.42 },
        { value: "img_14_8", factor: 0.42 },
        { value: "img_14_9", factor: 0.42 },
        { value: "img_14_10", factor: 0.42 },
        { value: "img_14_11", factor: 0.42 },
        { value: "img_14_12", factor: 0.42 },
        { value: "img_14_13", factor: 0.42 },
        { value: "img_14_14", factor: 0.42 },
        { value: "img_14_15", factor: 0.42 },
        { value: random, factor: 0.5 }
      ]
    },
    {
      name: "n15",
      activation: activation.sigmoid,
      bias: 0.5,
      inputs: [
        { value: "img_15_0", factor: 0.42 },
        { value: "img_15_1", factor: 0.42 },
        { value: "img_15_2", factor: 0.42 },
        { value: "img_15_3", factor: 0.42 },
        { value: "img_15_4", factor: 0.42 },
        { value: "img_15_5", factor: 0.42 },
        { value: "img_15_6", factor: 0.42 },
        { value: "img_15_7", factor: 0.42 },
        { value: "img_15_8", factor: 0.42 },
        { value: "img_15_9", factor: 0.42 },
        { value: "img_15_10", factor: 0.42 },
        { value: "img_15_11", factor: 0.42 },
        { value: "img_15_12", factor: 0.42 },
        { value: "img_15_13", factor: 0.42 },
        { value: "img_15_14", factor: 0.42 },
        { value: "img_15_15", factor: 0.42 },
        { value: random, factor: 0.5 }
      ]
    },
    {
      name: "hiddend1",
      activation: activation.leakyrelu,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      bias: 0.42,
      inputs: [
        { value: "n00", factor: 0.0625 },
        { value: "n01", factor: 0.0625 },
        { value: "n02", factor: 0.0625 },
        { value: "n03", factor: 0.0625 },
        { value: "n04", factor: 0.0625 },
        { value: "n05", factor: 0.0625 },
        { value: "n06", factor: 0.0625 },
        { value: "n07", factor: 0.0625 },
        { value: "n08", factor: 0.0625 },
        { value: "n09", factor: 0.0625 },
        { value: "n10", factor: 0.0625 },
        { value: "n11", factor: 0.0625 },
        { value: "n12", factor: 0.0625 },
        { value: "n13", factor: 0.0625 },
        { value: "n14", factor: 0.0625 },
        { value: "n15", factor: 0.0625 }
      ]
    },
    {
      name: "hiddend2",
      activation: activation.gaussian,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      bias: 0.42,
      inputs: [
        { value: "n00", factor: 0.0625 },
        { value: "n01", factor: 0.0625 },
        { value: "n02", factor: 0.0625 },
        { value: "n03", factor: 0.0625 },
        { value: "n04", factor: 0.0625 },
        { value: "n05", factor: 0.0625 },
        { value: "n06", factor: 0.0625 },
        { value: "n07", factor: 0.0625 },
        { value: "n08", factor: 0.0625 },
        { value: "n09", factor: 0.0625 },
        { value: "n10", factor: 0.0625 },
        { value: "n11", factor: 0.0625 },
        { value: "n12", factor: 0.0625 },
        { value: "n13", factor: 0.0625 },
        { value: "n14", factor: 0.0625 },
        { value: "n15", factor: 0.0625 }
      ]
    },
    {
      name: "hiddend3",
      activation: activation.gelu,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      bias: 0.42,
      inputs: [
        { value: "n00", factor: 0.0625 },
        { value: "n01", factor: 0.0625 },
        { value: "n02", factor: 0.0625 },
        { value: "n03", factor: 0.0625 },
        { value: "n04", factor: 0.0625 },
        { value: "n05", factor: 0.0625 },
        { value: "n06", factor: 0.0625 },
        { value: "n07", factor: 0.0625 },
        { value: "n08", factor: 0.0625 },
        { value: "n09", factor: 0.0625 },
        { value: "n10", factor: 0.0625 },
        { value: "n11", factor: 0.0625 },
        { value: "n12", factor: 0.0625 },
        { value: "n13", factor: 0.0625 },
        { value: "n14", factor: 0.0625 },
        { value: "n15", factor: 0.0625 }
      ]
    },
    {
      name: "hiddend4",
      activation: activation.leakyrelu,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      bias: 0.42,
      inputs: [
        { value: "n00", factor: 0.0625 },
        { value: "n01", factor: 0.0625 },
        { value: "n02", factor: 0.0625 },
        { value: "n03", factor: 0.0625 },
        { value: "n04", factor: 0.0625 },
        { value: "n05", factor: 0.0625 },
        { value: "n06", factor: 0.0625 },
        { value: "n07", factor: 0.0625 },
        { value: "n08", factor: 0.0625 },
        { value: "n09", factor: 0.0625 },
        { value: "n10", factor: 0.0625 },
        { value: "n11", factor: 0.0625 },
        { value: "n12", factor: 0.0625 },
        { value: "n13", factor: 0.0625 },
        { value: "n14", factor: 0.0625 },
        { value: "n15", factor: 0.0625 }
      ]
    },
    {
      name: "hiddend5",
      activation: activation.smht,
      activationParams: [0.452, 1.3, 0.6251479, 0.002],
      bias: 0.63,
      inputs: [
        { value: "n00", factor: 0.0625 },
        { value: "n01", factor: 0.0625 },
        { value: "n02", factor: 0.0625 },
        { value: "n03", factor: 0.0625 },
        { value: "n04", factor: 0.0625 },
        { value: "n05", factor: 0.0625 },
        { value: "n06", factor: 0.0625 },
        { value: "n07", factor: 0.0625 },
        { value: "n08", factor: 0.0625 },
        { value: "n09", factor: 0.0625 },
        { value: "n10", factor: 0.0625 },
        { value: "n11", factor: 0.0625 },
        { value: "n12", factor: 0.0625 },
        { value: "n13", factor: 0.0625 },
        { value: "n14", factor: 0.0625 },
        { value: "n15", factor: 0.0625 }
      ]
    },
    {
      name: "OUTPUT",
      activation: activation.csin,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      bias: 0.42,
      inputs: [
        { value: "hiddend1", factor: 0.5 + random() },
        { value: "hiddend2", factor: 0.5 + random() },
        { value: "hiddend3", factor: 0.5 + random() },
        { value: "hiddend4", factor: 0.5 + random() },
        { value: "hiddend5", factor: 0.5 + random() },
        { value: random, factor: 1.2 }
      ]
    }
  ],
  inputs: [
    {
      name: "picture",
      type: "img",
      data: "test.png",
      neuronprefix: "img",
      activation: activation.relu,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      inputParams: [0.00098, 0.00098, 0.00098, 0.00098]
    },
    {
      name: "any data",
      type: "raw",
      data: "example.dat",
      neuronprefix: "raw",
      activation: activation.sigmoid,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      inputParams: [1.0]
    },
    {
      name: "formated columns data",
      type: "csv",
      data: "example.csv",
      neuronprefix: "csv",
      activation: activation.sigmoid,
      activationParams: [1.0, 1.0, 1.0, 1.0],
      inputParams: [1.0]
    }
  ],
  predictions: [
    {
      name: "result of picture analysis",
      results: [
        {
          neuron: "OUTPUT1",
          name: "devil cat"
        }
      ]
    },
    {},
    {}
  ]
};

async function main() {
  const { createCanvas, loadImage } = require("canvas");
  const canvas = createCanvas(2000, 16384);
  const ctx = canvas.getContext("2d");

  var example = new Brain(brainScheme);
  await example.sleep(1000);
  example.forward();
  example.draw(canvas);

  const requestListener = function(req, res) {
    res.end(
      '<html></body><img src="' + canvas.toDataURL() + '" /></body></html>'
    );
  };

  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Brain is running on http://${host}:${port}`);
  });
}

main();
