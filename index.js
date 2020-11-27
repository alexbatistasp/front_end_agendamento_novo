function autenticar(){

    //recuperar os dados digitados 
    var txtLogin = document.getElementById("InputEmailRacf").value;
    var txtSenha = document.getElementById("InputSenha").value;
    console.log("DEBUG = digitados: "+txtLogin +" / "+txtSenha);
    //carregando objeto com os elementos
    var msgBody = {
        email : txtLogin,
        racf : txtLogin,
        senha : txtSenha
    };
    //Montar requisicao a partir do objeto
    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "content-type" :"application/json"
        }
    };

    //Enviar para o backend
    fetch("http://localhost:8080/login", cabecalho).then(resposta =>trataResposta(resposta));
}

function trataResposta(resposta){
    if (resposta.status == 200 ){
        resposta.json().then(user => efetivaLogin(user));
    } else if (resposta.status == 401){
        document.getElementById("msg").innerHTML = "Senha Invalida!"
    }  else if (resposta.status == 404){
        document.getElementById("msg").innerHTML = "Usuário não encontrado"
    } else {
        document.getElementById("msg").innerHTML = "Erro desconhecido!"
    }
    
}


function efetivaLogin(user){
    //console.log("Usuário Recebido");
    //console.log(user);
    //Armazenando o objeto no cache local 
    localStorage.setItem("userSCHED",JSON.stringify(user));
    // redirecionar para pagina de relatórios
    window.location = "relatorio.html"
}