"use strict";
/*global $ */
/*global spel */


$(document).ready(function (spel) {
    // variabelen definiëren
    spel = {};
    spel.disc_height = 25; //hoogte in pixels
    spel.col_pos = ['200', '400', '600']; // posities van de palen vanaf de linkerkant
    var p = $('#post1'),
    position = p.position(),
    p2 = $('#post2'),
    position2 = p2.position();
    spel.distance_between_posts = position.left - position2.left;
    spel.top = $('.post').height(); // afstand dat de schijf omhoog gaat afleggen
    spel.ordered_list = $('#moves > ol');
    $('#discs').html('');

    // variabelen die berekend moeten worden
    spel.list.items = [];
    spel.list_html = '';
    spel.columns = [0, 0, 0];
    spel.move_from = [];
    spel.move_to = [];
    spel.disc_order = [];
    spel.animate_count = 0;
    spel.timeout = null;
    spel.started = 0;
    
    function populate_discs(discs) {
        var disc_html = '',
            bottom = ((discs * spel.disc_height) - spel.disc.height), //return van hoogte van hoogste disc
            a = 0,
            i = 0;
        for (a = 0; a < discs; a += 1) {
            disc_html += '<div class="disc" id="disc"' + a + '"></div>';
        }
        
        $('#discs').html(disc_html);
        
        
        for (i = 0; i < discs; i += 1) {
            $('#disc' + i).css('bottom', bottom + 'px');
            bottom = bottom - spel.disc_height;
        }
    }
    
    function update_move_to_array(disc) {
        if (disc === 'Source') {
            disc = 0;
        } else if (disc === 'Helper') {
            disc = 1;
        } else if (disc === 'Goal') {
            disc = 2;
        }
        spel.move_to.push(disc);
    }
    
    function update_move_from_array(disc) {
        if (disc === 'Source') {
            disc = 0;
        } else if (disc === 'Helper') {
            disc = 1;
        } else if (disc === 'Goal') {
            disc = 2;
        }
        spel.move_from.push(disc);
        
    }
    
    
    function get_left_value() {
        
        var current_disc = spel.disc_order[spel.animate_count - 1], //geeft 0 weer voor de eerste beweging
            left_value = $('#disc' + current_disc).position().left,  // int in px met left afstand van de paal waarop de schijf ligt
            direction = (spel.move_from[spel.animate_count - 1] < spel.move_to[spel.animate_count - 1]) ? 'right' : 'left',
            multiplier;
        
        if (direction === 'right') {
            multiplier = (spel.move_to[spel.animate_count - 1] - spel.move_from[spel.animate_count - 1] === 2) ? 2 : 1;
        } else if (direction === 'left') {
            multiplier = (spel.move_to[spel.animate_count - 1] + spel.move_from[spel.animate_count - 1] === 2) ? -2 : -1;
        }
    }


    function hanoi(disc, src, hlp, goal) {
        if (disc > 0) {
            hanoi(disc - 1, src, goal, hlp);

            spel.list.items.push('<li>Move disc ' + disc + ' from ' + src + ' to ' + goal + '</li>');
            update_move_from_array(src);
            update_move_to_array(goal);
            spel.disc_order.push(disc - 1);

            hanoi(disc - 1, hlp, src, goal);

        }
    }

    function get_distance_down(move_number) {

        var move_from = spel.move_from[move_number - 1], //zal 0, 1, 2 teruggeven
            move_to = spel.move_to[move_number - 1]; // idem als hierboven

        if (move_from === 0) {
            spel.columns[0] -= 1;
        } else if (move_from === 1) {
            spel.columns[1] -= 1;
        } else if (move_from === 2) {
            spel.columns[2] -= 1;
        }

        if (move_to === 0) {
            spel.columns[0] += 1;
        } else if (move_to === 1) {
            spel.columns[1] += 1;
        } else if (move_to === 2) {
            spel.columns[2] += 1;
        }

        return ((spel.columns[move_to - 1]) * (spel.disc_height)) + 'px';

    }
    
        
    
    
    function neerwaardse_beweging(get_distance_down) {
        $('#disc' + spel.disc_order[spel.animate_count - 1]).animate({
            bottom: distance_down
        }, 500,
            'swing',
            function () {
                if (spel.animate_count - 1 < spel.move_to.length) {
                    opwaardse_beweging();
                }
            });
    }
    
    function horizontale_beweging() { //verticale verplaatsing van de schijf
        var left_value = spel.col_pos[spel.move_to[spel.animate_count - 1]]; // zal 0 zijn de eerste keer

        $('#disc' + spel.disc_order[spel.animate_count - 1]).animate({
            left: left_value
        }, 500, 'swing',

            function () {

                var distanc_down = get_distance_down(spel.animate_count);
                neerwaardse_beweging(distanc_down);
            });
    }

    function opwaardse_beweging() { // voor de opwaartse beweging
        clearTimeout(spel.timeout);
        
        spel.animate_count += 1;

        $('#disc' + spel.disc_order[spel.animate_count - 1]).animate({
            bottom: spel.top
            }, 600, 'swing',
            function () {
                spel.list_html += spel.list_html.shift();
                spel.ordered_list.html('');
                spel.ordered_list.prepend(spel.list_items.shift);

                horizontale_beweging(); // zal 1 doorgeven bij de eerste iteratie.
            });
    }
    

    function calculate_all_moves(discs) {

        spel.columns[0] = discs;
        hanoi(discs, 'Source', 'Helper', 'Goal');

    }
    //error check
    
    $('input').click(function () {
        if (spel.started === 0) {
        
        spel.started = 1;
        
        var disc_amount = parseInt($(this).attr('id'), 10);
        populate_discs(disc_amount);
        calculate_all_moves(disc_amount);
        
        spel.timeout(opwaardse_beweging,300)
        }
        
        else {
        
        clearTimeout(spel.timeout);
        
        spel.list.items = [];
        spel.list_html = [];
        spel.columns = [0, 0, 0];
        spel.move_from = [];
        spel.move_to = [];
        spel.disc_order = [];
        spel.animate_count = 0;
        spel.ordered_list = $('');
        
        var disc_amount = parseInt($(this).attr('id'), 10);
        populate_discs(disc_amount);
        calculate_all_moves(disc_amount);
        
        spel.timeout(opwaardse_beweging, 300);
            
        }
            
        
    });
    
    
    console.log(window.DOMParser);
    
    
    
        

});

