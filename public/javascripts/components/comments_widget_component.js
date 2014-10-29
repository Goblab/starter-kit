var CommentsWidgetComponent = Ember.Component.extend({

	actions: {
		publish: function () {
			this.sendAction('submit', {
        		message: this.get('message'),
      		});
      		this.set('message', '');
		},
	},
});

module.exports = CommentsWidgetComponent;

