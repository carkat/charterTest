//accepts a JSON object of shapes with a neighbor property
//gets the keys from that object for the purposes of recursiv iteration
//and returns a json object of shapes with neighbors + color property

//please note, I don't like the use of the counter incrementing here, but given the time constraints, I used the most convenient solution
//I also don't like all the mutation with keys.splice
//a better solution for both instances would be an iterator over an iterable object, calling ".next" each recursive iteration
//should make keys an iterable and colors iterable as well
let generateColorsForShapes = (
    shapes, 
    keys = Object.keys(shapes), 
    colorCount = 0
) =>  {
    //"this" shape for "this" recursive iteration
    const shape                    = keys[0]
    const neighbors                = shapes[shape].neighbors.split(',')
    const neighborCount            = neighbors.length
    const removedNeighboringColors = colors.filter(color => !neighbors.map(n => shapes[n].color).includes(color))

    //set the color based on the number of neighbors
    shapes[shape].color = removedNeighboringColors[colorCount++ % removedNeighboringColors.length]

    //"pop front", remove the first element from keys and recurse if there are any keys left
    const keysPopFront = keys.slice(1,keys.length)
    return keysPopFront.length === 0 ? shapes : generateColorsForShapes(shapes, keysPopFront, colorCount)
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
let colors = ['red', 'green','blue','yellow']

//set the color property on shapes then print the result for demonstration
const shapesWithColors = generateColorsForShapes(shapes)
console.log(shapesWithColors)
