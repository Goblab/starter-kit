var UserProfileRoute = Ember.Route.extend({
	model: function (params) {
		var store = this.get('store');
	    return new Ember.RSVP.Promise(function(resolve) {
	    	store.find('user', params.user_id).then(function (user) {
	        	resolve(user);
	    	});
	    });		
	},

	setupController: function (controller, model) {
		controller.set('user', model);
	},
});

module.exports = UserProfileRoute;
