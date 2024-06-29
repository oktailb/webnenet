# webnenet
## Web Neural Network
![Example or neural network rendering](https://raw.githubusercontent.com/oktailb/webnenet/main/example.png)

Webnenet is a purely educational neural network engine with no realistic neither nor reasonable scientific usage.
I am not AI specialist, so if You have any suggestion/correction/enhancement, please propose a patch. I You have any complain, please make a better fork yourself.

The neural network can be initialized using a JSON structure such as:
```
		const brain = {
			"neurons": [
				{
					"name": "n11",
					"x": 150,
					"y": 150,
					"activation": leakyrelu,
					"bias": 0.5,
					"inputs": [
						{ "value": random, "factor": -1.5 },
						{ "value": 42, "factor": 0.05 }
					]
				},
				{
					"name": "n12",
					"x": 150,
					"y": 350,
					"activation": selu,
					"bias": 0.5,
					"inputs": [
						{ "value": random, "factor": -1.5 },
						{ "value": 42, "factor": 0.05 }
					]
				},
				{
					"name": "n13",
					"x": 150,
					"y": 550,
					"activation": smht,
					"activationParams": [1.0, 0.5, 1.07, -0.3],
					"bias": 0.5,
					"inputs": [
						{ "value": random, "factor": -1.5 },
						{ "value": 42, "factor": 0.05 }
					]
				},
				{
					"name": "n21",
					"x": 600,
					"y": 200,
					"activation": sep,
					"activationParams": [1.0, 1.0, 1.0, 1.0],
					"bias": 0.42,
					"inputs": [
						{ "value": "n11", "factor": 0.5 },
						{ "value": "n12", "factor": 1.0 },
						{ "value": "n13", "factor": -1.5 }
					]
				},
				{
					"name": "n22",
					"x": 600,
					"y": 500,
					"activation": tanh,
					"activationParams": [1.0, 1.0, 1.0, 1.0],
					"bias": 0.42,
					"inputs": [
						{ "value": "n11", "factor": 0.5 },
						{ "value": "n12", "factor": 1.0 },
						{ "value": "n13", "factor": -1.5 }
					]
				},
				{
					"name": "OUTPUT",
					"x": 950,
					"y": 300,
					"activation": sigmoid,
					"activationParams": [1.0, 1.0, 1.0, 1.0],
					"bias": 0.42,
					"inputs": [
						{ "value": "n21", "factor": -0.5 },
						{ "value": "n22", "factor": 1.2 },
					]
				}
			],
			"input": "example.img",
			"prediction": 42
		};
```

The inputs of each neuron can be:
- a direct value
- a javascript function return value
- another neuron

[!TIP]
- file input
- real back propagation
- online editor
- output prediction file for training
- predict next jackpot numbers on euromillions (may I ask donations for buying a ticket first)


