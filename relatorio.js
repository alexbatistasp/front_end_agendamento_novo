function validaUser(){

    var user = localStorage.getItem("userSCHED");

    if (!user){  //se o objeto nao existe no localStorage, redireciona para o index
        window.location = "index.html";
    }

    var userObj = JSON.parse(user); // "desconverto" a String JSON para um objeto javascript

    document.getElementById("fotoUser").innerHTML = `<img src="${userObj.linkfoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML = `<h4> ${userObj.nome} </h4>
                                                    <p> Email: ${userObj.email} </p>
                                                    <p> Racf : ${userObj.racf} </p>
                                                    `;
    carregaAgencias();
}


function carregaAgencias(){
    // 

    /*
    pensando "estruturado"
    res = fetch("http://localhost:8080/agencias)
    lista = res.json();
    preenche(lista);
    */
    fetch("http://localhost:8080/agencias")
         .then(res => res.json())   // se eu receber uma resposta, vou ter q extrair o JSON da resposta
         .then(lista => preenche(lista)) // se der cert, passo isso para uma função que irá gerar dinamicamente meu select
}

function preenche(lista){

    var htmlSelect = `<select id="txtAgencia" class="form-control" oninput="montahoras()">`;

    for (i=0; i<lista.length; i++){
        var ag = lista[i]; // apenas para facilitar a manipulacao
        htmlSelect = htmlSelect + `<option value="${ag.id}">${ag.nome}</option>`;
    }
    htmlSelect = htmlSelect + `</select>`;
    document.getElementById("selectAgencia").innerHTML =htmlSelect;
}

function gerarRelatorio(){
    // antes de mais nada....
    var opcao = 0;
    var opAg, opData, opCli;
    if (document.getElementById("chkAgencia").checked){
        opAg = 1;
    }
    else{
        opAg = 0;
    }

    if (document.getElementById("chkData").checked){
        opData = 2;
    }
    else{
        opData = 0;
    }

    if (document.getElementById("chkCliente").checked){
        opCli = 4;
    }
    else{
        opCli = 0;
    }

    opcao = opAg + opData + opCli;
    console.log("Opcao selecionada = "+opcao);

}


function limpaUser(){

    var user = localStorage.getItem("userSCHED");

    if (!user){  //se o objeto nao existe no localStorage, redireciona para o index
        window.location = "index.html";
    } else {
        localStorage.removeItem("userSCHED");
        window.location = "index.html";
    }
}