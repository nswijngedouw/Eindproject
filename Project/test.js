
'use strict';
/*global $*/

var a = prompt("Met hoeveel schijven wilt u spelen?", "0");

var aantal = parseInt(a, 10);

var achtergrondkleur_schijf = 'red blue orange green cyan black purple'.split(' ');

var bron = {num: 1, schijven: []};
var helper = {num: 2, schijven: []};
var goal = {num: 3, schijven: []};

var $wereld = $('.container');

var i = 0;

$(document).ready(function () {
    $('.test').append('<p>HELLO WORLD</p>');
    alert(aantal);
    
    var i = 0,
        w = 40 * i + 'px'
    for (i = 0; i < aantal; i++) {
        
        bron.schijven.push(
            $("#schijven")$(.append('<div class="schijf"></div>').css({"width": "w", "background-color": "black", "height": "20"})
        );
    }
});

$(function () {
    $("#schijven > *").draggable();
    $("#droppable").droppable({
        drop: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        }
    });
});





        
