//IG
var ig = {};
// !!! USE YOUR OWN TOKEN
ig.token = '3696661727.1677ed0.95bfb6027efb481896579c0039e692c7';

ig.init = function() {
  $('.instagram').each(function(i) {
    var args = {};
    args.container = $(this);
    args.userid = args.container.data('userid');
    args.limit = args.container.data('limit');
    args.feedurl = 'https://api.instagram.com/v1/users/'+args.userid+'/media/recent/?access_token='+ig.token+'&count='+args.limit+'&callback=?';
    args.html = '';
    // PASS ARGS TO QUERY
    ig.query(args);
  });
}

ig.query = function(args) {
  $.getJSON(args.feedurl, {}, function(data) {
		// PASS QUERY DATA TO BUILDER
		ig.build(data, args);
	});
}


ig.build = function(data, args) {

  $.each(data.data,function (i,item) {
    console.log(item);
    if (item.caption) var caption = item.caption.text;
    var thumb = item.images.low_resolution.url;
    var img = item.images.standard_resolution.url;
    //get 1280 size photo [hack until avail in api]
    var hires = img.replace('s640x640', '1080x1080');
    args.html += '<a class="image" style="background-image: url('+thumb+');" data-img="'+hires+'">';
    if (caption) args.html += '<span class="caption">'+caption+'</span>';
    args.html += '</a>';
    // PASS TO OUTPUT
    ig.output(args);
  });
}

ig.output = function(args) {
  args.container.html(args.html);
}

ig.view = {
  viewer: $('.igviewer'),
  image: $('.igviewer img'),
  open: function(img) {
    ig.view.viewer.removeClass('hidden');
    ig.view.image.attr('src', img);
  },
  close: function() {
    ig.view.viewer.addClass('hidden');
    ig.view.image.attr('src', '');
  }
}

ig.init();
