
// get  set是默认执行
let mine = {
    _name:'黄宇荐',
    get name(){
        return 'getter' + this._name
    },
    set name(val){
        this._name = 'setter' + val
    }
}

console.log(mine.name)
mine.name = '番禺地'
console.log(mine.name)
