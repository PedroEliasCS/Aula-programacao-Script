const { createApp } = Vue;

// Função para gerar um número aleatório entre min e max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Função para criar um atraso (delay) em milissegundos
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Classe Character (Personagem)
class Character {
  life = 0;
  turnDef = 0;
  atkmin = 0;

  // Construtor da classe Character
  /**
   * Cria uma instância de um personagem com atributos de nome, vida, ataque e defesa.
   *
   * @param {string} nameParam - O nome do personagem.
   * @param {number} [lifeParam=100] - A quantidade de vida inicial do personagem. Padrão é 100.
   * @param {number} [attackParam=35] - O valor de ataque do personagem. Padrão é 35.
   * @param {number} [defenseParam=0] - O valor de defesa do personagem. Padrão é 0.
   */
  constructor(nameParam, lifeParam = 100, attackParam = 35, defenseParam = 0) {
    this.name = nameParam;
    this.defaultLife = lifeParam;
    this.life = this.defaultLife;
    this.attack = attackParam;
    this.atkmin = Number((this.attack / 4).toFixed(0));
    this.defenseStatus = defenseParam;
  }

  // Verifica o estado do personagem
  /**
   * Verifica o estado do personagem.
   * Se a vida do personagem for maior que 0, a função retorna.
   * Caso contrário, exibe um alerta informando que o personagem está morto e lança um erro para parar a execução.
   *
   * @throws {Error} Lança um erro para parar a execução se a vida do personagem for menor ou igual a 0.
   */
  checkState() {
    if (this.life > 0) return;

    alert(`Personagem está morto ${this.nome}`);
    throw new Error(); // Para parar a execução
  }

  // Define a defesa do personagem
  /**
   * Ativa a defesa do jogador no turno atual com um bônus opcional.
   *
   * @param {number} turnAtual - O turno atual do jogo.
   * @param {number} [bonus=0] - O bônus opcional a ser adicionado ao status de defesa.
   * @returns {string} - Retorna uma mensagem indicando que a defesa foi ativada.
   */
  setDefense(turnAtual, bonus = 0) {
    if (this.turnDef <= turnAtual) {
      this.defenseStatus += bonus;
    }

    this.turnDef = turnAtual + bonus;
    return "Defesa ativada";
  }

  // Obtém o status de defesa do personagem
  /**
   * Recupera a defesa atual do personagem. com base no turno
   * @param {*} turnoAtual
   * @returns
   */
  getDefense(turnoAtual) {
    if (this.turnDef < turnoAtual) {
      this.defenseStatus = 0;
    }

    return this.defenseStatus;
  }

  // Função de ataque do personagem
  /**
   * Função de ataque que calcula o dano causado a um jogador.
   *
   * @param {Object} player - O jogador que receberá o ataque.
   * @param {number} turnoAtual - O turno atual do jogo.
   * @returns {string} - Uma mensagem descrevendo o resultado do ataque.
   */
  attackFunction = (player, turnoAtual) => {
    const damage =
      random(this.atkmin, this.attack) - player.getDefense(turnoAtual);

    if (damage <= 0) return `${this.name} atacou e teve um erro critico!`;

    player.life -= damage;

    if (damage === this.attack)
      return `${this.name} atacou e causou um dano critico de ${damage}`;

    return `${this.name} atacou e causou ${damage} de dano`;
  };

  // Usa uma poção para recuperar vida
  /**
   * Usa uma poção para restaurar a vida do personagem.
   *
   * @param {number} [maxRestore=25] - O valor máximo de vida que a poção pode restaurar.
   * @returns {string} - Uma mensagem indicando o resultado do uso da poção.
   */
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

// Classe Player (Jogador) que herda de Character
/**
 * Classe que representa um jogador no jogo.
 *
 * @class Player
 * @extends {Character}
 *
 * @constructor
 * Cria uma instância de Player com o nome "Leon".
 */
class Player extends Character {
  constructor() {
    super("Leon");
  }
}

// Classe Enemy (Inimigo) que herda de Character
/**
 * Classe que representa um inimigo no jogo, herdando de Character.
 *
 * @class Enemy
 * @extends {Character}
 *
 * @constructor
 * Cria uma instância de Enemy com nome "Wesker", vida e força aleatórias, e defesa fixa.
 */
class Enemy extends Character {
  constructor() {
    super("Namesis", random(20, 100) + 50, random(1, 15) + 33, 3);
  }

  // Ação do vilão
  /**
   * Executa uma ação aleatória do vilão durante o turno atual.
   *
   * @param {Object} heroi - O objeto representando o herói.
   * @param {number} turnoAtual - O número do turno atual.
   * @returns {any} - O resultado da ação executada, que pode variar dependendo da ação.
   */
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

// Criação da aplicação Vue
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
    // Verifica se é o turno do jogador
    isTurnPlayer() {
      return Boolean(this.turn % 2 == 0);
    },

    // Verifica o estado do jogo
    check() {
      if (this.player.life <= 0) alert("Você perdeu!");
      else if (this.enemy.life <= 0) alert("Você ganhou!");

      if (this.player.life <= 0 || this.enemy.life <= 0) {
        if (confirm("Jogo acabou! Deseja reiniciar?")) {
          location.reload();
        }
        throw new Error();
      }
    },

    // Próximo turno
    async nextTurn() {
      this.check();

      this.turn++;
      await delay(1500);

      this.display = "Turno do vilão";
      await delay(1500);

      this.display = this.enemy.villainAction(this.player, this.turn);

      await delay(2000);

      this.turn++;
      this.check();

      this.display = "Seu turno!";
    },

    // Ação de atacar
    async atacar() {
      if (!this.isTurnPlayer()) return;

      this.display = this.player.attackFunction(this.enemy, this.turn);
      this.nextTurn();
    },

    // Ação de defender
    async defender() {
      if (!this.isTurnPlayer()) return;
      this.display = this.player.setDefense(this.turn, 5);

      this.nextTurn();
    },

    // Ação de usar poção
    async usarPocao() {
      if (!this.isTurnPlayer()) return;
      this.display = this.player.usePotion();

      this.nextTurn();
    },

    // Ação de fugir
    async fugir() {
      if (!this.isTurnPlayer()) return;
      if (confirm("Deseja fugir?")) {
        alert("A luta vai ser reiniciada!");
        location.reload();
      }

      this.nextTurn();
    },
  },
}).mount("#app");
