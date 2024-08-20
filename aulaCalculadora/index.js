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
      this.display = "Clean";
      this.numeroAtual = "";
      this.numerooAnterior = "";
      this.operador = null;
    },

    lidarNumero(numero) {
      this.numeroAtual = this.numeroAtual + numero;
      this.display = this.numeroAtual;
    },
  },
}).mount("#app");