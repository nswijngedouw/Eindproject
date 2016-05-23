
'use strict';
/*global $*/

var x = prompt("geef een hoeveelheid schijven in", "0");
var schijven = parseInt(x, 10);

var src = { num: 1, pieces: []};
var aux = { num: 2, pieces: []};
var dst = { num: 3, pieces: []};

var achtergrondkleur_schijf = 'red blue orange green cyan black purple'.split(' ');

var $board = $('#board');


function getPositie(stack) {
    return {top: schijven * (schijven - stack.pieces.length) + 200, left: (stack.num - 1) * document.getElementById("board").offsetWidth / 18 * schijven + 40};
}

var i = 0;
for (i = schijven; i > 0; i--) {
    src.pieces.
        push(
            $('<div class="brick"></div>').
                width(i * 10).
                height(15).
                appendTo($board).
                css('position', 'absolute').
                css('background', achtergrondkleur_schijf[i % achtergrondkleur_schijf.length]).
                offset(getPositie(src)).
                css('margin-left', (schijven - i - 1) * 5 + 'px')
        );
}

function move(disc, from, to) {
    var x = from.pieces.pop(),
        nieuw = getPositie(to, to.pieces.length);
    to.pieces.push(x);
    return x.
        animate({top: 75}, 'slow').
        animate({left: nieuw.left}, 'fast').
        animate({top: nieuw.top}, 'slow').
        promise();
}

function hanoi(disc, src, aux, dst) {
    if (disc > 0) {
        return hanoi(disc - 1, src, dst, aux).
            then(function () {return move(disc, src, dst); }).
            then(function () {return hanoi(disc - 1, aux, src, dst); }
                );
    }
        else {
            var defer = jQuery.Deferred();
            defer.resolve();
            return defer.promise();
        }
    
    
}

hanoi(schijven, src, aux, dst).then(
    function () {alert("gedaan"); 
                }
);



    



    