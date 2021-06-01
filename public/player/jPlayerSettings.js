$(document).ready(function() {
    $('.jp-jplayer').jPlayer({
        ready: function() {
            $(this).jPlayer('setMedia', {
                mp3: 'audio/TEDxPhoenix-KelliAnderson-DisruptiveWonderforaChange.mp3',
                oga: 'audio/TEDxPhoenix-KelliAnderson-DisruptiveWonderforaChange.mp3'
            });
        },
        supplied: 'mp3, oga'
    });
});