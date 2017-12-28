<?php
	
    $jsondata = fopen('./data-1.json','r');
    $data=fread($jsondata, filesize('./data-1.json'));
    fclose($jsondata);
    
    echo json_encode($data,true);   
?>