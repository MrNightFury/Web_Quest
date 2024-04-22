//navigation
$("#mm_item_game_start").click(function() {
    $("body > section").addClass("hidden");
    $("#game").removeClass("hidden");
    $(".game_ux_element").removeClass("hidden");
    gameTextResize(); // from front/js/ux_script.js
});

$("#mm_item_settings").click(function() {
    $(".mm_container").addClass("hidden");
    $("#mm_settings").removeClass("hidden");
});

$("#mm_item_authors").click(function() {
    $(".mm_container").addClass("hidden");
    $("#mm_authors").removeClass("hidden");
});

$(".mm_back").click(function() {
    $(".mm_container").addClass("hidden");
    $("#mm_main").removeClass("hidden");
});

//______________________________________________________________________________________________________________________