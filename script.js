
"use strict";
/*global $*/


var aantal;

function addPost() {
    $(".post1").appendTo($("#board"));
    $(".post2").appendTo($("#board"));
    $(".post3").appendTo($("#board"));
    
}

function CreateWorld() {
    addPost();
    
}
function CreateDisks() {
    
}

$(document).ready(function draggable() {
    $("#draggable").draggable();
});

$(function () {
    $("#slider-range-max").slider({
        range: "max",
        min: 3,
        max: 8,
        value: 1,
        slide: function (event, ui) {
            $("#amount").val(ui.value);
        }
    });
    $("#amount").val($("#slider-range-max").slider("value"));
});








