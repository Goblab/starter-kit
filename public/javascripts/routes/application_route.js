ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  goBack: function(invoice) {
    Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});
    history.go(-1);
  },

  actions: {
   	unauthorized: function () {
		 this.transitionTo('unauthorized');
   	},

	  loading: function(transition, originRoute) {
     var view = this.container.lookup('view:loading').append();
     this.router.one('didTransition', view, 'destroy');
    }
  },
});

module.exports = ApplicationRoute;
