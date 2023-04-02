export const fireWidthSmoke = (x: number, y: number, w: number, h: number) => ({
    "lifetime": {
        "min": 0.5,
        "max": 0.7
    },
    "frequency": 0.00008,
    "emitterLifetime": 0,
    "maxParticles": 10000,
    "addAtBack": false,
    "pos": {
        "x": 0,
        "y": 0
    },
    "behaviors": [
        {
            "type": "alpha",
            "config": {
                "alpha": {
                    "list": [
                        {
                            "value": 0.62,
                            "time": 0
                        },
                        {
                            "value": 0,
                            "time": 0.6
                        },
                        {
                            "value": 0,
                            "time": 0.7
                        },
                        {
                            "value": 0.8,
                            "time": 0.71
                        },
                        {
                            "value": 0,
                            "time": 1
                        }
                    ],
                    "isStepped": false
                }
            }
        },
        {
            "type": "moveSpeed",
            "config": {
                "speed": {
                    "list": [
                        {
                            "value": 500,
                            "time": 0
                        },
                        {
                            "value": 450,
                            "time": 0.7
                        },
                        {
                            "value": 450,
                            "time": 1
                        }
                    ],
                    "isStepped": true
                },
                "minMult": 1
            }
        },
        {
            "type": "scale",
            "config": {
                "scale": {
                    "list": [
                        {
                            "value": 0.25,
                            "time": 0
                        },
                        {
                            "value": 0.75,
                            "time": 1
                        }
                    ],
                    "isStepped": false
                },
                "minMult": 1
            }
        },
        {
            "type": "color",
            "config": {
                "color": {
                    "list": [
                        {
                            "value": "fff191",
                            "time": 0
                        },
                        {
                            "value": "ff622c",
                            "time": 0.6
                        },
                        {
                            "value": "333232",
                            "time": 0.7
                        },
                        {
                            "value": "333333",
                            "time": 1
                        }
                    ],
                    "isStepped": false
                }
            }
        },
        {
            "type": "rotation",
            "config": {
                "accel": 0,
                "minSpeed": 50,
                "maxSpeed": 50,
                "minStart": 265,
                "maxStart": 275
            }
        },
        {
            "type": "textureRandom",
            "config": {
                "textures": fireTextures
            }
        },
        {
            "type": "spawnShape",
            "config": {
                type: 'rect',
                data: {
                    x,
                    y,
                    w,
                    h,
                }
            }
        }
    ]
});

export type Quality = 'low' | 'medium' | 'high';

export const fireConfig = (
    width: number,
    quality: Quality
) => {
    let frequency = 0.00008;
    let maxParticles = 10000;

    switch (quality) { 
        case 'low':
            frequency = 0.0008
            maxParticles = 1000;
            break;
        case 'medium':
            frequency = 0.00008;
            maxParticles = 1000;
            break;
        case 'high':
            frequency = 0.00008;
            maxParticles = 10000;
            break;
    }

    return {
        "lifetime": {
            "min": 0.5,
            "max": 0.7
        },
        "frequency": frequency,
        "emitterLifetime": 0,
        "maxParticles": maxParticles,
        "addAtBack": false,
        "pos": {
            "x": 0,
            "y": 0
        },
        "behaviors": [
            {
                "type": "alpha",
                "config": {
                    "alpha": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.62
                            },
                            {
                                "time": 1,
                                "value": 0
                            }
                        ]
                    }
                }
            },
            {
                "type": "moveSpeedStatic",
                "config": {
                    "min": 500,
                    "max": 500
                }
            },
            {
                "type": "scale",
                "config": {
                    "scale": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.25
                            },
                            {
                                "time": 1,
                                "value": 0.75
                            }
                        ]
                    },
                    "minMult": 1
                }
            },
            {
                "type": "color",
                "config": {
                    "color": {
                        "list": [
                            {
                                "time": 0,
                                "value": "fff191"
                            },
                            {
                                "time": 1,
                                "value": "ff622c"
                            }
                        ]
                    }
                }
            },
            {
                "type": "rotation",
                "config": {
                    "accel": 0,
                    "minSpeed": 50,
                    "maxSpeed": 50,
                    "minStart": 265,
                    "maxStart": 275
                }
            },
            {
                "type": "textureRandom",
                "config": {
                    "textures": fireTextures
                }
            },
            {
                "type": "spawnShape",
                "config": {
                    type: 'rect',
                    data: {
                        x: 0,
                        y: 0,
                        w: width,
                        h: 100,
                    }
                }
            }
        ]
    }
};

export const fireTextures = [
    "assets/particle.png",
    "assets/Fire.png"
]