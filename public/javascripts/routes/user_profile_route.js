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
		this.controllerFor('entries').set('model', this.get('store').find('entry', {author: model.get('id')}));
		controller.set('user', model);
		controller.set('entries', this.controllerFor('entries'));
	},
});

module.exports = UserProfileRoute;
