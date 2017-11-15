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

module.exports = Iterator