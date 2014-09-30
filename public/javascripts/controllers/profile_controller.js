var ProfileController = Ember.ObjectController.extend({

	destroy: function() {
		if (!confirm('Are you sure?')) return;
		this.get('model').deleteRecord();
		this.get('store').commit();
		this.get('target.router').transitionTo('profiles');
	},

	canEdit: function () {
		if (this.get('session.user_id') == this.get('model.user.id')) {
			return true;
		} else {
			return false;
		}
	}.property('session.currentUser', 'model'),
});

module.exports = ProfileController;

