
const criaDespesa = (ano, mes, dia, tipo, descricao, valor) => (
    {
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor,

        validarDados() {
            let valida = true;
            for(let i in this){
                if(this[i] == undefined || this[i] == '' || this[i] ==  null){
                    valida = false;
                }
            }
            return valida;
        }
    })

class Bd {

    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', 0);
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }
    
    gravar(despesa){
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(despesa));

        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array();

        let id = localStorage.getItem('id');

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i<= id; i++){

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i));

            //validando se a despesa é diferente de null
            if(despesa === null){
                continue;
            }

            despesa.id = i;
            despesas.push(despesa);
        }
       
        return despesas;
    }   

    pesquisar(despesa){

        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();

        //filtrar por ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => despesa.ano == d.ano);
        }

        //filtrar por mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => despesa.mes == d.mes);
        }

        //filtrar por dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => despesa.dia == d.dia);
        }

        //filtrar por tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => despesa.tipo == d.tipo);
        }

        //filtrar por descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => despesa.descricao == d.descricao);
        }

        //filtrar por valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => despesa.valor == d.valor);
        }

        return despesasFiltradas;
    }

    remover(id) {
        localStorage.removeItem(id);
    }
}

let bd = new Bd();


function cadastrarDespesa() {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = criaDespesa(ano, mes, dia, tipo, descricao, valor);
        

    if(despesa.validarDados()){
        bd.gravar(despesa);

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_descricao').innerHTML = 'Despesa Registrada com sucesso!'
        document.getElementById('modal_button_voltar').className = 'btn btn-success'
        document.getElementById('modal_button_voltar').innerHTML = 'Voltar'

        const modal = new bootstrap.Modal(document.getElementById('modal_Registra_Despesa'));
        modal.show();

        document.getElementById('ano').value = '';
        document.getElementById('mes').value = '';
        document.getElementById('dia').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';

    }else{

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_descricao').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_button_voltar').className = 'btn btn-danger'
        document.getElementById('modal_button_voltar').innerHTML = 'Voltar e corrigir'

        const modal = new bootstrap.Modal(document.getElementById('modal_Registra_Despesa'));
        modal.show();

    }
}

function carregaListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros();
    }

    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

    despesas.forEach(function(d) {
        
        //criando a linha (tr)
        let linha = listaDespesas.insertRow();

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`; 

        //ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao; 
        linha.insertCell(3).innerHTML = d.valor;
        
        //criar o botão de exclusão
        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`;
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id);
            window.location.reload();
        }
        linha.insertCell(4).append(btn);

        console.log(d)
    })

}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    //criando a despesa que vai ser usada na filtragem
    const despesaPesquisada = criaDespesa(ano, mes, dia, tipo, descricao, valor);

    let despesas = bd.pesquisar(despesaPesquisada);

    if(despesas.length != 0){
        carregaListaDespesas(despesas, true);
    }
    carregaListaDespesas(despesas);

}