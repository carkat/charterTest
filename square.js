//accepts a JSON object of shapes with a neighbor property
//gets the keys from that object for the purposes of recursiv iteration
//and returns a json object of shapes with neighbors + color property
let generateColorsForShapes = (shapes, keys = Object.keys(shapes), colorCount = 0) =>  {
    //"this" shape for "this" recursive iteration
    let shape = keys[0]
    let neighborCount = shapes[shape].neighbors.split(',').length

    //set the color based on the number of neighbors
    const ifCountIsGreaterThanThreeUniqueColor = neighborCount > 3 
    ? shapes[shape].color = largeNeighborCountReservedColor
    : shapes[shape].color = colors[colorCount++%3]

    //"pop front", remove the first element from keys and recurse if there are any keys left
    keys.splice(0,1)
    return keys.length === 0 ? shapes : generateColorsForShapes(shapes, keys, colorCount)
}

//default data
//this defines a shape, and lists all of a shapes neighbors
let shapes = {
    a: {
       neighbors: "b,c,e"
    },
    b: {
       neighbors: "a,c,d"
    },
    c: {
       neighbors: "a,b,d,e,f"
    },
    d: {
        neighbors: "c,b,d",
    },
    e: {
        neighbors: "a,c,f",
    },
    f: {
       neighbors: "e,c,d"
    }
}

//default color data
let colors = ['red', 'green','blue']
let largeNeighborCountReservedColor = 'yellow'

//set the color property on shapes then print the result for demonstration
const shapesWithColors = generateColorsForShapes(shapes)
console.log(shapesWithColors)
