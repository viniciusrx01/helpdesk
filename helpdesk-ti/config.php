<?php
    $dbHost = 'Localhost';
    $dbUsername = 'root';
    $dbPassword = 'Wolf_*!@1988';
    $dbName = 'helpdesk_ti';

    $conexao = new mysqli(dbHost,dbUsername,dbPassword,dbName);

    if($conexao->connect_errno)
    {
        echo "Erro";
    }

    else
    {
        echo "Conexão efetuada com sucesso";
    }



?>