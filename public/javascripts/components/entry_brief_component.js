var EntryBriefComponent = Ember.Component.extend({
	classNames:['entry-brief', 'fade-out'],
	format: 'LL',
	
	formattedDate: function() {
		var date = this.get('model.createdAt'),
		    format = this.get('format');
		return moment(date).calendar();
	}.property('model.createdAt', 'format'),

	initialize: function () {
		this.$().fadeIn(500);
	}.on('didInsertElement'),
});

module.exports = EntryBriefComponent;

