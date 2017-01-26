/**
 * Created by jonathan.solomon on 1/23/2017.
 */

//random 4 movies that I chose
var movieArr = ["E.T.","Insidious","27 Dresses","Forrest Gump"];
var delay = 1500;

//make sure to inject the results of your movie array into the ul
function moviePics(){

    for(var i=0; i < movieArr.length; i++) {

        var movie = movieArr[i];
        var imgid = "image" + i;
        var listid = "list" + i;
        var poster = "";
        //give it an id based on where the index is
        var element = "<li id='"+listid+"'><img id='"+imgid+"'></li>";
        $("#ul-1").append(element);
        OMDBapiCall(movie,getData,imgid,listid);

    }

}


function OMDBapiCall(input,callback,imgid,listid){

    $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(input),function(response){

        //use the callback function to do more things with this data
        callback(response.Poster,imgid,listid,response.Plot,response.Rated,response.Title,response.Runtime,response.imdbRating,response.Response);

    });

}

function getData(poster,imgid,listid,plot,rating,title,time,imdb,response){

    //append the data and the src for the picture according to the picture id and list id
    var element = "<h2>"+title+"</h2><p>"+plot+"</p><p>Rated: "+rating+"</p><p>Duration: "+time+"</p><p>IMDB Rating: "+imdb+"/10</p>"
    $('#'+imgid).attr('src',poster);
    $('#'+listid).append(element);

}

function getPopup(poster,imgid,listid,plot,rating,title,time,imdb,response){

    $(".modal-body").html(''); //take everything out of the modal because it will append to the older results if not

    if(response !== "False") {

        //if the api doesn't have a movie (or someone type it in wrong this will not display
        var element = "<img src='" + poster + "'/><h2>"+title+"</h2><p>" + plot + "</p><p>Rated: " + rating + "</p><p>Duration: " + time + "</p><p>IMDB Rating: " + imdb + "/10</p>"
        $(".modal-body").append(element);
        $(".modal-title").html("This title was found!");

    }else{

        $(".modal-title").html("We Do Not Carry This Title");

    }


}

$("#searchbtn").click(function (){

    var movie = $("#searchtext").val();
    //check the input to either search for it or tell the user to enter something
    if($.trim(movie) === ""){

        alert("Please Enter A Movie");
        return;

    }else {

        OMDBapiCall(movie, getPopup, null, null);
        $("#myModal").modal()
        $('#searchtext').val('');

    }
});

//just to get back to the top of the page easier

$("#backtop").click(function() {

    $('html, body').animate({
        scrollTop: 0}, delay);

});
