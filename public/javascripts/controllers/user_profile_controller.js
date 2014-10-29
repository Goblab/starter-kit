var UserProfileController = Ember.Controller.extend({
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

module.exports = UserProfileController;

