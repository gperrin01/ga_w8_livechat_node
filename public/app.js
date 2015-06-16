alert('lol');

var socket = io.connect('http://localhost:4000/');

socket.on('connected', function() {
  $('.connecting').slideUp(); 
  $('input').attr('disabled', false);
});

// i'm not sure if this should be here or in server or f*** both
socket.on('chat', function(data) {
    writeLine(data.name, data.line);
});

// this i think i get, i need this to happen when someone else sends a funny action 
socket.on('action', function(data) {
  writeAction(data.name, data.action);
});

$(document).ready(function() {

  $('form').on('submit', function(ev) {
    ev.preventDefault();
    var $name = $('#nick');
    var $line = $('#text');
    socket.emit('chat', {name: $name.val(), line: $line.val()});
    console.log('emitted a chat');
    // why do we need to put writeLine here since it is also repeated in index.js for eaach chat event?
    // when i send one shouldnt it be picked up by the server and added to everyones, screen, including mine?
    writeLine($name.val(), $line.val());
    $line.val("");
  });

  $('.actions button').on('click', function(ev) {
    var $name = $('#nick');
    var $button = $(ev.currentTarget);
    socket.emit('action', {name: $name.val(), action: $button.data('type')});
      writeAction($name.val(), $button.data('type'));
  });
})

function writeLine(name, line) {
  $('.chatlines').append('<li class="talk"><span class="nick">&lt;' + name + '&gt;</span> ' + line + '</li>');
}


function writeAction(name, action) {
  var actionStrings = {'trout': 'slaps the room around with a large trout',
                       'rofl': 'rolls around on the floor laughing',
                       'sad': 'looks rather sad :(',
                       'boost': 'scatters Boost around the room liberally.'};
  $('.chatlines').append('<li class="action">' + name + ' ' + actionStrings[action] + '</li>');
}





