var socket = io.connect('http://192.168.1.69:8080/', { 'forceNew': true } );
/*socket.on('messages', function(data){
    console.log(data);
    render(data);
});*/

/*function render(data){
    var html = `<div>
                    <strong>${data.author}</strong>
                </div>`;

    $("#messages").html(html);
}*/

$(function () {
    //Para enviar mensajes
    $('form').submit(function(){
        var msg = $('#m').val();
      var html = `<li class="text-right">
                    <strong>Usted: </strong>
                    <em>${msg}</em>
                </li>`;
        $("#messages").append(html);
        socket.emit('sentmsg', msg);
        $('#m').val('');
        return false;
    });
    //Cuando alguien se conecta
    socket.on('newconnection', function(text){
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.info(`${text}`);
        //$("#messages").append(`<div>${text}</div>`);
    });
    //Al recibir un mensaje
    socket.on('newmsg', function(msg){
        var html = `<li class="text-left">
                    <strong>Desconocido: </strong>
                    <em>${msg}</em>
                </li>`;
        $("#messages").append(html);
      window.scrollTo(0, document.body.scrollHeight);
    });
});