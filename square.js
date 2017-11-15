function Iterator(data){
    //private
    let count = 0

    //public methods
    this.last = function(){
        return data[data.length-1]
    }
    this.isLast = function(){
        return this.last() === this.current()
    }
    this.current = function(){
        return data[count - 1 > 0 ? count - 1 : 0  % data.length]
    }
    this.next = function() {
        let r = data[count++ % data.length]
        return r
    }
    this.filter = function(fn){
        return new Iterator(data.filter(fn))
    }
    return this
}

//accepts a JSON object of shapes with a neighbor property
//iterates of the keys of the JSON object
//and returns a json object of shapes with neighbors + color property
let generateColorsForShapes = (
    shapes, 
    keys = new Iterator(Object.keys(shapes)), 
    colors = new Iterator(['red', 'green','blue','yellow'])
) =>  {
    //get shape, and list of neighboring shapes for current iteration
    const shape     = keys.next()
    const neighbors = shapes[shape].neighbors.split(',')

    //remove all neighboring colors and assign the next available color
    const noNeighboringColors = colors.filter(color => !neighbors.map(n => shapes[n].color).includes(color))
    shapes[shape].color       = noNeighboringColors.next()

    //if this is the last key in shapes, return the new shapes object, otherwise continue recursion
    return keys.isLast() ? shapes : generateColorsForShapes(shapes, keys, colors)
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

//set the color property on shapes then print the result for demonstration
const shapesWithColors = generateColorsForShapes(shapes)
console.log(shapesWithColors)

