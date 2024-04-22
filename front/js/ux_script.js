function loadResize(){
    gameTextResize();
}
//call loadResize on load and resize
$(window).on('load', loadResize);
$(window).on('resize', loadResize);


function gameTextResize(){
    if($("#game_text_container").hasClass("hidden")){
        $("#game_text_container").height(0);
        return;
    };

    let height = $("#game_text_container .height_keeper").height();
    $("#game_text_container").height(height);
}
$("#game_text_opener").click(function() {
    $("#game_text_container").toggleClass("hidden");
    gameTextResize();
    $("#game_text_opener").toggleClass("opened");
});