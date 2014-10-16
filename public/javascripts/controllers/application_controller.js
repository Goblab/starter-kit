var ApplicationController = Ember.ObjectController.extend({
	actionsList: [
		{
			name: 'Volver',
			action: 'back',
			class: 'btn-defaul',
			icon: 'fa-share',
			private: false,
		},
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

		back: function () {
			Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});	
    		history.go(-1);
		},
	},
});

module.exports = ApplicationController;

