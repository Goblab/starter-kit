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
			class: 'btn-warning',
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

	sockets: {
		newRecord: function (message) {
		  var store = this.get('store');
		  store.find(message.model, message.data).then(function (record) {
		  	if (record)
		  		record.reload();
		  });
		},

		sort: function (message) {
		  var store = this.get('store');
		  message.data.forEach(function (item) {
			  store.find(message.model, item.id).then(function (record) {
			  	record.set('order', record.order);
			  });
		  })
		},

		deleteRecord: function (message) {
		  var store = this.get('store');
		  store.find(message.model, message.data).then(function (record) {
		  	record.unloadRecord();
		  })
		},
	}
});

module.exports = ApplicationController;

