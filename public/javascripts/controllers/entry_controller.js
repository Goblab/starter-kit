var EntryController = Ember.ObjectController.extend({
	actions: {
		destroy: function() {
		    if (!confirm('Are you sure?')) return;
		    this.get('socket').emit('deleteRecord', {model: 'entry', data: this.get('model.id')});
		    this.get('model').deleteRecord();
		    this.get('model').save();
		    this.get('target.router').transitionTo('entries');
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

