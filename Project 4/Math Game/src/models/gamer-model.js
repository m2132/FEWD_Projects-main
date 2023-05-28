export default class Gamer {
    constructor (name, history, isEnable = false) {
        this.name = name;
        this.isEnable = isEnable; 
        this.number = Math.floor(Math.random() * 100);
        this.steps = 0;
        this.score = 100;
        this.history = history ?? [];
    }
}