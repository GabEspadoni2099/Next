//rotas que não precisam de ID ( GET / POST )

import { createUsuario, getUsuarios } from "@/controllers/UsuarioController";
import { NextRequest, NextResponse } from "next/server";


// http -> request
export async function GET() {
    try {
        const data = await getUsuarios(); //busca todos os dados da coleção
        return NextResponse.json({sucess:true, data:data});
    } catch (error) {
        return NextResponse.json({sucess:false, error:error})
    }
}

export async function POST(req: NextRequest) {//passa os dados do HTML
    try {
        const data = await req.json(); //converte o req em json
        const novoUsuario = await createUsuario(data);//faz a solicitação http
        return NextResponse.json({sucess:true, data: novoUsuario});//retorna os dados apos inserir usuario no banco
    } catch (error) {
        //retorna o erro, se der erro
        return NextResponse.json({ sucess : false, error: error });
    }
    
}