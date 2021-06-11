//入力されたIP・バイナリアドレスを取得し、それらを引数にcalculate_date()を実行
function select_address(){
    var binary_address = [];
    var ip_address = [];
    var binary_condition = /([0|1]{8})\s([0|1]{8})\s([0|1]{8})\s([0|1]{8})\s?/;
    var ip_condition = /(\d+).\s?(\d+).\s?(\d+).\s?(\d+).?\s?/;
    if (binary_condition.test(document.getElementById("binary_address").value)){
        var binary_address_text = document.getElementById("binary_address").value;
        var binary_address_group = binary_address_text.match(binary_condition);
        for (var i=1; i<=4; i++){
            binary_address.push(Number(binary_address_group[i]));
        }
        ip_address = select_ip_address(binary_address);
    } else if (ip_condition.test(document.getElementById("ip_address").value)){
        var ip_address_text = document.getElementById("ip_address").value;
        var ip_address_group = ip_address_text.match(ip_condition);
        for (var i=1; i<=4; i++){
            if (Number(ip_address_group[i])<0 || 255<Number(ip_address_group[i])){
                alert("正しい数値を入力してください");
                return;
            } ip_address.push(Number(ip_address_group[i]));
        }
        binary_address = select_binary_address(ip_address);
    } else {
        alert("正しい数値を入力してください");
        return;
    }
    calculate_date(binary_address, ip_address);
}

//IP・バイナリアドレスから他の値を計算、display_date()を実行
function calculate_date(binary, ip){
    var binary_address_result = "";
    var ip_address_result = "";
    var network_part = "";
    var network_address_binary ="";
    var network_address = "";
    var ip_host_address_from = "";
    var ip_host_address_to = "";
    var broadcast_address = "";
    var subnet_mask = "";
    //binary_addressを作成
    for (var i=0; i<4; i++) {
        binary[i] = String(binary[i]);
        for (var j=1; j+binary[i].length<=8; j++) {
            binary_address_result += "0";
        }
        binary_address_result += binary[i] + " ";
    } var binary_element = binary_address_result.split(" ");
    //ip_address_result
    for (var l=0; l<4; l++){
        ip_address_result += ip[l] + ".";
    } 
    //host_partを作成
    var host_part = document.getElementById("host_part").value.split("_");
    var host_part_parcel = host_part[0];
    var host_part_posion = host_part[1];
    var host_part_number = host_part[2];
    //network_partを作成
    for (var s=0; s<host_part_parcel; s++){
        network_part += binary_element[s] + " ";
    } for (var h=0; h<host_part_posion; h++){
        network_part += binary_element[host_part_parcel][h];
    } 
    //network_addressを作成
    network_address_binary = network_part;
    for (var g=1; network_address_binary.length<35; g++){
        if (network_address_binary.length==8 || network_address_binary.length==17 || network_address_binary.length==26){
            network_address_binary += " ";
        } network_address_binary += "0";
    } var network_address_binary_element = network_address_binary.split(" ");
    for (var f=0; f<4; f++){
        network_address += parseInt(network_address_binary_element[f], 2) + ".";
    } 
    //ip_host_address_fromを作成
    var ip_host_address_from_binary = network_address_binary.slice(0, -1);
    ip_host_address_from_binary += "1";
    var ip_host_address_from_binary_element = ip_host_address_from_binary.split(" ");
    for (var a=0; a<4; a++){
        ip_host_address_from += parseInt(ip_host_address_from_binary_element[a], 2) + ".";
    } 
    //ip_host_address_toを作成
    var ip_host_address_to_binary = network_part;
    for (var z=1; ip_host_address_to_binary.length<35; z++){
        if (ip_host_address_to_binary.length==8 || ip_host_address_to_binary.length==17 || ip_host_address_to_binary.length==26){
            ip_host_address_to_binary += " ";
        } ip_host_address_to_binary += "1";
    } var broadcast_address_binary = ip_host_address_to_binary;
    ip_host_address_to_binary = ip_host_address_to_binary.slice(0, -1);
    ip_host_address_to_binary += "0";
    var ip_host_address_to_binary_element = ip_host_address_to_binary.split(" ");
    for (var q=0; q<4; q++){
        ip_host_address_to += parseInt(ip_host_address_to_binary_element[q], 2) + ".";
    } 
    //bradcast_addressを作成
    var broadcast_address_binary_element = broadcast_address_binary.split(" ");
    for (var w=0; w<4; w++){
        broadcast_address += parseInt(broadcast_address_binary_element[w], 2) + ".";
    }
    //subnet_maskを作成]
    var subnet_mask_binary = "";
    for (var r=1; r<=host_part_number; r++){
        subnet_mask_binary += "1";
        if (r==8||r==16||r==24){
            subnet_mask_binary += " ";
        }
    } for (var u=1; subnet_mask_binary.length<35; u++){
        if (subnet_mask_binary.length==8 || subnet_mask_binary.length==17 || subnet_mask_binary.length==26){
            subnet_mask_binary += " ";
        } subnet_mask_binary += "0";
    } var subnet_mask_binary_element = subnet_mask_binary.split(" ");
    for (var e=0; e<4; e++){
        subnet_mask += parseInt(subnet_mask_binary_element[e], 2) + ".";
    }
    display_date(binary_address_result, ip_address_result, network_address, ip_host_address_from, ip_host_address_to, broadcast_address, subnet_mask) ;
}

//画面上の値を書き換える
function display_date(binary_address_result, ip_address_result, network_address, ip_host_address_from, ip_host_address_to, broadcast_address, subnet_mask){
    var display_binary_address_result = document.getElementById("Bi");
    display_binary_address_result.textContent = binary_address_result;
    var display_ip_address_result = document.getElementById("IP");
    display_ip_address_result.textContent = ip_address_result;
    var display_network_address = document.getElementById("net");
    display_network_address.textContent = network_address;
    var display_ip_host_address_from = document.getElementById("from");
    display_ip_host_address_from.textContent = ip_host_address_from;
    var display_ip_host_address_to = document.getElementById("to");
    display_ip_host_address_to.textContent = ip_host_address_to;
    var display_broadcast_address = document.getElementById("broad");
    display_broadcast_address.textContent = broadcast_address;
    var display_subnet_mask = document.getElementById("sub");
    display_subnet_mask.textContent = subnet_mask;
}

//与えられたIPアドレスからバイナリアドレスを計算
function select_binary_address(ip){
    var result = [];
    for (var i=0; i<4; i++) {
        result.push(Number(ip[i].toString(2)));
    } return result;
}

//与えられたバイナリアドレスからIPアドレスを計算
function select_ip_address(binary){
    var result = [];
    for (var i=0; i<4; i++) {
        result.push(parseInt(binary[i], 2));
    } return result;
}


//任意の答えをコピーするボタン機能の実装
//IpAddress
function copyToClipboardIP(){
    //範囲を指定
    let range = document.createRange();
    let span = document.getElementById('IP');
    range.selectNodeContents(span);
  
    //指定した範囲を選択状態にする
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  
    //コピー
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }

//BinaryAddress
function copyToClipboardBi(){
    let range = document.createRange();
    let span = document.getElementById('Bi');
    range.selectNodeContents(span);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }

//NetworkAddress
function copyToClipboardNet(){
    let range = document.createRange();
    let span = document.getElementById('net');
    range.selectNodeContents(span);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }

//IpHostAddressFrom
function copyToClipboardFrom(){
    let range = document.createRange();
    let span = document.getElementById('from');
    range.selectNodeContents(span);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }

//IpAddressTo
function copyToClipboardTo(){
    let range = document.createRange();
    let span = document.getElementById('to');
    range.selectNodeContents(span);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }

//BroadcastAddress
function copyToClipboardBroad(){
    let range = document.createRange();
    let span = document.getElementById('broad');
    range.selectNodeContents(span);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }

//SubnetMask
function copyToClipboardSun(){
    let range = document.createRange();
    let span = document.getElementById('sub');
    range.selectNodeContents(span);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('コピーしました! Copy to Clipboard!');
  }
