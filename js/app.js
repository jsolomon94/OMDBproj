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
        var element = "<tr><td><img id='"+imgid+"'></td></tr><tr><td id='"+listid+"'></td></tr>";
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

function OMDBapiCall2(input,callback){

    $.getJSON('https://www.omdbapi.com/?s=' + encodeURI(input),function(response){

        //use the callback function to do more things with this data
        callback(response.Search, response.totalResults);

    });

}

function getData(poster,imgid,listid,plot,rating,title,time,imdb,response){

    //append the data and the src for the picture according to the picture id and list id
    var element = "<h2>"+title+"</h2><p>"+plot+"</p><p>Rated: "+rating+"</p><p>Duration: "+time+"</p><p>IMDB Rating: "+imdb+"/10</p>"
    $('#'+imgid).attr('src',poster);
    $('#'+listid).append(element);

}

function getPopup(search, res){

    $(".modal-table").html(""); //take everything out of the modal because it will append to the older results if not

    if( res > 0) {

        $(".modal-title").html("Here are the results (Click the images for info)");

        for(var i = 0; i < search.length; i++) {

            OMDBapiCall(search[i].Title,getPopupInfo,i,null);


        }

    }else{

        $(".modal-title").html("We Do Not Carry This Title");

    }


}
 //get the info for the search results
function getPopupInfo(poster,imgid,listid,plot,rating,title,time,imdb,response){

    var picpath;
    var plot1;
    var rating1;
    var time1;
    var imdb1;
    var element;
    var id = "hideme" + imgid;

    (plot !=="N/A") ? plot1 = plot : plot1 = "The plot for this movie is unknown";
    (poster !=="N/A") ? picpath = poster : picpath = "img/no-image.png";
    (rating !=="N/A") ? rating1 = rating : rating1 = "Unknown";
    (time !=="N/A") ? time1 = time : time1 = "Unknown";
    (imdb !=="N/A") ? imdb1 = imdb + "/10" : imdb1 = "Unknown";

    element = "<tr><td><img src='" + picpath + "' onclick='displayFunc("+id+")'/></td></tr><tr><td><h2>" + title + "</h2><div id='"+id+"' style='display: none'><p>" + plot1 + "</p><p>Rated: " + rating1 + "</p><p>Duration: " + time1 + "</p><p>IMDB Rating: " + imdb1 + "</p></div></td></tr>";
    $(id).css('display','none');
    $(".modal-table").append(element);

}

//call the 2nd api function
$("#searchbtn").click(function (){

    var movie = $("#searchtext").val();
    //check the input to either search for it or tell the user to enter something
    if($.trim(movie) === ""){

        alert("Please Enter A Movie");
        return;

    }else {

        OMDBapiCall2(movie, getPopup);
        $("#myModal").modal()
        $('#searchtext').val('');

    }
});

//just to get back to the top of the page easier

$("#backtop").click(function() {

    $('html, body').animate({
        scrollTop: 0}, delay);

});

//toggle the display of the info
function displayFunc(input){

    if($(input).css('display') === 'none'){

        $(input).css('display','unset');

    }else{

        $(input).css('display','none');

    }


}