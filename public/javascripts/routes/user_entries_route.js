var UserEntriesRoute = Ember.Route.extend({
	model: function (params) {
		var store = this.get('store');
	    return new Ember.RSVP.Promise(function(resolve) {
	    	store.find('entry', {author: params.user_id} ).then(function (entries) {
	        	resolve(entries);
	    	});
	    });		
	},
});

module.exports = UserEntriesRoute;

