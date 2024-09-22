const { createApp } = Vue;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Character {
  life = 0;
  turnDef = 0;
  constructor(nameParam, lifeParam = 100, attackParam = 20, defenseParam = 0) {
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

  setDefense(turnAtual, bonus = 0) {
    console.log("dentro");
    console.log(this.turnDef, turnAtual);

    if (this.turnDef <= turnAtual) {
      console.log("dae");
      this.defenseStatus += bonus;
    }

    this.turnDef = turnAtual + bonus;

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
    const damage = random(2, this.attack) - player.getDefense(turnoAtual);

    if (damage <= 0) return `${this.name} atacou e teve um erro critico!`;

    player.life -= damage;

    if (damage === this.attack)
      return `${this.name} atacou e causou um dano critico de ${damage}`;

    return `${this.name} atacou e causou ${damage} de dano`;
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
    super("Wesker", random(20, 100) + 50, random(1, 15) + 10, 3);
  }

  villainAction(heroi, turnoAtual) {
    const randomAction = random(0, 2);

    switch (randomAction) {
      case 0:
        return this.attackFunction(heroi, turnoAtual);
      case 1:
        return this.setDefense(turnoAtual, 3);
      case 2:
        return this.usePotion(10);
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

      if (this.player.life <= 0) alert("Você perdeu!");
      else if (this.enemy.life <= 0) alert("Você ganhou!");

      if (this.player.life <= 0 || this.enemy.life <= 0) {
        if (confirm("Jogo acabou! Deseja reiniciar?")) {
          location.reload();
        }
        throw new Error();
      }
    },

    async nextTurn() {
      this.check();

      await delay(1500);

      this.turn++;

      this.display = "Turno do vilão";
      await delay(1500);

      this.display = this.enemy.villainAction(this.player, this.turn);

      await delay(2000);

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
      this.display = this.player.setDefense(this.turn, 5);

      this.nextTurn();
    },
    async usarPocao() {
      this.display = this.player.usePotion();

      this.nextTurn();
    },
    async fugir() {
      if (confirm("Deseja fugir?")) {
        alert("A luta vai ser reiniciada!");
        location.reload();
      }

      this.nextTurn();
    },
  },
}).mount("#app");
