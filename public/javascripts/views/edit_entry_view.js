var EditEntryView = Ember.View.extend({
	didInsertElement: function () {
		console.log(this.get('controller'));
	}
});

module.exports = EditEntryView;

