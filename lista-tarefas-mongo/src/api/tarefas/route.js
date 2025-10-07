<<<<<<< HEAD
//rotas  GET e POST

import tarefa from "@/models/tarefa";
=======
// rotas GET e POST

import Tarefa from "@/models/Tarefa";
>>>>>>> 4b0e7b0873497b3b2647e506f83a01ff5effcf1b
import connectMongo from "@/services/mongodb";
import { NextResponse } from "next/server";

//get
export async function GET(){
<<<<<<< HEAD
    try{
        await connectMongo(); //connecta com o mongoDB
        const tarefas = await tarefa.find//retorna as tarefas
        //usando o método NextResponse=> fazer as requisições HTTP
        return NextResponse.json(tarefas, {status: 200});
    }catch (error) {
        return NextResponse.json(
            {error: "Erro ao buscar as tarefas"},
=======
    try {
        await connectMongo(); //connecta com o mongoDB
        const tarefas = await Tarefa.find({}); //retorna as tarefas
        //usando o médoto NextResponse=> fazer a requisições http
        return NextResponse.json(tarefas, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao Buscar as Tarefas"},
>>>>>>> 4b0e7b0873497b3b2647e506f83a01ff5effcf1b
            {status: 500}
        );
    }
}

<<<<<<< HEAD
//post
export async function POST(tarefa){
    try {
        await connectMongo();
        const data = await tarefa.json(); //transforma os dados  em Json para enviar a requisição HTTP
        const body = await tarefa.create(data); //crie a tarefa no BD
        return NextResponse.json(body, {status:201});
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao criar as tarefas" },
            { status: 500 }
        );
    }
=======
//POST
export async function POST(tarefa){
    try {
        await connectMongo();
        const data = await tarefa.json(); // transforma os dados em Json para enviar a requisição http
        const body = await Tarefa.create(data); //cria a tarefa no BD
        return NextResponse.json(body, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao criar as tarefas"},
            {status: 500}
        );
    }
    
>>>>>>> 4b0e7b0873497b3b2647e506f83a01ff5effcf1b
}