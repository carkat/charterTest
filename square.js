function Iterator(data){
    //private
    let count = 0
    const _data = data
    
    //public methods
    this.last = function(){
        return _data[_data.length-1]
    }
    this.isLast = function(){
        return this.last() === this.current()
    }
    this.current = function(){
        return _data[count - 1 > 0 ? count - 1 : 0  % _data.length]
    }
    this.next = function() {
        let r = _data[count++ % _data.length]
        return r
    }
    this.filter = function(fn){
        return new Iterator(_data.filter(fn))
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
    //"this" shape for "this" recursive iteration
    const shape            = keys.next()
    const neighbors        = shapes[shape].neighbors.split(',')

    //filter out neighboring colors from the list of colors
    const noNeighborColors = colors.filter(color => !neighbors.map(n => shapes[n].color).includes(color))
    shapes[shape].color = noNeighborColors.next()

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

