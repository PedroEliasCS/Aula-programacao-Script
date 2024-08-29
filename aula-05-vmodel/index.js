const { createApp } = Vue;

const inicial = {
  display: "0",
  numeroAtual: "",
  numerooAnterior: "",
  operador: null,
};

createApp({
  data() {
    return {
      nome: "",
      ligado: false,
    };
  },
  methods: {
    onOff() {
      this.ligado = !this.ligado;
    },
  },
}).mount("#app");
