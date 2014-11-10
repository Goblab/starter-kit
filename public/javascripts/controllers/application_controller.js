var ApplicationController = Ember.ObjectController.extend({
	actionsList: [
		{
			name: 'Publicar',
			action: 'publish',
			class: 'btn-warning',
			icon: 'fa-plus',
			private: true,
		}
	],

	history: [],

	hasHistory: function(){
		return this.get('history.length')>1;
	}.property('history.length'),

	watchHistory: function(){
		this.get('history').pushObject(this.get('currentPath'));
	}.observes('currentPath'),


	actions: {
		publish: function () {
			this.get('target').transitionToAnimated('new_entry', {main: 'slideLeft'});
		},

		back: function () {
			Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});	
		    this.get('history').popObject();
		    window.history.back(); 
		    this.get('history').popObject();
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

