function Iterator(data){
    let count = 0
    const _data = data
    
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
//gets the keys from that object for the purposes of recursiv iteration
//and returns a json object of shapes with neighbors + color property

//please note, I don't like the use of the counter incrementing here, but given the time constraints, I used the most convenient solution
//I also don't like all the mutation with keys.splice
//a better solution for both instances would be an iterator over an iterable object, calling ".next" each recursive iteration
//should make keys an iterable and colors iterable as well
let generateColorsForShapes = (
    shapes, 
    keys = new Iterator(Object.keys(shapes)), 
    colors = new Iterator(['red', 'green','blue','yellow'])
) =>  {
    //"this" shape for "this" recursive iteration
    const shape            = keys.next()
    const neighbors        = shapes[shape].neighbors.split(',')
    const noNeighborColors = colors.filter(color => !neighbors.map(n => shapes[n].color).includes(color))

    shapes[shape].color = noNeighborColors.next()

    //"pop front", remove the first element from keys and recurse if there are any keys left
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

//default color data

//set the color property on shapes then print the result for demonstration
const shapesWithColors = generateColorsForShapes(shapes)
console.log(shapesWithColors)

