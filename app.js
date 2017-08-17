'use strict'

// Object stated
var state = { 
	stream: [],
	currentStream: {},
	nameArray: []
};

// API 
function twitchAPI(){ 
	$.ajax({
    url: 'https://api.twitch.tv/kraken/streams/',
    type: 'GET',
	data: {
    q:$('.js-input').val(),
	game:$('.js-input').val(),
    format: 'json',
	client_id: 'oul6ks7icl22t0yrjf3vwhrjzpptve',
	type:'video',
	limit:100
}, 
 

success: function(data) {
		var size = data.streams.length;
		var max = data.streams.length - 6;
		var random1 = Math.floor(Math.random()*(max - 7) + 7)
		var random2 = Math.floor(Math.random()*(max - 7) + 7)
		var random3 = Math.floor(Math.random()*(max - 7) + 7)
		var random4 = Math.floor(Math.random()*(max - 7) + 7)
		var random5 = Math.floor(Math.random()*(max - 7) + 7)
		var random6 = Math.floor(Math.random()*(max - 7) + 7)
		if(data.streams.length > 99){
			state.stream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, 
				data.streams[random1].channel.name, data.streams[random2].channel.name, data.streams[random3].channel.name]);
		}else if(data.streams.length < 99 ){
			state.stream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, 
				data.streams[random1].channel.name, data.streams[random2].channel.name, data.streams[random3].channel.name]);
		}
		var query = $('.js-input').val();
		state.currentStream[query] = data;			
		renderResults(data);
		$('.js-results-top').show();
		$('.js-results-random').show();
	}
	});
}

function searchResults(name, elementClass, elementId, colClass, height){ 
	var topResults = '';
	topResults += "<div class=" + colClass + ">"+
		"<p class='streamerName ' id =" +name+" onclick='singleVideo(state,event)'>" +name+ "</p>" +
		'<iframe class='+elementClass+
		' id=' +elementId+
		' src= "https://player.twitch.tv/?channel='+name+'&autoplay=false"'+
		' height=' +height+
		' width="100%"'+
		' frameborder="0"'+
		' scrolling="no"'+
		' allowfullscreen="true">'+
   '</iframe>'+
	 '</div>';
	return topResults;	
}

function renderResults(data){ 
	var query = $('.js-input').val();
	var topResults = '';	
	var randomResult = '';
	if (data.streams.length > 0) {
		topResults += '<div><span class="topThree"> Top Three </span></div>';
		topResults += searchResults(data.streams[0].channel.name,' results', 'st0', 'col-1', 300); 
		topResults += searchResults(data.streams[1].channel.name,' results', 'st1', 'col-1', 300);
		topResults += searchResults(data.streams[2].channel.name,' results', 'st2', 'col-1', 300);	
		
		var max = data.streams.length - 6;
		var random1 = Math.floor(Math.random()*(max - 7) + 7)
		var random2 = Math.floor(Math.random()*(max - 7) + 7)
		var random3 = Math.floor(Math.random()*(max - 7) + 7)
		var random4 = Math.floor(Math.random()*(max - 7) + 7)
		var random5 = Math.floor(Math.random()*(max - 7) + 7)
		var random6 = Math.floor(Math.random()*(max - 7) + 7)
		
		randomResult += '<div><span class="randomOthers">Others</span></div>';
		randomResult += searchResults(data.streams[random1].channel.name,' results', 'stR', 'col-2', 300);
		randomResult += searchResults(data.streams[random2].channel.name,' results', 'stR1', 'col-2', 300);
		randomResult += searchResults(data.streams[random3].channel.name,' results', 'stR2', 'col-2', 300);
		randomResult += searchResults(data.streams[random4].channel.name,' results', 'stR3', 'col-2', 300);
		randomResult += searchResults(data.streams[random5].channel.name,' results', 'stR4', 'col-2', 300);
		randomResult += searchResults(data.streams[random6].channel.name,' results', 'stR5', 'col-2', 300);
		
		var size = state.currentStream[query].streams.length;
				
	}else {
			topResults += '<p>No results</p>';
		 }
		$('.js-results-top').html(topResults);
		$('.js-results-random').html(randomResult);		
}

function singleVid(state){ 
	state.nameArray.push(event.currentTarget.id);
	$('.js-form').hide();
	$('.js-results-top').hide();
	$('.js-results-random').hide();
	
	state.nameArray.forEach(function(key){
		if(event.currentTarget.id == key){
			var element = '';
			element += searchResults(key,' results', 'st', 'colSingle', 650);
			element += '<iframe frameborder=""'+
        ' scrolling="yes"'+
        ' id="chat_embed"'+
        ' src="https://www.twitch.tv/'+key+'/chat"'+
        ' height="300px"'+
        ' width=40%">'+
			'</iframe>'
			$('.js-single-vid').html(element);
		}
	})
}

// event listener 
$(document).ready(function(){ 
	$('.js-form').submit(function(event){
	event.preventDefault();
	event.stopPropagation();
    twitchAPI();
	});
})







