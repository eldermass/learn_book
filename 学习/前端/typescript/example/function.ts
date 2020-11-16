interface Add {
    (x: number, y: number): number
}

let add: Add = (x, y) => x + y

let myAdd: (base: number, increment: number) => number = (x, y) => x + y

// this 参数

interface Card {
    suit: string
    card: number
}

interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            let pickedSuit = Math.floor(pickedCard / 13)

            return {
                suit: this.suits[pickedSuit],
                card: pickedCard % 13,
            }
        }
    },
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log(pickedCard)

// 重载
function overload(x: string): number
function overload(x: number): string

function overload(x) {
    if (typeof x == "number") {
        return x + ""
    } else if (typeof x === "string") {
        return Number(x)
    }
}
