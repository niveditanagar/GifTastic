/*
Get a API key
Search button with textfield
User puts an input in the textfield and buttons are placed on screen
    - GIF shows up on screen with ratings
User needs to search GIF in my app
Once the search button is clicked, input needs to disappear
GIF needs to start playing once it is clicked on it
GIF needs to stop playing once it is clicked on it
*/

//Variables and Functions
var  topics = ["Sun", "Moon", "Nebula", "Earth", "Pluto", "Saturn", "Mars", "Venus", "Jupiter" ];


//API KEY: https://api.gify.com/v1/gifs/search?api_key=IDLpmtxdcfxQlB0FVPukUz1486LAo6Up&q=

//Create a button from once a topic is searhed in the textfield
function addButton(text) {
    var button = $('<button>');
    button.html(text);
    return button;
};

function createImage(url, still, animated) {
    var image = $('<img>')    
        image.attr({
            src: url,
            'data-animated': animated,
            'data-still': still
            
        });
        
    return image;
    
};

//Display giphy on our page
function displayGiphy(response) {
    $('.giphy_images').empty();
    var data = response.data;
   
    for (var i = 0; i < data.length; i++) {
        
        var animated = data[i].images.fixed_height.url;
        var still = data[i].images.fixed_height_still.url;
        var url = still;
        
        // image being returned will be the actual image
        $('.giphy_images').append(createImage(url, still, animated));
    }


}

function grabGiphy(val) {
    $.ajax ({
        url: 'https://api.giphy.com/v1/gifs/search?api_key=IDLpmtxdcfxQlB0FVPukUz1486LAo6Up&q=' + val,
        method: 'GET'
    })

    //if it is a success
    .done(function(data) {
        console.log('Data: ', data);
        displayGiphy(data);
    })

    //if it is a fail
    .fail(function(error) {
        console.log('error: ', error);
    });
};

function gifySearch(event) {
    event.preventDefault();

    var value = $('#sea').val();
    $('.gifSearch_btn').append(addButton(value));
    grabGiphy(value);

    //once the search button is clicked, clear the input
    $('#sea').val('');
};

$('.gify_button').on('click', gifySearch);

function searchGiphyByButton() {
    var name = $(this).html();
    grabGiphy(name);
    
   
}

$(document).on('click', '.gifSearch_btn button', searchGiphyByButton);

//when user clicks on giphy 
function playGiphy() {
    var still = $(this).attr('data-still');
    var animated =  $(this).attr('data-animated');
    var state =  $(this).attr('data-state');

    if(state === 'still'){
        $(this).attr({
            'data-state': 'play',
            src: animated
        });
    } else {
        $(this).attr({
            'data-state': 'still',
            src: still
        });
    }
}

$(document).on('click', 'img', playGiphy);