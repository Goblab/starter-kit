var EntryController = Ember.ObjectController.extend({
	actions: {
		destroy: function() {
		    if (!confirm('Are you sure?')) return;
		    this.get('socket').emit('deleteRecord', {model: 'entry', data: this.get('model.id')});
		    this.get('model').deleteRecord();
		    this.get('model').save();
		    this.get('target.router').transitionTo('entries');
	    },

	    sort: function (data) {
	    	var order = 0;
	    	var sortData  = [];
	    	data.forEach(function (item) {
	    		item.set('order', order);
	    		item.save();
	    		sortData.pushObject({id: item.id, i: item.order});
	    		order++;
	    	});
	    	this.get('socket').emit('sort', {model: 'comment', data: sortData});
	    },

		publishComment: function (data) {
			_self = this;
			_self.get('store').find('user', this.get('session.user_id')).then(function (author) {
				var comment = _self.get('store').createRecord('comment', {message: data.message, entry: data.entry, author: author});
				comment.save().then(function (comment) {
					data.entry.reload();
					_self.get('socket').emit('newRecord', {model: 'entry', data: data.entry.get('id')});
				});
			})
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

