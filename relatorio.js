var listaCSV;

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
    res = fetch("http://agendador-isidrovisk.herokuapp.com/agencias)
    lista = res.json();
    preenche(lista);
    */
    fetch("http://agendador-isidrovisk.herokuapp.com/agencias")
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

function preencheRelatorio(lista){
    var rel = "";
    listaCSV = lista;
    for (i=0; i<lista.length; i++){
        var ag = lista[i];

        rel = rel + `<div class="row linharelatorio">
                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1 col-xl-2">
                           ${ag.dataAgendamento}
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1 col-xl-1">
                           ${ag.horaAgendamento}
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-4 col-xl-4">
                           ${ag.nomeCliente}
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                           ${ag.emailCliente}
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-2">
                           ${ag.celularCliente}
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                           Agencia: ${ag.agencia.nome}
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                           ${ag.observacao}
                        </div>
                    </div>`;
    }
    document.getElementById("relatorio").innerHTML = rel;
    document.getElementById("btnPDF").style="visibility: visible;";
    document.getElementById("btnCSV").style="visibility: visible;";

}

function gerarRelatorio(){
    // antes de mais nada....
    var opcao = 0;
    var opAg, opData, opCli;
    var paramData = "0000-00-00";
    var paramNome = "***";
    var paramAgen = 0;
    if (document.getElementById("chkAgencia").checked){
        opAg = 1;
        paramAgen = parseInt(document.getElementById("txtAgencia").value);
    }
    else{
        opAg = 0;
    }

    if (document.getElementById("chkData").checked){
        opData = 2;
        paramData = document.getElementById("txtData").value;
    }
    else{
        opData = 0;
    }

    if (document.getElementById("chkCliente").checked){
        opCli = 4;
        paramNome = document.getElementById("txtCliente").value;
    }
    else{
        opCli = 0;
    }

    opcao = opAg + opData + opCli;
    console.log("Opcao selecionada = "+opcao);

    var url = "http://agendador-isidrovisk.herokuapp.com/agendamentos?mode="+opcao+"&dataAg="+paramData+"&idAgencia="+paramAgen+"&nome="+paramNome;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(lista => preencheRelatorio(lista));
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

function exportarCSV(){
  
    var strCSV = "";
    for (i=0;i<listaCSV.length; i++){
        var ag = listaCSV[i];
        strCSV = strCSV + ag.dataAgendamento + ";" +
                          ag.horaAgendamento + ";" +
                          ag.agencia.nome + ";" +
                          ag.nomeCliente + ";" +
                          ag.emailCliente + ";" +
                          ag.celularCliente + ";" +
                          ag.observacao + "\n";
    }
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(strCSV);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'agendamentos.csv';
    hiddenElement.click();
}

function showAg(){
   document.getElementById("selectAgencia").style="visibility: visible;";
    
}
function showDt(){
    document.getElementById("txtData").style="visibility: visible;";
}

function showCli(){
    document.getElementById("txtCliente").style="visibility: visible;";
}