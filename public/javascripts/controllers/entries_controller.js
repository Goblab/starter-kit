var EntriesController = Em.PaginationController.extend({

	modelInfo: {
    	store: 'entry',
  	},

	sortProperties: ['createdAt'],
	sortAscending: false,

	sockets: {
		new_entry: function(data) {
	    	this.get('store').find('entry', data).then(function (model) {
	    		console.log(model);
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

