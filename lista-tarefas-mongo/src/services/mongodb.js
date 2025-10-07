//fazer a conexão com o MongoDB (mongoose)

<<<<<<< HEAD
const { default: mongoose } = require("mongoose")


// arrowFunction 

const connectMongo =  async () => {

    mongoose.connect(process.env.DATABASE_URL) //estabelecer conexão com DB
        .then(()=> console.log("Conectado com o MongoDB"))
        .catch(err => console.error("Erro ao conectar", err));

        //conexão simples com mongoDB
}

export default connectMongo;
//modulo pode ser usado em outras ações do código
=======

// arrowFunction

const connectMongo = async () => {

    mongoose.connect(process.env.DATABASE_URL) //estabelece conexão com o database
    .then(()=> console.log("Conectado com o MongoDB"))
    .catch(err => console.error("Erro ao conectar", err));

    //conexão simples com mongoDB
}

export default connectMongo;
// modulo pode ser usado em outras ações do código
>>>>>>> 4b0e7b0873497b3b2647e506f83a01ff5effcf1b
