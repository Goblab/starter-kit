var EntriesController = Ember.ArrayController.extend({
	sortProperties: ['createdAt'],
	sortAscending: false,
	sockets: {
		new_entry: function(data) {
	    	this.get('store').find('entry', data).then(function (model) {
	    		model.reload();
	    	});
		},

		delete_entry: function (data) {
			this.get('store').find('entry', data).then(function (model) {
	    		model.unloadRecord();
	    	});
		}
	}
});

module.exports = EntriesController;

