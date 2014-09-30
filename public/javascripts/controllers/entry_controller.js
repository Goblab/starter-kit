var EntryController = Ember.ObjectController.extend({
	actions: {
		destroy: function() {
		    if (!confirm('Are you sure?')) return;
		    this.get('model').deleteRecord();
		    this.get('model').save();
		    this.get('target.router').transitionTo('entries');
		    this.get('socket').emit('deleteEntry', this.get('model.id'));
	    }
	},

	canEdit: function () {
		if (this.get('session.user_id') == this.get('model.author.id')) {
			return true;
		} else {
			return false;
		}
	}.property('session.currentUser', 'model'),
});

module.exports = EntryController;

