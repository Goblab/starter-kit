var EntryRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    var user_id = this.get('session.user_id');
	return new Ember.RSVP.Promise(function(resolve) {
		var entries = store.find('entry').then(function (entries) {
	 		resolve(entries);
		})
    });
  },
});

module.exports = EntryRoute;

