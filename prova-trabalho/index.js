const { createApp } = Vue;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Character {
  life = 0;
  turnDef = 0;
  constructor(nameParam, lifeParam = 100, attackParam = 10, defenseParam = 5) {
    this.name = nameParam;
    this.defaultLife = lifeParam;
    this.life = this.defaultLife;
    this.attack = attackParam;
    this.defenseStatus = defenseParam;
  }

  checkState() {
    if (this.life > 0) return;

    alert(`Personagem está morto ${this.nome}`);

    throw new Error();
    // Para parar a execuçâo
  }

  setDefense(turnAtual) {
    if (this.turnDef < turnAtual) {
      this.defense += 5;
    }

    this.turnDef = turnAtual + 5;

    return "Defesa ativada";
  }

  getDefense(turnoAtual) {
    if (this.turnDef < turnoAtual) {
      this.defenseStatus = 0;
    }

    return this.defenseStatus;
  }

  /**
   * Ataca o combate
   */
  attackFunction = (player, turnoAtual) => {
    const damage = random(1, this.attack) - player.getDefense(turnoAtual);
    player.life -= damage;

    return `${this.name} atacou e casou ${damage} de dano`;
  };

  usePotion = (maxRestore = 25) => {
    this.checkState();

    if (this.life >= this.defaultLife) return "Vida está cheia!";
    const vidaRecuperada = random(1, maxRestore);

    const vidaFutura = this.life + vidaRecuperada;

    if (vidaFutura > this.defaultLife) {
      this.life = this.defaultLife;
      return "Recuperou toda a vida";
    }

    this.life += vidaRecuperada;

    return `Poção usada e recuperou ${vidaRecuperada} de vida`;
  };
}

class Player extends Character {
  constructor() {
    super("Leon");
  }
}

class Enemy extends Character {
  constructor() {
    super("Wesker", 120, 15, 7);
  }

  villainAction(heroi, turnoAtual) {
    const randomAction = random(0, 2);

    switch (randomAction) {
      case 0:
        return this.attackFunction(heroi, turnoAtual);
      case 1:
        return this.setDefense(turnoAtual);
      case 2:
        return this.usePotion();
    }
  }
}

createApp({
  data() {
    return {
      player: new Player(),
      enemy: new Enemy(),
      turn: 0,
      display: "Seu turno!",
    };
  },
  methods: {
    isTurnPlayer() {
      return Boolean(this.turn % 2 == 0);
    },

    check() {
      console.log({
        player: this.player,
        enemy: this.enemy,
        turn: this.turn,
      });
    },

    async nextTurn() {
      this.turn++;

      this.display = "Turno do vilão";
      await delay(1000);

      this.display = this.enemy.villainAction(this.player, this.turn);

      await delay(1000);

      this.turn++;

      this.check();

      this.display = "Seu turno!";
    },
    async atacar() {
      this.display = this.player.attackFunction(this.enemy, this.turn);

      await delay(1500);

      this.nextTurn();
    },
    async defender() {
      this.player.defense += 5;

      this.nextTurn();
    },
    async usarPocao() {
      this.player.usePotion();

      this.nextTurn();
    },
    async fugir() {
      alert("fug");

      this.nextTurn();
    },
  },
}).mount("#app");
