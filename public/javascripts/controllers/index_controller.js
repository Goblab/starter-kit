var IndexController = Ember.ArrayController.extend({
	actionsList: [
		{
			name: 'Publicar',
			action: 'publish',
			class: 'btn-success',
			icon: 'fa-plus',
			private: true,
		}
	],

	actions: {
		publish: function () {
			this.get('target').transitionToAnimated('new_entry', {main: 'slideLeft'});
		},
	},	
});

module.exports = IndexController;

