ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
    goBack: function(invoice) {
        Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});
        history.go(-1);
    },

   actions: {
   		unauthorized: function () {
			this.transitionTo('unauthorized');
   		},
   },
});

module.exports = ApplicationRoute;
