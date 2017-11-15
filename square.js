//accepts a JSON object of shapes with a neighbor property
//gets the keys from that object for the purposes of recursiv iteration
//and returns a json object of shapes with neighbors + color property

//please note, I don't like the use of the counter incrementing here, but given the time constraints, I used the most convenient solution
//I also don't like all the mutation with keys.splice
//a better solution for both instances would be an iterator over an iterable object, calling ".next" each recursive iteration
let generateColorsForShapes = (shapes, keys = Object.keys(shapes), colorCount = 0) =>  {
    //"this" shape for "this" recursive iteration
    let shape = keys[0]
    let neighbors = shapes[shape].neighbors.split(',')
    let neighborCount = neighbors.length
    let tempColors = colors


    //should remove neighboring colors from the list of colors
    for(neighbor of neighbors){
        let aNeighbor = shapes[neighbor]
        if(aNeighbor.color)
            tempColors = tempColors.filter(color => aNeighbor.color)
    }

    //set the color based on the number of neighbors
    const ifCountIsGreaterThanThreeUniqueColor = neighborCount > 3 
    ? shapes[shape].color = largeNeighborCountReservedColor
    //selects a color from the filtered list of colors and uses the modulus operator to select a color within range
    : shapes[shape].color = tempColors[colorCount++ % tempColors.length]

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
