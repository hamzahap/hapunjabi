/**
 * Seafarers scenario boards, generated from the 2025 CATAN Seafarers (3-4) and
 * Seafarers 5-6 rulebook diagrams. Do not edit by hand; see the extraction
 * notes in the commit that added this file.
 *
 * Row characters: '.' nothing, 'S' sea, 'F' fog (empty until discovered),
 * 'I' main shuffle pool, 'L' second shuffle pool (small islands / unexplored),
 * 'D' fixed desert, 'X' fixed land with a printed number, 'N' fixed land with
 * no number, 'V' village (fixed desert or gold field carrying two numbers).
 * `fixed` holds the terrain and number for D/X/N/V cells; `printed` holds the
 * rulebook's fixed set-up for every land cell so it can be shown verbatim.
 */
export const SCENARIO_BOARDS = {
 "cloth": {
  "4": {
   "fixed": {
    "1,1": [
     "forest",
     4
    ],
    "1,2": [
     "pasture",
     6
    ],
    "1,3": [
     "hills",
     5
    ],
    "1,4": [
     "pasture",
     11
    ],
    "1,5": [
     "fields",
     8
    ],
    "2,1": [
     "fields",
     3
    ],
    "2,2": [
     "forest",
     12
    ],
    "2,5": [
     "forest",
     3
    ],
    "2,6": [
     "mountains",
     9
    ],
    "3,0": [
     "fields",
     12
    ],
    "3,3": [
     "gold",
     [
      11,
      8
     ]
    ],
    "4,2": [
     "desert",
     [
      10,
      9
     ]
    ],
    "4,5": [
     "desert",
     [
      4,
      5
     ]
    ],
    "5,3": [
     "gold",
     [
      6,
      3
     ]
    ],
    "5,6": [
     "mountains",
     2
    ],
    "6,1": [
     "hills",
     9
    ],
    "6,2": [
     "fields",
     2
    ],
    "6,5": [
     "pasture",
     11
    ],
    "6,6": [
     "mountains",
     4
    ],
    "7,1": [
     "pasture",
     10
    ],
    "7,2": [
     "forest",
     6
    ],
    "7,3": [
     "mountains",
     5
    ],
    "7,4": [
     "fields",
     10
    ],
    "7,5": [
     "hills",
     8
    ]
   },
   "harbors": [
    [
     1,
     1,
     "NE"
    ],
    [
     1,
     4,
     "NW"
    ],
    [
     1,
     5,
     "NE"
    ],
    [
     2,
     1,
     "W"
    ],
    [
     6,
     1,
     "W"
    ],
    [
     2,
     6,
     "E"
    ],
    [
     6,
     6,
     "SE"
    ],
    [
     7,
     2,
     "SW"
    ],
    [
     7,
     4,
     "SE"
    ]
   ],
   "isle": null,
   "main": null,
   "printed": {
    "1,1": [
     "forest",
     4
    ],
    "1,2": [
     "pasture",
     6
    ],
    "1,3": [
     "hills",
     5
    ],
    "1,4": [
     "pasture",
     11
    ],
    "1,5": [
     "fields",
     8
    ],
    "2,1": [
     "fields",
     3
    ],
    "2,2": [
     "forest",
     12
    ],
    "2,5": [
     "forest",
     3
    ],
    "2,6": [
     "mountains",
     9
    ],
    "3,0": [
     "fields",
     12
    ],
    "3,3": [
     "gold",
     null
    ],
    "4,2": [
     "desert",
     null
    ],
    "4,5": [
     "desert",
     null
    ],
    "5,3": [
     "gold",
     null
    ],
    "5,6": [
     "mountains",
     2
    ],
    "6,1": [
     "hills",
     9
    ],
    "6,2": [
     "fields",
     2
    ],
    "6,5": [
     "pasture",
     11
    ],
    "6,6": [
     "mountains",
     4
    ],
    "7,1": [
     "pasture",
     10
    ],
    "7,2": [
     "forest",
     6
    ],
    "7,3": [
     "mountains",
     5
    ],
    "7,4": [
     "fields",
     10
    ],
    "7,5": [
     "hills",
     8
    ]
   },
   "robber": [
    4,
    2
   ],
   "rows": [
    ".......",
    "SXXXXXS",
    ".XXSSXX",
    "XSSVSSS",
    ".SVSSVS",
    "SSSVSSX",
    ".XXSSXX",
    "SXXXXXS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   }
  },
  "6": {
   "fixed": {
    "0,1": [
     "forest",
     4
    ],
    "0,2": [
     "pasture",
     6
    ],
    "0,3": [
     "hills",
     5
    ],
    "0,4": [
     "fields",
     12
    ],
    "0,5": [
     "hills",
     3
    ],
    "0,6": [
     "pasture",
     11
    ],
    "0,7": [
     "fields",
     8
    ],
    "1,0": [
     "fields",
     3
    ],
    "1,1": [
     "forest",
     12
    ],
    "1,6": [
     "forest",
     3
    ],
    "1,7": [
     "mountains",
     9
    ],
    "2,0": [
     "fields",
     11
    ],
    "2,3": [
     "desert",
     [
      5,
      2
     ]
    ],
    "2,5": [
     "desert",
     [
      8,
      10
     ]
    ],
    "2,8": [
     "pasture",
     3
    ],
    "3,1": [
     "gold",
     [
      9,
      4
     ]
    ],
    "3,6": [
     "gold",
     [
      5,
      4
     ]
    ],
    "4,0": [
     "mountains",
     8
    ],
    "4,3": [
     "desert",
     [
      12,
      6
     ]
    ],
    "4,5": [
     "desert",
     [
      10,
      9
     ]
    ],
    "4,8": [
     "mountains",
     2
    ],
    "5,0": [
     "hills",
     9
    ],
    "5,1": [
     "fields",
     2
    ],
    "5,6": [
     "pasture",
     11
    ],
    "5,7": [
     "mountains",
     4
    ],
    "6,1": [
     "pasture",
     10
    ],
    "6,2": [
     "forest",
     6
    ],
    "6,3": [
     "mountains",
     5
    ],
    "6,4": [
     "forest",
     11
    ],
    "6,5": [
     "forest",
     8
    ],
    "6,6": [
     "fields",
     10
    ],
    "6,7": [
     "hills",
     6
    ]
   },
   "harbors": [
    [
     0,
     6,
     "NW"
    ],
    [
     1,
     0,
     "W"
    ],
    [
     5,
     0,
     "W"
    ],
    [
     6,
     6,
     "SE"
    ],
    [
     6,
     3,
     "SE"
    ],
    [
     0,
     7,
     "NE"
    ],
    [
     4,
     8,
     "E"
    ],
    [
     0,
     4,
     "NW"
    ],
    [
     0,
     1,
     "NE"
    ],
    [
     6,
     2,
     "SW"
    ],
    [
     5,
     7,
     "SE"
    ]
   ],
   "isle": null,
   "main": null,
   "printed": {
    "0,1": [
     "forest",
     4
    ],
    "0,2": [
     "pasture",
     6
    ],
    "0,3": [
     "hills",
     5
    ],
    "0,4": [
     "fields",
     12
    ],
    "0,5": [
     "hills",
     3
    ],
    "0,6": [
     "pasture",
     11
    ],
    "0,7": [
     "fields",
     8
    ],
    "1,0": [
     "fields",
     3
    ],
    "1,1": [
     "forest",
     12
    ],
    "1,6": [
     "forest",
     3
    ],
    "1,7": [
     "mountains",
     9
    ],
    "2,0": [
     "fields",
     11
    ],
    "2,3": [
     "desert",
     null
    ],
    "2,5": [
     "desert",
     null
    ],
    "2,8": [
     "pasture",
     3
    ],
    "3,1": [
     "gold",
     null
    ],
    "3,6": [
     "gold",
     null
    ],
    "4,0": [
     "mountains",
     8
    ],
    "4,3": [
     "desert",
     null
    ],
    "4,5": [
     "desert",
     null
    ],
    "4,8": [
     "mountains",
     2
    ],
    "5,0": [
     "hills",
     9
    ],
    "5,1": [
     "fields",
     2
    ],
    "5,6": [
     "pasture",
     11
    ],
    "5,7": [
     "mountains",
     4
    ],
    "6,1": [
     "pasture",
     10
    ],
    "6,2": [
     "forest",
     6
    ],
    "6,3": [
     "mountains",
     5
    ],
    "6,4": [
     "forest",
     11
    ],
    "6,5": [
     "forest",
     8
    ],
    "6,6": [
     "fields",
     10
    ],
    "6,7": [
     "hills",
     6
    ]
   },
   "rows": [
    ".XXXXXXX.",
    "XXSSSSXX.",
    "XSSVSVSSX",
    "SVSSSSVS.",
    "XSSVSVSSX",
    "XXSSSSXX.",
    ".XXXXXXX."
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 2,
    "wheat": 1,
    "wood": 1
   }
  }
 },
 "desert": {
  "3": {
   "fixed": {
    "1,2": [
     "desert",
     null
    ],
    "2,2": [
     "desert",
     null
    ],
    "3,1": [
     "desert",
     null
    ]
   },
   "harbors": [
    [
     2,
     3,
     "NE"
    ],
    [
     5,
     3,
     "NE"
    ],
    [
     5,
     3,
     "SE"
    ],
    [
     5,
     1,
     "NW"
    ],
    [
     5,
     0,
     "SW"
    ],
    [
     7,
     1,
     "W"
    ],
    [
     7,
     1,
     "SE"
    ],
    [
     7,
     2,
     "E"
    ]
   ],
   "isle": {
    "numbers": [
     3,
     4,
     5,
     5,
     6,
     8,
     9,
     12
    ],
    "terrain": {
     "fields": 2,
     "forest": 1,
     "gold": 2,
     "mountains": 2,
     "pasture": 1
    }
   },
   "main": {
    "numbers": [
     2,
     3,
     4,
     4,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     10,
     10,
     11
    ],
    "terrain": {
     "fields": 2,
     "forest": 4,
     "hills": 3,
     "mountains": 2,
     "pasture": 3
    }
   },
   "printed": {
    "1,1": [
     "gold",
     4
    ],
    "1,2": [
     "desert",
     null
    ],
    "1,4": [
     "mountains",
     8
    ],
    "2,1": [
     "forest",
     3
    ],
    "2,2": [
     "desert",
     null
    ],
    "2,3": [
     "forest",
     4
    ],
    "2,5": [
     "pasture",
     12
    ],
    "3,0": [
     "fields",
     6
    ],
    "3,1": [
     "desert",
     null
    ],
    "3,2": [
     "hills",
     5
    ],
    "3,3": [
     "pasture",
     6
    ],
    "4,2": [
     "mountains",
     3
    ],
    "4,3": [
     "forest",
     10
    ],
    "4,5": [
     "gold",
     5
    ],
    "5,0": [
     "forest",
     11
    ],
    "5,1": [
     "hills",
     6
    ],
    "5,2": [
     "fields",
     2
    ],
    "5,3": [
     "hills",
     9
    ],
    "6,1": [
     "mountains",
     10
    ],
    "6,2": [
     "fields",
     9
    ],
    "6,3": [
     "forest",
     8
    ],
    "6,5": [
     "fields",
     9
    ],
    "7,1": [
     "pasture",
     8
    ],
    "7,2": [
     "pasture",
     4
    ],
    "7,4": [
     "mountains",
     5
    ]
   },
   "robber": [
    2,
    2
   ],
   "rows": [
    "......",
    "SLDSLS",
    ".LDISL",
    "LDIISS",
    ".SIISL",
    "IIIISS",
    ".IIISL",
    "SIISLS"
   ],
   "tokens": {
    "any": 3,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 14
  },
  "4": {
   "fixed": {
    "1,2": [
     "desert",
     null
    ],
    "2,2": [
     "desert",
     null
    ],
    "3,1": [
     "desert",
     null
    ]
   },
   "harbors": [
    [
     1,
     3,
     "E"
    ],
    [
     3,
     4,
     "NE"
    ],
    [
     3,
     4,
     "SE"
    ],
    [
     4,
     2,
     "W"
    ],
    [
     6,
     1,
     "W"
    ],
    [
     6,
     1,
     "SE"
    ],
    [
     7,
     2,
     "E"
    ],
    [
     5,
     3,
     "SE"
    ],
    [
     7,
     2,
     "SW"
    ]
   ],
   "isle": {
    "numbers": [
     2,
     3,
     4,
     5,
     6,
     8,
     9,
     10,
     11,
     12
    ],
    "terrain": {
     "fields": 3,
     "gold": 2,
     "hills": 1,
     "mountains": 3,
     "pasture": 1
    }
   },
   "main": {
    "numbers": [
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     10,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 2,
     "forest": 5,
     "hills": 4,
     "mountains": 2,
     "pasture": 4
    }
   },
   "printed": {
    "1,1": [
     "gold",
     10
    ],
    "1,2": [
     "desert",
     null
    ],
    "1,3": [
     "forest",
     5
    ],
    "1,5": [
     "mountains",
     9
    ],
    "2,1": [
     "mountains",
     11
    ],
    "2,2": [
     "desert",
     null
    ],
    "2,3": [
     "hills",
     3
    ],
    "2,4": [
     "pasture",
     6
    ],
    "2,6": [
     "fields",
     4
    ],
    "3,0": [
     "fields",
     8
    ],
    "3,1": [
     "desert",
     null
    ],
    "3,2": [
     "mountains",
     8
    ],
    "3,3": [
     "fields",
     10
    ],
    "3,4": [
     "forest",
     4
    ],
    "3,6": [
     "hills",
     2
    ],
    "4,2": [
     "forest",
     10
    ],
    "4,3": [
     "hills",
     11
    ],
    "4,4": [
     "pasture",
     9
    ],
    "5,0": [
     "hills",
     12
    ],
    "5,1": [
     "hills",
     6
    ],
    "5,2": [
     "fields",
     5
    ],
    "5,3": [
     "forest",
     8
    ],
    "5,5": [
     "gold",
     5
    ],
    "5,6": [
     "pasture",
     3
    ],
    "6,1": [
     "pasture",
     3
    ],
    "6,2": [
     "pasture",
     11
    ],
    "6,3": [
     "mountains",
     4
    ],
    "7,2": [
     "forest",
     9
    ],
    "7,4": [
     "mountains",
     6
    ],
    "7,5": [
     "fields",
     12
    ]
   },
   "robber": [
    2,
    2
   ],
   "rows": [
    ".......",
    "SLDISLS",
    ".LDIISL",
    "LDIIISL",
    ".SIIISS",
    "IIIISLL",
    ".IIISSS",
    "SSISLLS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 14
  },
  "6": {
   "fixed": {
    "1,2": [
     "desert",
     null
    ],
    "1,3": [
     "desert",
     null
    ],
    "1,4": [
     "desert",
     null
    ],
    "1,5": [
     "desert",
     null
    ],
    "1,6": [
     "desert",
     null
    ]
   },
   "harbors": [
    [
     5,
     0,
     "W"
    ],
    [
     3,
     2,
     "NW"
    ],
    [
     2,
     6,
     "E"
    ],
    [
     3,
     0,
     "NW"
    ],
    [
     4,
     2,
     "SE"
    ],
    [
     4,
     4,
     "SW"
    ],
    [
     5,
     1,
     "SE"
    ],
    [
     6,
     1,
     "SW"
    ],
    [
     4,
     6,
     "SW"
    ],
    [
     3,
     6,
     "SE"
    ]
   ],
   "isle": {
    "numbers": [
     2,
     2,
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 3,
     "forest": 3,
     "gold": 3,
     "hills": 2,
     "mountains": 3,
     "pasture": 3
    }
   },
   "main": {
    "numbers": [
     2,
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     12,
     12
    ],
    "terrain": {
     "fields": 4,
     "forest": 4,
     "hills": 5,
     "mountains": 4,
     "pasture": 4
    }
   },
   "printed": {
    "0,1": [
     "gold",
     4
    ],
    "0,2": [
     "mountains",
     6
    ],
    "0,3": [
     "hills",
     11
    ],
    "0,5": [
     "forest",
     12
    ],
    "0,6": [
     "fields",
     5
    ],
    "0,7": [
     "mountains",
     3
    ],
    "0,8": [
     "hills",
     6
    ],
    "1,0": [
     "forest",
     5
    ],
    "1,1": [
     "pasture",
     2
    ],
    "1,2": [
     "desert",
     null
    ],
    "1,3": [
     "desert",
     null
    ],
    "1,4": [
     "desert",
     null
    ],
    "1,5": [
     "desert",
     null
    ],
    "1,6": [
     "desert",
     null
    ],
    "2,3": [
     "fields",
     2
    ],
    "2,4": [
     "forest",
     8
    ],
    "2,5": [
     "pasture",
     9
    ],
    "2,6": [
     "forest",
     10
    ],
    "2,9": [
     "gold",
     10
    ],
    "3,0": [
     "mountains",
     4
    ],
    "3,1": [
     "forest",
     5
    ],
    "3,2": [
     "fields",
     10
    ],
    "3,3": [
     "hills",
     5
    ],
    "3,4": [
     "pasture",
     10
    ],
    "3,5": [
     "forest",
     4
    ],
    "3,6": [
     "hills",
     8
    ],
    "4,0": [
     "pasture",
     12
    ],
    "4,1": [
     "fields",
     3
    ],
    "4,2": [
     "hills",
     12
    ],
    "4,3": [
     "mountains",
     6
    ],
    "4,4": [
     "hills",
     11
    ],
    "4,5": [
     "mountains",
     3
    ],
    "4,6": [
     "fields",
     9
    ],
    "4,9": [
     "mountains",
     8
    ],
    "5,0": [
     "hills",
     9
    ],
    "5,1": [
     "mountains",
     11
    ],
    "5,7": [
     "pasture",
     11
    ],
    "5,8": [
     "forest",
     3
    ],
    "6,1": [
     "pasture",
     6
    ],
    "6,3": [
     "pasture",
     8
    ],
    "6,4": [
     "fields",
     2
    ],
    "6,6": [
     "gold",
     4
    ],
    "6,8": [
     "fields",
     9
    ]
   },
   "rows": [
    ".LLLSLLLL.",
    "LLDDDDDSS.",
    "SSSIIIISSL",
    "IIIIIIISS.",
    "IIIIIIISSL",
    "IISSSSSLL.",
    ".ISLLSLSL."
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 2,
    "wheat": 1,
    "wood": 1
   },
   "vp": 14
  }
 },
 "fog": {
  "3": {
   "facedown": {
    "numbers": [
     3,
     3,
     4,
     5,
     6,
     8,
     9,
     10,
     11,
     12
    ],
    "terrain": {
     "fields": 2,
     "forest": 1,
     "gold": 2,
     "hills": 2,
     "mountains": 2,
     "pasture": 1,
     "sea": 2
    }
   },
   "fixed": {},
   "harbors": [
    [
     1,
     4,
     "NE"
    ],
    [
     1,
     5,
     "E"
    ],
    [
     3,
     6,
     "NE"
    ],
    [
     4,
     6,
     "E"
    ],
    [
     4,
     1,
     "SW"
    ],
    [
     5,
     1,
     "SW"
    ],
    [
     6,
     3,
     "SE"
    ],
    [
     7,
     2,
     "W"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     3,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 2,
     "forest": 4,
     "hills": 2,
     "mountains": 2,
     "pasture": 4
    }
   },
   "pirate": [
    7,
    6
   ],
   "printed": {
    "1,4": [
     "hills",
     6
    ],
    "1,5": [
     "forest",
     11
    ],
    "2,5": [
     "forest",
     5
    ],
    "2,6": [
     "fields",
     3
    ],
    "3,5": [
     "pasture",
     8
    ],
    "3,6": [
     "pasture",
     9
    ],
    "4,1": [
     "forest",
     6
    ],
    "4,2": [
     "pasture",
     5
    ],
    "4,6": [
     "mountains",
     4
    ],
    "5,1": [
     "hills",
     11
    ],
    "5,2": [
     "forest",
     9
    ],
    "6,2": [
     "mountains",
     8
    ],
    "6,3": [
     "fields",
     10
    ],
    "7,2": [
     "pasture",
     12
    ]
   },
   "robber": [
    7,
    2
   ],
   "rows": [
    ".......",
    "SFFSIIS",
    ".FFFSII",
    "SSSFSII",
    ".IISFSI",
    "SIISFSS",
    ".SIISFF",
    "SSISFFS"
   ],
   "tokens": {
    "any": 3,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 12
  },
  "4": {
   "facedown": {
    "numbers": [
     3,
     4,
     5,
     6,
     8,
     9,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 2,
     "forest": 1,
     "gold": 2,
     "hills": 2,
     "mountains": 2,
     "pasture": 1,
     "sea": 2
    }
   },
   "fixed": {},
   "harbors": [
    [
     1,
     3,
     "NE"
    ],
    [
     1,
     5,
     "NW"
    ],
    [
     1,
     5,
     "E"
    ],
    [
     3,
     6,
     "NE"
    ],
    [
     5,
     6,
     "NE"
    ],
    [
     4,
     1,
     "W"
    ],
    [
     6,
     1,
     "W"
    ],
    [
     7,
     1,
     "W"
    ],
    [
     7,
     1,
     "SE"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     10,
     10,
     11,
     12
    ],
    "terrain": {
     "fields": 3,
     "forest": 4,
     "hills": 3,
     "mountains": 3,
     "pasture": 4
    }
   },
   "printed": {
    "1,3": [
     "hills",
     4
    ],
    "1,4": [
     "fields",
     10
    ],
    "1,5": [
     "mountains",
     3
    ],
    "2,4": [
     "pasture",
     9
    ],
    "2,5": [
     "forest",
     6
    ],
    "2,6": [
     "hills",
     12
    ],
    "3,5": [
     "pasture",
     10
    ],
    "3,6": [
     "mountains",
     8
    ],
    "4,1": [
     "mountains",
     3
    ],
    "4,6": [
     "fields",
     11
    ],
    "5,0": [
     "fields",
     6
    ],
    "5,1": [
     "forest",
     4
    ],
    "5,6": [
     "forest",
     5
    ],
    "6,1": [
     "hills",
     9
    ],
    "6,2": [
     "pasture",
     8
    ],
    "7,1": [
     "pasture",
     2
    ],
    "7,2": [
     "forest",
     5
    ]
   },
   "robber": [
    2,
    6
   ],
   "rows": [
    ".......",
    "SFSIIIS",
    ".FFSIII",
    "SSFSSII",
    ".ISFFSI",
    "IISFFSI",
    ".IISFFS",
    "SIISFFS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 12
  },
  "6": {
   "facedown": {
    "numbers": [
     2,
     2,
     3,
     4,
     5,
     5,
     6,
     8,
     9,
     9,
     10,
     11,
     12
    ],
    "terrain": {
     "fields": 2,
     "forest": 3,
     "gold": 1,
     "hills": 2,
     "mountains": 2,
     "pasture": 3,
     "sea": 12
    }
   },
   "fixed": {},
   "harbors": [
    [
     1,
     1,
     "W"
    ],
    [
     0,
     8,
     "NW"
    ],
    [
     1,
     7,
     "E"
    ],
    [
     0,
     3,
     "NW"
    ],
    [
     3,
     4,
     "SE"
    ],
    [
     2,
     3,
     "SW"
    ],
    [
     0,
     5,
     "NE"
    ],
    [
     2,
     6,
     "SE"
    ],
    [
     0,
     1,
     "NE"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     3,
     4,
     4,
     4,
     5,
     5,
     6,
     6,
     6,
     8,
     8,
     8,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     11,
     12,
     12
    ],
    "terrain": {
     "desert": 1,
     "fields": 5,
     "forest": 4,
     "gold": 2,
     "hills": 5,
     "mountains": 5,
     "pasture": 4
    }
   },
   "printed": {
    "0,1": [
     "hills",
     5
    ],
    "0,2": [
     "pasture",
     6
    ],
    "0,3": [
     "mountains",
     3
    ],
    "0,4": [
     "desert",
     null
    ],
    "0,5": [
     "hills",
     11
    ],
    "0,6": [
     "hills",
     8
    ],
    "0,7": [
     "mountains",
     11
    ],
    "0,8": [
     "fields",
     6
    ],
    "1,1": [
     "fields",
     2
    ],
    "1,2": [
     "pasture",
     4
    ],
    "1,3": [
     "mountains",
     6
    ],
    "1,4": [
     "mountains",
     10
    ],
    "1,5": [
     "pasture",
     9
    ],
    "1,6": [
     "hills",
     12
    ],
    "1,7": [
     "forest",
     4
    ],
    "2,2": [
     "forest",
     8
    ],
    "2,3": [
     "fields",
     9
    ],
    "2,4": [
     "hills",
     3
    ],
    "2,5": [
     "mountains",
     12
    ],
    "2,6": [
     "fields",
     10
    ],
    "2,7": [
     "forest",
     3
    ],
    "3,3": [
     "forest",
     5
    ],
    "3,4": [
     "fields",
     11
    ],
    "3,5": [
     "pasture",
     8
    ],
    "6,1": [
     "gold",
     4
    ],
    "6,8": [
     "gold",
     10
    ]
   },
   "rows": [
    ".IIIIIIII.",
    "SIIIIIIIS.",
    "FSIIIIIISF",
    "FSSIIISSF.",
    "FFFSSSSFFF",
    "FFFFFFFFF.",
    ".IFFFFFFI."
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 12
  }
 },
 "islands": {
  "3": {
   "fixed": {},
   "harbors": [
    [
     3,
     0,
     "NW"
    ],
    [
     2,
     2,
     "SE"
    ],
    [
     2,
     5,
     "NE"
    ],
    [
     3,
     4,
     "SW"
    ],
    [
     5,
     0,
     "NE"
    ],
    [
     5,
     0,
     "SW"
    ],
    [
     6,
     4,
     "NW"
    ],
    [
     6,
     5,
     "E"
    ],
    [
     6,
     2,
     "SE"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     4,
     4,
     5,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 4,
     "forest": 4,
     "hills": 4,
     "mountains": 4,
     "pasture": 4
    }
   },
   "pirate": [
    4,
    3
   ],
   "printed": {
    "1,3": [
     "fields",
     4
    ],
    "1,4": [
     "pasture",
     3
    ],
    "2,1": [
     "mountains",
     4
    ],
    "2,2": [
     "forest",
     9
    ],
    "2,4": [
     "fields",
     9
    ],
    "2,5": [
     "hills",
     5
    ],
    "3,0": [
     "pasture",
     6
    ],
    "3,1": [
     "mountains",
     10
    ],
    "3,3": [
     "forest",
     8
    ],
    "3,4": [
     "hills",
     11
    ],
    "5,0": [
     "fields",
     11
    ],
    "5,1": [
     "mountains",
     8
    ],
    "5,2": [
     "forest",
     3
    ],
    "5,4": [
     "hills",
     10
    ],
    "5,5": [
     "hills",
     6
    ],
    "6,1": [
     "forest",
     5
    ],
    "6,2": [
     "pasture",
     9
    ],
    "6,4": [
     "mountains",
     2
    ],
    "6,5": [
     "fields",
     5
    ],
    "7,1": [
     "pasture",
     12
    ]
   },
   "robber": [
    7,
    1
   ],
   "rows": [
    "......",
    "SSSIIS",
    ".IISII",
    "IISIIS",
    ".SSSSS",
    "IIISII",
    ".IISII",
    "SISSSS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 13
  },
  "4": {
   "fixed": {},
   "harbors": [
    [
     2,
     1,
     "W"
    ],
    [
     3,
     0,
     "SE"
    ],
    [
     4,
     3,
     "NW"
    ],
    [
     2,
     5,
     "SE"
    ],
    [
     5,
     5,
     "NW"
    ],
    [
     5,
     0,
     "SW"
    ],
    [
     6,
     2,
     "NE"
    ],
    [
     7,
     1,
     "W"
    ],
    [
     6,
     5,
     "E"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     4,
     4,
     4,
     5,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 5,
     "forest": 5,
     "hills": 4,
     "mountains": 4,
     "pasture": 5
    }
   },
   "printed": {
    "1,1": [
     "pasture",
     8
    ],
    "1,3": [
     "forest",
     9
    ],
    "1,4": [
     "forest",
     11
    ],
    "2,1": [
     "hills",
     10
    ],
    "2,3": [
     "mountains",
     3
    ],
    "2,4": [
     "fields",
     12
    ],
    "2,5": [
     "pasture",
     5
    ],
    "3,0": [
     "fields",
     5
    ],
    "3,1": [
     "forest",
     3
    ],
    "3,3": [
     "hills",
     5
    ],
    "3,4": [
     "mountains",
     10
    ],
    "4,3": [
     "forest",
     6
    ],
    "5,0": [
     "hills",
     4
    ],
    "5,1": [
     "pasture",
     9
    ],
    "5,4": [
     "forest",
     9
    ],
    "5,5": [
     "pasture",
     11
    ],
    "6,1": [
     "fields",
     6
    ],
    "6,2": [
     "mountains",
     4
    ],
    "6,3": [
     "hills",
     2
    ],
    "6,5": [
     "mountains",
     8
    ],
    "7,1": [
     "pasture",
     10
    ],
    "7,2": [
     "fields",
     11
    ],
    "7,4": [
     "fields",
     4
    ]
   },
   "robber": [
    2,
    4
   ],
   "rows": [
    "......",
    "SISIIS",
    ".ISIII",
    "IISIIS",
    ".SSISS",
    "IISSII",
    ".IIISI",
    "SIISIS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 13
  },
  "6": {
   "fixed": {},
   "harbors": [
    [
     0,
     4,
     "NE"
    ],
    [
     1,
     6,
     "SW"
    ],
    [
     5,
     0,
     "W"
    ],
    [
     6,
     6,
     "SW"
    ],
    [
     1,
     1,
     "SE"
    ],
    [
     0,
     7,
     "NE"
    ],
    [
     5,
     7,
     "E"
    ],
    [
     0,
     2,
     "NW"
    ],
    [
     6,
     2,
     "NE"
    ],
    [
     5,
     3,
     "SW"
    ],
    [
     2,
     1,
     "SW"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     2,
     3,
     3,
     3,
     4,
     4,
     4,
     4,
     5,
     5,
     5,
     5,
     6,
     6,
     6,
     6,
     8,
     8,
     8,
     9,
     9,
     9,
     9,
     10,
     10,
     10,
     10,
     11,
     11,
     12,
     12
    ],
    "terrain": {
     "fields": 6,
     "forest": 7,
     "hills": 6,
     "mountains": 6,
     "pasture": 7
    }
   },
   "printed": {
    "0,1": [
     "pasture",
     12
    ],
    "0,2": [
     "mountains",
     4
    ],
    "0,4": [
     "forest",
     6
    ],
    "0,6": [
     "mountains",
     9
    ],
    "0,7": [
     "pasture",
     6
    ],
    "1,0": [
     "forest",
     8
    ],
    "1,1": [
     "mountains",
     10
    ],
    "1,3": [
     "mountains",
     11
    ],
    "1,4": [
     "hills",
     10
    ],
    "1,6": [
     "fields",
     3
    ],
    "1,7": [
     "hills",
     10
    ],
    "2,0": [
     "hills",
     11
    ],
    "2,1": [
     "fields",
     9
    ],
    "2,3": [
     "pasture",
     3
    ],
    "2,4": [
     "forest",
     4
    ],
    "2,7": [
     "forest",
     4
    ],
    "4,1": [
     "hills",
     4
    ],
    "4,4": [
     "pasture",
     8
    ],
    "4,5": [
     "forest",
     10
    ],
    "4,7": [
     "forest",
     5
    ],
    "4,8": [
     "fields",
     6
    ],
    "5,0": [
     "forest",
     9
    ],
    "5,1": [
     "fields",
     12
    ],
    "5,3": [
     "fields",
     5
    ],
    "5,4": [
     "mountains",
     3
    ],
    "5,6": [
     "hills",
     8
    ],
    "5,7": [
     "pasture",
     9
    ],
    "6,1": [
     "pasture",
     5
    ],
    "6,2": [
     "mountains",
     6
    ],
    "6,4": [
     "pasture",
     2
    ],
    "6,6": [
     "hills",
     5
    ],
    "6,7": [
     "fields",
     2
    ]
   },
   "rows": [
    ".IISISII.",
    "IISIISII.",
    "IISIISSIS",
    "SSSSSSSS.",
    "SISSIISII",
    "IISIISII.",
    ".IISISII."
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 2,
    "wheat": 1,
    "wood": 1
   },
   "vp": 13
  }
 },
 "newworld": {
  "4": {
   "dynamicHarbors": true,
   "fixed": {},
   "harbors": [],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     3,
     4,
     4,
     4,
     5,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "desert": 0,
     "fields": 5,
     "forest": 5,
     "gold": 0,
     "hills": 4,
     "mountains": 4,
     "pasture": 5,
     "sea": 23
    }
   },
   "printed": {},
   "rows": [
    ".......",
    "IIIIIII",
    ".IIIIII",
    "IIIIIII",
    ".IIIIII",
    "IIIIIII",
    ".IIIIII",
    "IIIIIII"
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 12
  },
  "6": {
   "dynamicHarbors": true,
   "fixed": {},
   "harbors": [],
   "isle": null,
   "main": {
    "numbers": [
     2,
     2,
     3,
     3,
     3,
     4,
     4,
     4,
     4,
     5,
     5,
     5,
     5,
     5,
     6,
     6,
     6,
     6,
     6,
     8,
     8,
     8,
     8,
     8,
     9,
     9,
     9,
     9,
     9,
     10,
     10,
     10,
     10,
     11,
     11,
     11,
     11,
     12,
     12,
     12
    ],
    "terrain": {
     "desert": 3,
     "fields": 7,
     "forest": 7,
     "gold": 4,
     "hills": 7,
     "mountains": 7,
     "pasture": 7,
     "sea": 21
    }
   },
   "printed": {},
   "rows": [
    ".IIIIIIII.",
    "IIIIIIIII.",
    "IIIIIIIIII",
    "IIIIIIIII.",
    "IIIIIIIIII",
    "IIIIIIIII.",
    ".IIIIIIII."
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 2,
    "wheat": 1,
    "wood": 1
   },
   "vp": 12
  }
 },
 "pirates": {
  "4": {
   "fixed": {
    "1,1": [
     "gold",
     11
    ],
    "1,2": [
     "mountains",
     6
    ],
    "1,5": [
     "fields",
     4
    ],
    "1,6": [
     "hills",
     5
    ],
    "2,1": [
     "hills",
     null
    ],
    "2,4": [
     "desert",
     null
    ],
    "2,6": [
     "mountains",
     9
    ],
    "2,7": [
     "forest",
     10
    ],
    "3,0": [
     "fields",
     4
    ],
    "3,3": [
     "desert",
     null
    ],
    "3,5": [
     "forest",
     3
    ],
    "3,6": [
     "pasture",
     8
    ],
    "3,7": [
     "forest",
     5
    ],
    "4,2": [
     "mountains",
     8
    ],
    "4,5": [
     "fields",
     6
    ],
    "4,6": [
     "hills",
     9
    ],
    "4,7": [
     "pasture",
     12
    ],
    "5,0": [
     "fields",
     10
    ],
    "5,3": [
     "desert",
     null
    ],
    "5,5": [
     "pasture",
     11
    ],
    "5,6": [
     "forest",
     8
    ],
    "5,7": [
     "pasture",
     9
    ],
    "6,1": [
     "hills",
     null
    ],
    "6,4": [
     "pasture",
     null
    ],
    "6,6": [
     "mountains",
     5
    ],
    "6,7": [
     "forest",
     2
    ],
    "7,1": [
     "gold",
     3
    ],
    "7,2": [
     "mountains",
     6
    ],
    "7,5": [
     "fields",
     10
    ],
    "7,6": [
     "hills",
     4
    ]
   },
   "harbors": [
    [
     1,
     6,
     "NE"
    ],
    [
     1,
     6,
     "E"
    ],
    [
     2,
     7,
     "E"
    ],
    [
     3,
     7,
     "E"
    ],
    [
     4,
     7,
     "E"
    ],
    [
     5,
     7,
     "E"
    ],
    [
     6,
     7,
     "E"
    ],
    [
     7,
     6,
     "E"
    ]
   ],
   "isle": null,
   "main": null,
   "pirate": [
    7,
    4
   ],
   "printed": {
    "1,1": [
     "gold",
     11
    ],
    "1,2": [
     "mountains",
     6
    ],
    "1,5": [
     "fields",
     4
    ],
    "1,6": [
     "hills",
     5
    ],
    "2,1": [
     "hills",
     null
    ],
    "2,4": [
     "desert",
     null
    ],
    "2,6": [
     "mountains",
     9
    ],
    "2,7": [
     "forest",
     10
    ],
    "3,0": [
     "fields",
     4
    ],
    "3,3": [
     "desert",
     null
    ],
    "3,5": [
     "forest",
     3
    ],
    "3,6": [
     "pasture",
     8
    ],
    "3,7": [
     "forest",
     5
    ],
    "4,2": [
     "mountains",
     8
    ],
    "4,5": [
     "fields",
     6
    ],
    "4,6": [
     "hills",
     9
    ],
    "4,7": [
     "pasture",
     12
    ],
    "5,0": [
     "fields",
     10
    ],
    "5,3": [
     "desert",
     null
    ],
    "5,5": [
     "pasture",
     11
    ],
    "5,6": [
     "forest",
     8
    ],
    "5,7": [
     "pasture",
     9
    ],
    "6,1": [
     "hills",
     null
    ],
    "6,4": [
     "pasture",
     null
    ],
    "6,6": [
     "mountains",
     5
    ],
    "6,7": [
     "forest",
     2
    ],
    "7,1": [
     "gold",
     3
    ],
    "7,2": [
     "mountains",
     6
    ],
    "7,5": [
     "fields",
     10
    ],
    "7,6": [
     "hills",
     4
    ]
   },
   "rows": [
    "........",
    "SXXSSXXS",
    ".NSSNSXX",
    "XSSNSXXX",
    ".SXSSXXX",
    "XSSNSXXX",
    ".NSSNSXX",
    "SXXSSXXS"
   ],
   "tokens": {
    "any": 3,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 10
  },
  "6": {
   "fixed": {
    "0,1": [
     "gold",
     3
    ],
    "0,3": [
     "mountains",
     6
    ],
    "0,6": [
     "pasture",
     5
    ],
    "0,7": [
     "fields",
     4
    ],
    "0,8": [
     "hills",
     9
    ],
    "1,4": [
     "desert",
     null
    ],
    "1,6": [
     "mountains",
     3
    ],
    "1,7": [
     "hills",
     10
    ],
    "1,8": [
     "forest",
     11
    ],
    "2,0": [
     "gold",
     11
    ],
    "2,1": [
     "desert",
     null
    ],
    "2,2": [
     "mountains",
     8
    ],
    "2,6": [
     "forest",
     12
    ],
    "2,7": [
     "forest",
     6
    ],
    "2,8": [
     "pasture",
     4
    ],
    "2,9": [
     "forest",
     10
    ],
    "3,3": [
     "desert",
     null
    ],
    "3,5": [
     "fields",
     6
    ],
    "3,6": [
     "fields",
     4
    ],
    "3,7": [
     "mountains",
     5
    ],
    "3,8": [
     "pasture",
     8
    ],
    "4,0": [
     "gold",
     11
    ],
    "4,1": [
     "desert",
     null
    ],
    "4,2": [
     "mountains",
     6
    ],
    "4,6": [
     "pasture",
     2
    ],
    "4,7": [
     "pasture",
     10
    ],
    "4,8": [
     "hills",
     3
    ],
    "4,9": [
     "pasture",
     5
    ],
    "5,4": [
     "desert",
     null
    ],
    "5,6": [
     "fields",
     11
    ],
    "5,7": [
     "mountains",
     9
    ],
    "5,8": [
     "hills",
     8
    ],
    "6,1": [
     "gold",
     3
    ],
    "6,3": [
     "mountains",
     8
    ],
    "6,6": [
     "forest",
     9
    ],
    "6,7": [
     "fields",
     5
    ],
    "6,8": [
     "forest",
     4
    ]
   },
   "harbors": [
    [
     0,
     8,
     "NW"
    ],
    [
     3,
     8,
     "E"
    ],
    [
     6,
     8,
     "E"
    ],
    [
     6,
     7,
     "SW"
    ],
    [
     5,
     8,
     "E"
    ],
    [
     6,
     8,
     "SW"
    ],
    [
     0,
     8,
     "E"
    ],
    [
     1,
     8,
     "E"
    ],
    [
     0,
     7,
     "NW"
    ]
   ],
   "isle": null,
   "main": null,
   "printed": {
    "0,1": [
     "gold",
     3
    ],
    "0,3": [
     "mountains",
     6
    ],
    "0,6": [
     "pasture",
     5
    ],
    "0,7": [
     "fields",
     4
    ],
    "0,8": [
     "hills",
     9
    ],
    "1,4": [
     "desert",
     null
    ],
    "1,6": [
     "mountains",
     3
    ],
    "1,7": [
     "hills",
     10
    ],
    "1,8": [
     "forest",
     11
    ],
    "2,0": [
     "gold",
     11
    ],
    "2,1": [
     "desert",
     null
    ],
    "2,2": [
     "mountains",
     8
    ],
    "2,6": [
     "forest",
     12
    ],
    "2,7": [
     "forest",
     6
    ],
    "2,8": [
     "pasture",
     4
    ],
    "2,9": [
     "forest",
     10
    ],
    "3,3": [
     "desert",
     null
    ],
    "3,5": [
     "fields",
     6
    ],
    "3,6": [
     "fields",
     4
    ],
    "3,7": [
     "mountains",
     5
    ],
    "3,8": [
     "pasture",
     8
    ],
    "4,0": [
     "gold",
     11
    ],
    "4,1": [
     "desert",
     null
    ],
    "4,2": [
     "mountains",
     6
    ],
    "4,6": [
     "pasture",
     2
    ],
    "4,7": [
     "pasture",
     10
    ],
    "4,8": [
     "hills",
     3
    ],
    "4,9": [
     "pasture",
     5
    ],
    "5,4": [
     "desert",
     null
    ],
    "5,6": [
     "fields",
     11
    ],
    "5,7": [
     "mountains",
     9
    ],
    "5,8": [
     "hills",
     8
    ],
    "6,1": [
     "gold",
     3
    ],
    "6,3": [
     "mountains",
     8
    ],
    "6,6": [
     "forest",
     9
    ],
    "6,7": [
     "fields",
     5
    ],
    "6,8": [
     "forest",
     4
    ]
   },
   "rows": [
    ".XSXSSXXX.",
    "SSSSNSXXX.",
    "XNXSSSXXXX",
    "SSSNSXXXX.",
    "XNXSSSXXXX",
    "SSSSNSXXX.",
    ".XSXSSXXX."
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 10
  }
 },
 "shores": {
  "3": {
   "fixed": {},
   "harbors": [
    [
     5,
     0,
     "SW"
    ],
    [
     3,
     1,
     "W"
    ],
    [
     4,
     1,
     "W"
    ],
    [
     4,
     3,
     "E"
    ],
    [
     7,
     1,
     "W"
    ],
    [
     3,
     2,
     "E"
    ],
    [
     7,
     2,
     "E"
    ],
    [
     7,
     2,
     "SW"
    ]
   ],
   "isle": {
    "numbers": [
     3,
     4,
     4,
     5,
     8,
     9,
     10,
     12
    ],
    "terrain": {
     "fields": 1,
     "gold": 2,
     "hills": 2,
     "mountains": 2,
     "pasture": 1
    }
   },
   "main": {
    "numbers": [
     2,
     3,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     10,
     10,
     11,
     11
    ],
    "terrain": {
     "fields": 3,
     "forest": 3,
     "hills": 2,
     "mountains": 2,
     "pasture": 4
    }
   },
   "printed": {
    "1,1": [
     "hills",
     12
    ],
    "1,2": [
     "gold",
     5
    ],
    "2,4": [
     "pasture",
     4
    ],
    "2,5": [
     "mountains",
     9
    ],
    "3,1": [
     "fields",
     4
    ],
    "3,2": [
     "pasture",
     6
    ],
    "3,4": [
     "fields",
     3
    ],
    "4,1": [
     "pasture",
     2
    ],
    "4,2": [
     "mountains",
     5
    ],
    "4,3": [
     "forest",
     10
    ],
    "4,5": [
     "gold",
     4
    ],
    "5,0": [
     "hills",
     8
    ],
    "5,1": [
     "pasture",
     10
    ],
    "5,2": [
     "pasture",
     9
    ],
    "5,3": [
     "forest",
     8
    ],
    "6,1": [
     "fields",
     11
    ],
    "6,2": [
     "mountains",
     3
    ],
    "6,3": [
     "hills",
     11
    ],
    "6,5": [
     "mountains",
     8
    ],
    "7,1": [
     "fields",
     6
    ],
    "7,2": [
     "forest",
     5
    ],
    "7,4": [
     "hills",
     10
    ]
   },
   "robber": [
    1,
    1
   ],
   "rows": [
    "......",
    "SLLSSS",
    ".SSSLL",
    "SIISLS",
    ".IIISL",
    "IIIISS",
    ".IIISL",
    "SIISLS"
   ],
   "tokens": {
    "any": 3,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 14
  },
  "4": {
   "fixed": {},
   "harbors": [
    [
     3,
     1,
     "W"
    ],
    [
     3,
     3,
     "NW"
    ],
    [
     3,
     3,
     "E"
    ],
    [
     4,
     1,
     "W"
    ],
    [
     5,
     0,
     "SW"
    ],
    [
     6,
     4,
     "E"
    ],
    [
     7,
     1,
     "W"
    ],
    [
     7,
     3,
     "E"
    ],
    [
     7,
     2,
     "SW"
    ]
   ],
   "isle": {
    "numbers": [
     2,
     3,
     4,
     5,
     6,
     8,
     9,
     10,
     11
    ],
    "terrain": {
     "fields": 1,
     "forest": 1,
     "gold": 2,
     "hills": 2,
     "mountains": 2,
     "pasture": 1
    }
   },
   "main": {
    "numbers": [
     2,
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     10,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "desert": 1,
     "fields": 4,
     "forest": 4,
     "hills": 3,
     "mountains": 3,
     "pasture": 4
    }
   },
   "printed": {
    "1,1": [
     "mountains",
     8
    ],
    "1,2": [
     "pasture",
     11
    ],
    "1,4": [
     "gold",
     4
    ],
    "2,5": [
     "hills",
     5
    ],
    "2,6": [
     "mountains",
     2
    ],
    "3,1": [
     "pasture",
     5
    ],
    "3,2": [
     "forest",
     6
    ],
    "3,3": [
     "mountains",
     4
    ],
    "3,5": [
     "forest",
     9
    ],
    "4,1": [
     "fields",
     12
    ],
    "4,2": [
     "hills",
     11
    ],
    "4,3": [
     "fields",
     3
    ],
    "4,4": [
     "pasture",
     9
    ],
    "4,6": [
     "gold",
     10
    ],
    "5,0": [
     "hills",
     6
    ],
    "5,1": [
     "forest",
     10
    ],
    "5,2": [
     "desert",
     null
    ],
    "5,3": [
     "fields",
     11
    ],
    "5,4": [
     "forest",
     5
    ],
    "6,1": [
     "mountains",
     3
    ],
    "6,2": [
     "pasture",
     4
    ],
    "6,3": [
     "hills",
     9
    ],
    "6,4": [
     "pasture",
     8
    ],
    "6,6": [
     "hills",
     3
    ],
    "7,1": [
     "fields",
     8
    ],
    "7,2": [
     "forest",
     2
    ],
    "7,3": [
     "mountains",
     10
    ],
    "7,5": [
     "fields",
     6
    ]
   },
   "robber": [
    5,
    2
   ],
   "rows": [
    ".......",
    "SLLSLSS",
    ".SSSSLL",
    "SIIISLS",
    ".IIIISL",
    "IIIIISS",
    ".IIIISL",
    "SIIISLS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 14
  },
  "6": {
   "fixed": {},
   "harbors": [
    [
     0,
     4,
     "NE"
    ],
    [
     2,
     6,
     "E"
    ],
    [
     2,
     2,
     "W"
    ],
    [
     6,
     4,
     "SW"
    ],
    [
     6,
     5,
     "SE"
    ],
    [
     3,
     6,
     "SE"
    ],
    [
     5,
     5,
     "E"
    ],
    [
     1,
     2,
     "NW"
    ],
    [
     1,
     5,
     "NE"
    ],
    [
     5,
     2,
     "SW"
    ],
    [
     3,
     1,
     "SW"
    ]
   ],
   "isle": {
    "numbers": [
     2,
     3,
     4,
     5,
     6,
     8,
     9,
     10,
     11,
     12
    ],
    "terrain": {
     "fields": 1,
     "forest": 1,
     "gold": 3,
     "hills": 2,
     "mountains": 2,
     "pasture": 1
    }
   },
   "main": {
    "numbers": [
     2,
     2,
     3,
     3,
     3,
     4,
     4,
     4,
     5,
     5,
     5,
     6,
     6,
     6,
     8,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     11,
     12,
     12
    ],
    "terrain": {
     "desert": 2,
     "fields": 6,
     "forest": 6,
     "hills": 5,
     "mountains": 5,
     "pasture": 6
    }
   },
   "printed": {
    "0,1": [
     "gold",
     9
    ],
    "0,7": [
     "mountains",
     6
    ],
    "1,0": [
     "mountains",
     11
    ],
    "2,0": [
     "pasture",
     8
    ],
    "2,8": [
     "hills",
     12
    ],
    "4,0": [
     "hills",
     4
    ],
    "4,8": [
     "fields",
     3
    ],
    "5,0": [
     "forest",
     2
    ],
    "6,1": [
     "gold",
     5
    ],
    "6,7": [
     "gold",
     10
    ]
   },
   "rows": [
    ".LSIIISL.",
    "LSIIIISS.",
    "LSIIIIISL",
    "SIIIIIIS.",
    "LSIIIIISL",
    "LSIIIISS.",
    ".LSIIISL."
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 2,
    "wheat": 1,
    "wood": 1
   },
   "vp": 14
  }
 },
 "tribe": {
  "4": {
   "fixed": {
    "1,1": [
     "gold",
     null
    ],
    "1,2": [
     "mountains",
     null
    ],
    "1,4": [
     "desert",
     null
    ],
    "1,5": [
     "mountains",
     null
    ],
    "1,6": [
     "fields",
     null
    ],
    "3,7": [
     "pasture",
     null
    ],
    "5,7": [
     "forest",
     null
    ],
    "7,1": [
     "desert",
     null
    ],
    "7,2": [
     "hills",
     null
    ],
    "7,4": [
     "hills",
     null
    ],
    "7,5": [
     "desert",
     null
    ],
    "7,6": [
     "gold",
     null
    ]
   },
   "harbors": [
    [
     1,
     1,
     "NW"
    ],
    [
     1,
     4,
     "NW"
    ],
    [
     3,
     7,
     "NE"
    ],
    [
     7,
     1,
     "SW"
    ],
    [
     7,
     5,
     "SW"
    ],
    [
     5,
     7,
     "SE"
    ]
   ],
   "isle": null,
   "lowside": [
    "3,5",
    "4,6",
    "5,5"
   ],
   "main": {
    "numbers": [
     2,
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     10,
     10,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 4,
     "forest": 4,
     "hills": 3,
     "mountains": 3,
     "pasture": 4
    }
   },
   "marks": [
    [
     1,
     1,
     "NE",
     "vp"
    ],
    [
     1,
     4,
     "NE",
     "vp"
    ],
    [
     1,
     6,
     "NE",
     "vp"
    ],
    [
     3,
     7,
     "E",
     "vp"
    ],
    [
     5,
     7,
     "E",
     "vp"
    ],
    [
     7,
     2,
     "SW",
     "vp"
    ],
    [
     7,
     4,
     "SW",
     "vp"
    ],
    [
     7,
     6,
     "SE",
     "vp"
    ],
    [
     1,
     0,
     "W",
     "card"
    ],
    [
     1,
     7,
     "E",
     "card"
    ],
    [
     7,
     0,
     "W",
     "card"
    ],
    [
     7,
     7,
     "E",
     "card"
    ]
   ],
   "pirate": [
    1,
    3
   ],
   "printed": {
    "1,1": [
     "gold",
     null
    ],
    "1,2": [
     "mountains",
     null
    ],
    "1,4": [
     "desert",
     null
    ],
    "1,5": [
     "mountains",
     null
    ],
    "1,6": [
     "fields",
     null
    ],
    "3,0": [
     "fields",
     6
    ],
    "3,1": [
     "forest",
     9
    ],
    "3,2": [
     "mountains",
     11
    ],
    "3,3": [
     "hills",
     5
    ],
    "3,4": [
     "forest",
     6
    ],
    "3,5": [
     "mountains",
     4
    ],
    "3,7": [
     "pasture",
     null
    ],
    "4,1": [
     "pasture",
     10
    ],
    "4,2": [
     "hills",
     8
    ],
    "4,3": [
     "pasture",
     4
    ],
    "4,4": [
     "fields",
     12
    ],
    "4,5": [
     "forest",
     5
    ],
    "4,6": [
     "pasture",
     2
    ],
    "5,0": [
     "forest",
     11
    ],
    "5,1": [
     "fields",
     9
    ],
    "5,2": [
     "mountains",
     3
    ],
    "5,3": [
     "pasture",
     8
    ],
    "5,4": [
     "hills",
     10
    ],
    "5,5": [
     "fields",
     3
    ],
    "5,7": [
     "forest",
     null
    ],
    "7,1": [
     "desert",
     null
    ],
    "7,2": [
     "hills",
     null
    ],
    "7,4": [
     "hills",
     null
    ],
    "7,5": [
     "desert",
     null
    ],
    "7,6": [
     "gold",
     null
    ]
   },
   "robber": [
    7,
    5
   ],
   "rows": [
    "........",
    ".NNSNNN.",
    ".SSSSSSS",
    "IIIIIISN",
    ".IIIIIIS",
    "IIIIIISN",
    ".SSSSSSS",
    ".NNSNNN."
   ],
   "tokens": {
    "any": 1,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 13
  },
  "6": {
   "fixed": {
    "0,1": [
     "desert",
     null
    ],
    "0,2": [
     "desert",
     null
    ],
    "0,4": [
     "gold",
     null
    ],
    "0,5": [
     "gold",
     null
    ],
    "0,7": [
     "pasture",
     null
    ],
    "0,8": [
     "pasture",
     null
    ],
    "6,1": [
     "desert",
     null
    ],
    "6,2": [
     "desert",
     null
    ],
    "6,4": [
     "mountains",
     null
    ],
    "6,5": [
     "hills",
     null
    ],
    "6,7": [
     "fields",
     null
    ],
    "6,8": [
     "gold",
     null
    ]
   },
   "harbors": [
    [
     0,
     2,
     "NE"
    ],
    [
     0,
     4,
     "NW"
    ],
    [
     6,
     5,
     "SE"
    ],
    [
     6,
     7,
     "SW"
    ],
    [
     6,
     2,
     "SE"
    ],
    [
     6,
     1,
     "SW"
    ],
    [
     0,
     8,
     "NE"
    ],
    [
     0,
     7,
     "NE"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     3,
     3,
     4,
     4,
     4,
     4,
     5,
     5,
     5,
     5,
     6,
     6,
     6,
     8,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 6,
     "forest": 7,
     "hills": 6,
     "mountains": 5,
     "pasture": 5
    }
   },
   "printed": {
    "0,1": [
     "desert",
     null
    ],
    "0,2": [
     "desert",
     null
    ],
    "0,4": [
     "gold",
     null
    ],
    "0,5": [
     "gold",
     null
    ],
    "0,7": [
     "pasture",
     null
    ],
    "0,8": [
     "pasture",
     null
    ],
    "2,0": [
     "fields",
     3
    ],
    "2,1": [
     "hills",
     5
    ],
    "2,2": [
     "mountains",
     11
    ],
    "2,3": [
     "pasture",
     8
    ],
    "2,4": [
     "hills",
     4
    ],
    "2,5": [
     "forest",
     10
    ],
    "2,6": [
     "fields",
     4
    ],
    "2,7": [
     "hills",
     3
    ],
    "2,8": [
     "forest",
     8
    ],
    "2,9": [
     "mountains",
     5
    ],
    "3,0": [
     "forest",
     11
    ],
    "3,1": [
     "pasture",
     12
    ],
    "3,2": [
     "forest",
     5
    ],
    "3,3": [
     "fields",
     10
    ],
    "3,4": [
     "pasture",
     5
    ],
    "3,5": [
     "hills",
     9
    ],
    "3,6": [
     "fields",
     2
    ],
    "3,7": [
     "pasture",
     9
    ],
    "3,8": [
     "hills",
     10
    ],
    "4,0": [
     "forest",
     6
    ],
    "4,1": [
     "mountains",
     4
    ],
    "4,2": [
     "fields",
     9
    ],
    "4,3": [
     "hills",
     8
    ],
    "4,4": [
     "forest",
     11
    ],
    "4,5": [
     "mountains",
     3
    ],
    "4,6": [
     "pasture",
     4
    ],
    "4,7": [
     "fields",
     6
    ],
    "4,8": [
     "forest",
     3
    ],
    "4,9": [
     "mountains",
     6
    ],
    "6,1": [
     "desert",
     null
    ],
    "6,2": [
     "desert",
     null
    ],
    "6,4": [
     "mountains",
     null
    ],
    "6,5": [
     "hills",
     null
    ],
    "6,7": [
     "fields",
     null
    ],
    "6,8": [
     "gold",
     null
    ]
   },
   "rows": [
    ".NNSNNSNN.",
    "SSSSSSSSS.",
    "IIIIIIIIII",
    "IIIIIIIII.",
    "IIIIIIIIII",
    "SSSSSSSSS.",
    ".NNSNNSNN."
   ],
   "tokens": {
    "any": 3,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 13
  }
 },
 "wonders": {
  "4": {
   "fixed": {
    "1,1": [
     "gold",
     8
    ],
    "1,2": [
     "hills",
     2
    ],
    "2,6": [
     "desert",
     null
    ],
    "3,6": [
     "desert",
     null
    ],
    "4,6": [
     "desert",
     null
    ],
    "5,7": [
     "gold",
     6
    ],
    "6,7": [
     "forest",
     4
    ],
    "7,6": [
     "fields",
     5
    ]
   },
   "harbors": [
    [
     3,
     0,
     "NE"
    ],
    [
     3,
     3,
     "NW"
    ],
    [
     3,
     5,
     "NW"
    ],
    [
     4,
     1,
     "W"
    ],
    [
     4,
     2,
     "SE"
    ],
    [
     5,
     4,
     "E"
    ],
    [
     6,
     2,
     "W"
    ],
    [
     6,
     5,
     "SE"
    ],
    [
     7,
     3,
     "SE"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     3,
     3,
     3,
     4,
     4,
     5,
     5,
     6,
     6,
     8,
     8,
     9,
     9,
     9,
     10,
     10,
     10,
     11,
     11,
     11,
     12
    ],
    "terrain": {
     "fields": 4,
     "forest": 4,
     "hills": 4,
     "mountains": 5,
     "pasture": 5
    }
   },
   "nored": [
    "3,5",
    "4,5"
   ],
   "printed": {
    "1,1": [
     "gold",
     8
    ],
    "1,2": [
     "hills",
     2
    ],
    "1,4": [
     "mountains",
     10
    ],
    "2,4": [
     "forest",
     11
    ],
    "2,6": [
     "desert",
     null
    ],
    "3,0": [
     "mountains",
     12
    ],
    "3,1": [
     "fields",
     6
    ],
    "3,2": [
     "hills",
     11
    ],
    "3,3": [
     "fields",
     10
    ],
    "3,4": [
     "pasture",
     3
    ],
    "3,5": [
     "forest",
     9
    ],
    "3,6": [
     "desert",
     null
    ],
    "4,1": [
     "mountains",
     3
    ],
    "4,2": [
     "fields",
     4
    ],
    "4,3": [
     "mountains",
     6
    ],
    "4,4": [
     "pasture",
     5
    ],
    "4,5": [
     "hills",
     4
    ],
    "4,6": [
     "desert",
     null
    ],
    "5,0": [
     "hills",
     8
    ],
    "5,1": [
     "pasture",
     9
    ],
    "5,4": [
     "hills",
     10
    ],
    "5,7": [
     "gold",
     6
    ],
    "6,2": [
     "forest",
     3
    ],
    "6,4": [
     "forest",
     8
    ],
    "6,5": [
     "fields",
     9
    ],
    "6,7": [
     "forest",
     4
    ],
    "7,1": [
     "mountains",
     5
    ],
    "7,3": [
     "pasture",
     11
    ],
    "7,4": [
     "pasture",
     2
    ],
    "7,6": [
     "fields",
     5
    ]
   },
   "robber": [
    3,
    6
   ],
   "rows": [
    "........",
    "SXXSISSS",
    ".SSSISDS",
    "IIIIIIDS",
    ".IIIIIDS",
    "IISSISSX",
    ".SISIISX",
    "SISIISXS"
   ],
   "tokens": {
    "any": 4,
    "brick": 1,
    "ore": 1,
    "sheep": 1,
    "wheat": 1,
    "wood": 1
   },
   "vp": 10
  },
  "6": {
   "fixed": {
    "0,1": [
     "gold",
     8
    ],
    "1,7": [
     "desert",
     null
    ],
    "1,8": [
     "desert",
     null
    ],
    "2,8": [
     "desert",
     null
    ],
    "3,8": [
     "desert",
     null
    ],
    "5,0": [
     "gold",
     6
    ],
    "5,8": [
     "forest",
     4
    ],
    "6,8": [
     "gold",
     6
    ]
   },
   "harbors": [
    [
     2,
     3,
     "NE"
    ],
    [
     4,
     2,
     "W"
    ],
    [
     2,
     2,
     "NW"
    ],
    [
     6,
     5,
     "SE"
    ],
    [
     3,
     3,
     "SE"
    ],
    [
     5,
     2,
     "W"
    ],
    [
     2,
     1,
     "W"
    ],
    [
     2,
     5,
     "NE"
    ],
    [
     5,
     6,
     "SE"
    ],
    [
     4,
     7,
     "SE"
    ],
    [
     6,
     2,
     "SE"
    ]
   ],
   "isle": null,
   "main": {
    "numbers": [
     2,
     2,
     3,
     3,
     3,
     4,
     4,
     4,
     5,
     5,
     5,
     5,
     6,
     6,
     8,
     8,
     8,
     9,
     9,
     9,
     9,
     10,
     10,
     10,
     10,
     11,
     11,
     11,
     11,
     12,
     12
    ],
    "terrain": {
     "fields": 6,
     "forest": 6,
     "hills": 6,
     "mountains": 6,
     "pasture": 7
    }
   },
   "nored": [
    "3,7",
    "2,7"
   ],
   "printed": {
    "0,1": [
     "gold",
     8
    ],
    "0,3": [
     "pasture",
     10
    ],
    "0,5": [
     "fields",
     12
    ],
    "1,2": [
     "hills",
     11
    ],
    "1,4": [
     "forest",
     11
    ],
    "1,7": [
     "desert",
     null
    ],
    "1,8": [
     "desert",
     null
    ],
    "2,1": [
     "hills",
     2
    ],
    "2,2": [
     "pasture",
     5
    ],
    "2,3": [
     "fields",
     6
    ],
    "2,4": [
     "hills",
     5
    ],
    "2,5": [
     "fields",
     3
    ],
    "2,6": [
     "pasture",
     8
    ],
    "2,7": [
     "forest",
     11
    ],
    "2,8": [
     "desert",
     null
    ],
    "3,1": [
     "fields",
     9
    ],
    "3,2": [
     "mountains",
     3
    ],
    "3,3": [
     "forest",
     4
    ],
    "3,4": [
     "mountains",
     6
    ],
    "3,5": [
     "fields",
     10
    ],
    "3,6": [
     "pasture",
     9
    ],
    "3,7": [
     "hills",
     10
    ],
    "3,8": [
     "desert",
     null
    ],
    "4,2": [
     "hills",
     8
    ],
    "4,3": [
     "pasture",
     5
    ],
    "4,5": [
     "hills",
     4
    ],
    "4,6": [
     "forest",
     8
    ],
    "4,7": [
     "mountains",
     12
    ],
    "5,0": [
     "gold",
     6
    ],
    "5,2": [
     "forest",
     10
    ],
    "5,3": [
     "mountains",
     3
    ],
    "5,5": [
     "mountains",
     9
    ],
    "5,6": [
     "fields",
     4
    ],
    "5,8": [
     "forest",
     4
    ],
    "6,2": [
     "mountains",
     5
    ],
    "6,3": [
     "forest",
     9
    ],
    "6,5": [
     "pasture",
     2
    ],
    "6,6": [
     "pasture",
     11
    ],
    "6,8": [
     "gold",
     6
    ]
   },
   "rows": [
    ".XSISISSS.",
    "SSISISSDD.",
    "SIIIIIIIDS",
    "SIIIIIIID.",
    "SSIISIIISS",
    "XSIISIISX.",
    ".SIISIISX."
   ],
   "tokens": {
    "any": 5,
    "brick": 1,
    "ore": 1,
    "sheep": 2,
    "wheat": 1,
    "wood": 1
   },
   "vp": 10
  }
 }
}
