var EntriesView = Ember.View.extend({

	didInsertElement: function() {
		this._super();
		var view = this;
		$(window).bind("scroll", function() {
		  view.didScroll();
		});
	},

	didScroll: function() {
	  if(this.isScrolledToBottom()) {
	    this.get('controller').send('showMore');
	  }
	},

	willDestroyElement: function() {
	  $(window).unbind("scroll");
	},
	isScrolledToBottom: function() {
		var distanceToTop = $(document).height() - $(window).height(),
	    	top           = $(document).scrollTop();
		return top === distanceToTop;
	}	
});

module.exports = EntriesView;

