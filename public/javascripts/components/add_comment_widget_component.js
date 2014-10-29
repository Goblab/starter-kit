var AddCommentWidgetComponent = Ember.Component.extend({
	actions: {
		publish: function () {
			this.sendAction('submit', {
        		message: this.get('message'),
        		entry: this.get('model')
      		});
      		this.set('message', '');
		},
	},
});

module.exports = AddCommentWidgetComponent;

