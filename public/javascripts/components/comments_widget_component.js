var CommentsWidgetComponent = Ember.Component.extend({

	comments: null,

	moreThanTree: function () {
		if (this.get('comments.arrangedContent'))
			return this.get('comments.arrangedContent.length') > 3;
		return false;
	}.property('comments.arrangedContent.@each'),

	actions: {
		save: function (data) {
			this.sendAction('sort', data);
		}
	},

	initialize: function () {
		var _self = this;
		this.set('comments', Ember.ArrayController.create({
			sortProperties: ['createdAt'],
			sortAscending: true,
		}));

		this.get('model.comments').then(function (model) {
			_self.get('comments').set('model', model);
		});
	}.on('didInsertElement'),

	setComments: function () {
		this.get('comments').get('model').addObjects(this.get('model.comments'));
	}.observes('model.comments.@each')
});

module.exports = CommentsWidgetComponent;

