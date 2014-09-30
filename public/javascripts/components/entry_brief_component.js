var EntryBriefComponent = Ember.Component.extend({
	classNames:['entry-brief'],
	format: 'LL',
	formattedDate: function() {
		var date = this.get('model.createdAt'),
		    format = this.get('format');
		return moment(date).calendar();
	}.property('model.createdAt', 'format')
});

module.exports = EntryBriefComponent;

