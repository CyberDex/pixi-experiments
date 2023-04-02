export const fireParticleConfig = (x: number, y: number, w: number, h: number) => ({
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
                "textures": [
                    "assets/particle.png",
                    "assets/Fire.png"
                ]
            }
        },
        {
            "type": "spawnShape",
            "config": {
                // "type": "torus",
                // "data": {
                //     "x": 0,
                //     "y": 0,
                //     "radius": 50,
                //     "innerRadius": 0,
                //     "affectRotation": false
                // }
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