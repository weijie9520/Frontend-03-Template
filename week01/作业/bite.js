// 用 JavaScript 去设计狗咬人的代码

class Behavior {
  bite(thing) {
    if (this.hasMouth) {
      if (thing && thing.beBitten) {
        thing.beBitten();
      }
    }
  }
  beBitten() {
    if (this.isCreature) {
      console.log("疼");
    } else {
      console.log("坏掉了");
    }
  }
}

class Dog extends Behavior {
  constructor() {
    super();
    this.hasMouth = true;
    this.isCreature = true;
  }
}

class Human extends Behavior {
  constructor() {
    super();
    this.hasMouth = true;
    this.isCreature = true;
  }
}

const human = new Human();
const dog = new Dog();

dog.bite(human);
