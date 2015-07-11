// CLIENT-SIDE JAVASCRIPT

$(function() {	

	// about button scrollspy
	var$aboutBtn = $('#about-btn');

	// Top navbar element
	var $topNavbar = $('#topNavbar');

	// Left navbar element
	var $leftNavbar = $('#leftNavbar');

	// piekuController holds all of the pieku functionality
	var piekuController = {

		// compile pieku template
		template: _.template($('#post-template').html()),

		all: function() {
			$.get('/api/piekus/', function(data) {
				var allPiekus = data;

				// iterate through allPiekus
				_.each(allPiekus, function(pieku){
					// pass each pieku object through template and append to view
					var $piekuHtml = $(piekuController.template(pieku));
					$('#pieku-list-panel').append($piekuHtml);
				});
				// add event-handlers to piekus for updating/deleting
				piekuController.addEventHandlers();
			});
		},

		create: function(newTitle, newAuthor, newPost) {
			var piekuData = {title: newTitle, author: newAuthor, post: newPost};
			// send POST request to server to create new pieku
			$.post('/piekus', piekuData, function(data) {
				// pass pieku object through template and append to view
				var $piekuHtml = $(piekuController.template(data));
				$('#pieku-list-panel').prepend($piekuHtml);

				// var $features = $(featuresTemplate());
				// $featuresList.prepend($features);

				// scrolls to new post of piekus
				$('#myModal').on('hidden.bs.modal', function (e) {
					var yPost = $post.offset().top;
					window.scroll(0, yPost);
				});

				// hides modal and give alert upon submit
				$('#myModal').modal('hide');

				// reset the form
				$newPost[0].reset();
			});
		},

		update: function(piekuId, updateTitle, updateAuthor, updatePost) {
			// send PUT request to server to update pieku
			$.ajax({
				type: 'PUT',
				url: '/piekus/' + piekuId,
				data: {
					title: updateTitle,
					author: updateAuthor,
					post: updatePost
				},
				success: function(data) {
					// pass phrase object through template and append to view
					var $piekuHtml = $(piekuController.template(data));
					$('#pieku-' + piekuId).replaceWith($piekuHtml); 
				},
				// response if incorrect data or object not found
				error: function(jqXHR, testStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		},

		delete: function(piekuId) {
			// send DELETE request to server to delete pieku
			$.ajax({
				type: 'DELETE',
				url: '/api/piekus/' + piekuId,
				success: function(data) {
					// remove deleted pieku li from the view
					$('#pieku-' + piekuId).remove();
				}
			});
		},	

		// add event-handlers to piekus for updating/deleting
		addEventHandlers: function() {
			$('#pieku-list-panel')
			// for update: submit event on ".update-pieku form"
			.on('submit', '.update-pieku', function(event){
				event.preventDefault();
				var piekuId = $(this).closest('.pieku').attr('data-id');
				var updateTitle = $(this).find('.update-title').val();
				var updateAuthor = $(this).find('.update-author').val();
				var updatePost = $(this).find('.update-post').val();
				piekuController.update(piekuId, updateTitle, updateAuthor, updatePost);
			})
			// for delete: click event on '.delete-pieku' button
			.on('click', '.delete-pieku', function(event) {
				event.preventDefault();
				var piekuId = $(this).closest('.pieku').attr('data-id');
				piekuController.delete(piekuId);
			});
		},

		setupView: function() {
			// append existing piekus to view
			piekuController.all();

			// add event-handler to '.new-pieku' form
			$('#new-pieku').on('submit', function(event) {
				event.preventDefault();
				var newTitle = $('#new-title').val();
				var newAuthor = $('#new-author').val();
				var newPost = $('#new-Post').val();
				piekuController.create(newTitle, newAuthor, newPost);

				// reset form
				$(this)[0].reset();
				$('#new-pieku').focus();

			});
		}
	};

	piekuController.setupView();

	// $('#myModal').on('shown.bs.modal', function (e) {
	// 	$('#post-title').focus();
	// });

	// // navigates to pieku list after click.
	// $("#piekuNav").click(function() {
	// 	event.preventDefault();

	// 	var yPost = $('#piekus').offset().top-180;
	// 	window.scroll(0, yPost);
	// });

	// // scroll event to fade out top navbar and fade in left navbar
	// $(window).scroll(function(event) {
	// 	var yScroll = $(window).scrollTop();
	// 	var yPiekus = $("#piekus").offset();
	// 	if(yScroll >= yPiekus.top-180){
	// 		$topNavbar.fadeOut();
	// 		$leftNavbar.fadeIn();
	// 	} else {
	// 		$topNavbar.fadeIn();
	// 		$leftNavbar.fadeOut();
	// 	}
	// });
});

// OLD js...

	// // form to create new pieku post
	// var $newPost = $('#new-post');

	// // about button scrollspy
	// var$aboutBtn = $('#about-btn');

	// // // element to hold the list of piekus
	// // var $pieList = $('#pieku-list-panel');

	// // Top navbar element
	// var $topNavbar = $('#topNavbar');

	// // Left navbar element
	// var $leftNavbar = $('#leftNavbar');
	
	// // post template
	// var postTemplate = _.template($('#post-template').html());

	// // add feature template
	// var featuresTemplate = _.template($('#features-template').html());
	// var $featuresList = $('#features-list-panel');

	// var dateString = (new Date()).toLocaleDateString("en-US");
	// // sample posts
	// var posts = [
	// 	{ title:"For the love of pie" , author: "Erin Mahoney", post: "When I look at it," + "<br>" + "The circle becomes a slice," + "<br>" + "I eat the whole pie.", time: dateString },
	// 	{ title:"Pie in the sky" , author: "Bob Smith", post: "Oh pie in the sky," + "<br>" + "You look too bright to eat now," + "<br>" + "The full moon is now", time: dateString },
	// 	{ title:"Pie for no one" , author: "Annie Ross", post: "Alone I stand here," + "<br>" + "Hunger sounds from my stomach," + "<br>" + "No pie to be found.", time: dateString }
	// ];

	// // append existing posts (from posts) to $pieList.
	// // '_.each' is an "iterator" function provided by Underscore.js
	// _.each(posts, function(post, index) {
	// 	var $post = $(postTemplate(post));
	// 	$post.attr('data-index', index);
	// 	$pieList.append($post);

	// 	// add features
	// 	var $features = $(featuresTemplate());
	// 	$featuresList.prepend($features);
	// });

	// submit form to create new pieku
	// $newPost.on('submit', function(event) {
	// 	event.preventDefault();

	// 	// create new pieku object from form data
	// 	var postTitle = $('#post-title').val();
	// 	var postAuthor = $('#post-author').val();
	// 	var postDesc = $('#post-desc').val();
	// 	var dateString = (new Date()).toLocaleDateString("en-US");
	// 	var postData = {title: postTitle, author: postAuthor, post: postDesc, time: dateString};

	// 	// store our new post
	// 	posts.push(postData);
	// 	var index = posts.indexOf(postData);

	// 	// append our new post to the page
	// 	var $post = $(postTemplate(postData));
	// 	$post.attr('data-index', index);
	// 	$pieList.prepend($post);

	// 	var $features = $(featuresTemplate());
	// 	$featuresList.prepend($features);

	// 	$('#myModal').on('hidden.bs.modal', function (e) {
	// 		// scrolls to new post of piekus
	// 		var yPost = $post.offset().top;
	// 		window.scroll(0, yPost);
	// 	});

	// 	// hides modal and give alert upon submit
	// 	$('#myModal').modal('hide');

	// 	// reset the form
	// 	$newPost[0].reset();
	// });

	// $('#myModal').on('shown.bs.modal', function (e) {
	// 	$('#post-title').focus();
	// });

	// // navigates to pieku list after click.
	// $("#piekuNav").click(function() {
	// 	event.preventDefault();

	// 	var yPost = $('#piekus').offset().top-180;
	// 	window.scroll(0, yPost);
	// });

	// // scroll event to fade out top navbar and fade in left navbar
	// $(window).scroll(function(event) {
	// 	var yScroll = $(window).scrollTop();
	// 	var yPiekus = $("#piekus").offset();
	// 	if(yScroll >= yPiekus.top-180){
	// 		$topNavbar.fadeOut();
	// 		$leftNavbar.fadeIn();
	// 	} else {
	// 		$topNavbar.fadeIn();
	// 		$leftNavbar.fadeOut();
	// 	}
	// });

	// // remove post from list.
	// $pieList.on("click", ".delete", function(){
	// 	var $post = $(this).closest(".post");
	// 	var index = $post.attr('data-index');

	// 	posts.splice(index, 1);

	// 	$post.remove();

	// 	$('.post').each(function(index){
	// 		$(this).attr('data-index', index);
	// 	});
	// });
