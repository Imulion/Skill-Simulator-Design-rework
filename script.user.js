// ==UserScript==
// @name         Skill Simulator Design rework
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tries to make the Skill Simulator on ferias just look a little nicer! :)
// @author       You
// @match        https://themaelstro.github.io/MHFZ-Ferias-English-Project/skill/skillsimu.htm
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function removeAllBr(parentNode) {
        parentNode.childNodes.forEach(function(node) {
              if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
                  parentNode.removeChild(node);
              }
        });
    }

    function insertAfter(newItem,existingItem) {
        existingItem.parentNode.insertBefore(newItem,existingItem.nextSibling);
    }

    if (window.top !== window.self) {
          //console.log(document);
          GM_addStyle(`
            #defensegrid {
                display: grid;
            }

            #defensegrid::before {
                content: 'Head + Chest + Arms + Waist + Legs';
                grid-column: 1 / 13;
            }

            #f_bougu .sl {
                width: 9em !important;
            }

            #f_bougu .sn2,
            #f_bougu .sn {
                width: 8em !important;
                padding-left: 0.2em;
            }

            #f_bougu .pt,
            #f_bougu .sp {
                padding-right: 0.2em;
            }
            .box {
                height: 80%;
            }
        `);
        var maincontainer = document.getElementById("f3").children[1];
        var defense_grid = maincontainer.children[6].children[0];
        defense_grid.setAttribute("id","defensegrid");
        defense_grid.removeChild(defense_grid.firstChild);
        //var child_copy = Array.from(defensegrid.childNodes);
        removeAllBr(defense_grid);

        defense_grid.parentNode.style.padding="10px 0";

        var lastHeadItem = document.getElementById("b_bukiS3");
        var armour_grid = lastHeadItem.parentNode;

        var spacingDiv = document.createElement("div");
        spacingDiv.style.gridColumn = "8 / 18";
        insertAfter(spacingDiv,lastHeadItem);

        armour_grid.style.display="grid";
        armour_grid.style.gridTemplateColumns = "repeat(17, 1fr)";
        armour_grid.style.rowGap = "0.5em";
        armour_grid.style.columnGap = "0.1em";

        for( let i = 1; i < 6; i++) {
            let e = maincontainer.children[1];
            while(e.firstChild) {
                armour_grid.appendChild(e.firstChild);
            };
            maincontainer.removeChild(e);
        }
        var wrapper_div = document.createElement("div");
        wrapper_div.style.display="grid";
        wrapper_div.style.gridColumn="8 / 18";
        wrapper_div.style.gridAutoColumns="min-content";
        wrapper_div.style.gridAutoFlow="column";
        wrapper_div.style.gap="1em";

        var display_limit_element = armour_grid.querySelector("small")
        var selector_element = display_limit_element.nextSibling;
        var above_element = selector_element.nextSibling;

        armour_grid.insertBefore(wrapper_div,display_limit_element);

        wrapper_div.appendChild(display_limit_element);
        wrapper_div.appendChild(selector_element);
        wrapper_div.appendChild(above_element);

        var cuff_spacing_div = document.createElement("div");

        armour_grid.insertBefore(cuff_spacing_div,document.getElementById("b_cuffLv"));

        var selected_item_name_span = document.getElementById("d_mei");
        selected_item_name_span.style.gridColumn="2 / 6";

        var selected_item_div = selected_item_name_span.parentNode;
        selected_item_div.style.display="grid";
        selected_item_div.style.gap="0.5em 0.1em";
        selected_item_div.style.padding="10px 0";
        removeAllBr(selected_item_div);

        var hr_space = document.createElement("hr");
        hr_space.style.clear="both";
        insertAfter(hr_space,selected_item_div);


    }



})();
