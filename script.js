$(function() {	

	// form to create new pieku post
	var $newPost = $('#new-post');

	// about button scrollspy
	var$aboutBtn = $('#about-btn');

	// element to hold the list of piekus
	var $pieList = $('#pieku-list-panel');

	// Top navbar element
	var $topNavbar = $('#topNavbar');

	// Left navbar element
	var $leftNavbar = $('#leftNavbar');
	
	// post template
	var postTemplate = _.template($('#post-template').html());

	// sample posts
	var posts = [
		{title:"For the love of pie" , author: "Erin Mahoney", post: "When I look at it," + "<br>" + "The circle becomes a slice," + "<br>" + "I eat the whole pie."},
		{title:"Pie in the sky" , author: "Bob Smith", post: "Oh pie in the sky," + "<br>" + "You look too bright to eat now," + "<br>" + "The full moon is now"},
		{title:"Pie for no one" , author: "Annie Ross", post: "Alone I stand here," + "<br>" + "Hunger sounds from my stomach," + "<br>" + "No pie to be found."}
	];

	// append existing posts (from posts) to $pieList.
	// '_.each' is an "iterator" function provided by Underscore.js
	_.each(posts, function(post, index) {
		var $post = $(postTemplate(post));
		$post.attr('data-index', index);
		$pieList.append($post);
	});

	// submit form to create new todo
	$newPost.on('submit', function(event) {
		event.preventDefault();

		// create new todo object from form data
		var postTitle = $('#post-title').val();
		var postAuthor = $('#post-author').val();
		var postDesc = $('#post-desc').val();
		var postData = {title: postTitle, author: postAuthor, post: postDesc};

		// store our new post
		posts.push(postData);
		var index = posts.indexOf(postData);

		// append our new post to the page
		var $post = $(postTemplate(postData));
		$post.attr('data-index', index);
		$pieList.prepend($post);

		// hides modal and give alert upon submit
		$('#myModal').modal('hide');
		alert("Successfully submitted.")

	// adds date to post
	var $dateStamp = $('#dateStamp');
	$dateStamp.value = (new Date()).format("m/dd/yy");

		// reset the form
		$newPost[0].reset();
		$('#post-desc').focus();
	});

	// scroll event to fade out top navbar and fade in left navbar
	$(window).scroll(function(event) {
		var yScroll = $(window).scrollTop();
		var yPiekus = $("#piekus").offset();
		if(yScroll > yPiekus.top){
			$topNavbar.fadeOut();
			$leftNavbar.fadeIn();
		} else {
			$topNavbar.fadeIn();
			$leftNavbar.fadeOut();
		}
	});
});