<? require_once("validador_acesso.php") ?>

<?php
  //chamados
  $chamados = array();

  //abrir o arquivo.hd
  $arquivo = fopen('../../app_help_desk/arquivo.hd', 'r');

  //enquanto ouver registros (linhas) a serem recuperados
  while(!feof($arquivo)){ //testa pelo fim do arquivo
    //linhas
    $registro = fgets($arquivo);
    $chamados[] = $registro;
  }

  //fechando o arquivo arberto
  fclose($arquivo);

?>

<html>
  <head>
    <meta charset="utf-8" />
    <title>App Help Desk</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <style>
      .card-consultar-chamado {
        padding: 30px 0 0 0;
        width: 100%;
        margin: 0 auto;
      }
    </style>
  </head>

  <body>

    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        App Help Desk
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="logoff.php">Sair</a>
        </li>
      </ul>
    </nav>

    <div class="container">    
      <div class="row">

        <div class="card-consultar-chamado">
          <div class="card">
            <div class="card-header">
              Consulta de chamado
            </div>
            
            <div class="card-body">
              
            <? foreach($chamados as $chamado){ ?>

              <?php
                $chamado_dados = explode('#', $chamado);
                $titulo = $chamado_dados[1];
                $categoria = $chamado_dados[2];
                $descricao = $chamado_dados[3];
            
                //
                if($_SESSION['perfil_id'] == 2){
                  //só vamos exibir o chamado, se ele for criado cpelo usuario
                  if($_SESSION['id'] != $chamados[0]){
                    continue;
                  }
                }

                if(count($chamado_dados) < 3){
                  continue;
                }  
              ?>

              <? if(!empty($chamado)){ ?>
                <div class="card mb-3 bg-light">
                  <div class="card-body">
                    <h5 class="card-title"><?= $titulo ?></h5>
                    <h6 class="card-subtitle mb-2 text-muted"><?=$categoria?></h6>
                    <p class="card-text"><?=$descricao?></p>

                  </div>
                </div>
              <? } ?>
            <?}?>
              <div class="row mt-5">
                <div class="col-6">
                  <a class="btn btn-lg btn-warning btn-block" href="home.php">Voltar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>