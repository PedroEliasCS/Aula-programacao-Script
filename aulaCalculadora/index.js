const { createApp } = Vue;

const inicial = {
  display: "0",
  numeroAtual: "",
  numerooAnterior: "",
  operador: null,
};

createApp({
  data() {
    return inicial;
  },
  methods: {
    lidarBotao(botao) {
      console.log(botao);
      switch (botao) {
        case "*":
          this.lidarOperador(botao);
          return;
        case "/":
          this.lidarOperador(botao);
          return;
        case "+":
          this.lidarOperador(botao);
          return;
        case "-":
          this.lidarOperador(botao);
          return;
        case ".":
          this.lidarDecimal();
          return;
        case "=":
          this.lidarIgual();
          return;
        case "AC":
          this.lidarClean();
          return;
        default:
          this.lidarNumero(botao);
          return;
      }
    },

    lidarClean() {
      this.display = "";
      this.numeroAtual = "";
      this.numerooAnterior = "";
      this.operador = null;
    },

    lidarNumero(numero) {
      this.numeroAtual = this.numeroAtual + numero;
      this.display = `${this.numeroAnterior || ""} ${this.operador || ""} ${
        this.numeroAtual
      }`;
    },
    lidarOperador(botao) {
      if (!!this.numeroAtual && !!this.numeroAnterior && !!this.operador) {
        console.log("entrou");
        this.lidarIgual();
      }

      console.log({
        a1: this.numeroAnterior,
        a2: this.numeroAtual,
      });

      if (this.numeroAtual != "") this.numeroAnterior = this.numeroAtual;
      this.operador = botao;
      this.numeroAtual = "";
      this.display = `${this.numeroAnterior} ${this.operador}`;
    },
    lidarIgual() {
      switch (this.operador) {
        case "*":
          this.display = this.numeroAnterior * this.numeroAtual;
          break;
        case "-":
          this.display = this.numeroAnterior - this.numeroAtual;
          break;
        case "+":
          this.display = Number(this.numeroAnterior) + Number(this.numeroAtual);
          break;
        case "/":
          this.display = this.numeroAnterior / this.numeroAtual;
          break;
      }

      this.numeroAnterior = "";
      this.numeroAtual = "";
      this.operador = null;
      this.numeroAtual = this.display;

      console.log("Atual", this.numeroAtual);
    },
  },
}).mount("#app");
