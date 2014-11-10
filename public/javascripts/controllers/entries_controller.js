var EntriesController = Em.PaginationController.extend({
  	breadCrumb: 'Entradas',
	breadCrumbPath: 'entries',

	modelInfo: {
    	store: 'entry',
  	},

	sortProperties: ['createdAt'],
	sortAscending: false,

	sortFunction: function (dateX, dateY) {
		return Ember.compare(moment(dateX).unix(), moment(dateY).unix());
	},

	actions: {
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
	}
});

module.exports = EntriesController;

