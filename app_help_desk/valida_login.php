<?php
    session_start();

    //variacel que verifica se a autenticação foi realizada
    $valido = false;
    $usuario_id = null;
    $usuario_perfil_id = null;

    $perfis = array(1=> 'Administrativo', 2 => 'Usuário');

    //usuarios do sistema
    $usuarios_app = array(
        array('id'=> 1, 'email' => 'adm@teste.com.br', 'senha' => '1234', 'perfil_id' => 1),
        array('id'=> 2, 'email' => 'user@teste.com.br', 'senha' => '1234', 'perfil_id' => 1),
        array('id'=> 3, 'email' => 'jose@teste.com.br', 'senha' => '1234', 'perfil_id' => 2),
        array('id'=> 4, 'email' => 'maria@teste.com.br', 'senha' => '1234', 'perfil_id' => 2)
    );

    foreach($usuarios_app as $user){
        if($user['email'] == $_POST['email']){
            if($user['senha'] == $_POST['senha']){
                $valido = true; 
                $usuario_id = $user['id'];
                $usuario_perfil_id = $user['perfil_id'];
            }
        }
    }

    if($valido){
        echo 'Usuário autenticado';
        $_SESSION['autenticado'] = 'Sim';
        $_SESSION['id'] = $usuario_id;
        $_SESSION['perfil_id'] = $usuario_perfil_id;
        header('Location: home.php');
    }else{
        $_SESSION['autenticado'] = 'Não';
        header('Location: index.php?login=erro');
    }


?>