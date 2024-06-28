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
		    "name" : "n1",
		    "x": 150,
		    "y": 150,
		    "activation": elu,
		    "bias": 0.5,
		    "inputs": [
			{ "value": random, "factor": -0.5 },
			{ "value": 42, "factor": 0.05 }
		    ]
		},
		{
		    "name" : "n2",
		    "x": 600,
		    "y": 150,
		    "activation": sep,
		    "activationParams": [1.0, 1.0, 1.0, 1.0],
		    "inputs": [
			{ "value": "n1", "factor": 0.5 },
			{ "value": "n1", "factor": 1.0 },
			{ "value": "n1", "factor": -1.5 }
		    ]
		}
	    ]
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


