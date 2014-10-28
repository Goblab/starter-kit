var UserEntriesController =  Em.PaginationController.extend({

	modelInfo: {
    	store: 'entry',
  	},
  	
	sortProperties: ['createdAt'],
	sortAscending: false,

	sortFunction: function (dateX, dateY) {
		return Ember.compare(moment(dateX).unix(), moment(dateY).unix());
	},
});

module.exports = UserEntriesController;

