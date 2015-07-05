$(function() {

	// element to hold the list of piekus
	var $pieList = $('#pieku-list-panel')
	
	// post template
	var postTemplate = _.template($('#post-template').html());

	// sample posts
	var posts = [
		{title:"For the love of pie 1" , author: "Erin Mahoney", post: "When I look at it" + "<br>" + "The circle becomes a slice" + "<br>" + "I eat the whole pie."},
		{title:"For the love of pie 2" , author: "Erin Mahoney", post: "When I look at it" + "<br>" + "The circle becomes a slice" + "<br>" + "I eat the whole pie."},
		{title:"For the love of pie 3" , author: "Erin Mahoney", post: "When I look at it" + "<br>" + "The circle becomes a slice" + "<br>" + "I eat the whole pie."}
	];

	// append existing posts (from posts) to $pieList.
	// '_.each' is an "iterator" function provided by Underscore.js
	_.each(posts, function(post, index) {
		var $post = $(postTemplate(post));
		$post.attr('data-index', index);
		$pieList.append($post);
	});




	
});