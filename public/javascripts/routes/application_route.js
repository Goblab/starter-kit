ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  renderTemplate: function(controller, model) {
    this._super(controller, model);
    this.render('menu', {outlet: 'menu', into: 'application', controller: controller, model: model});
  },

  goBack: function(invoice) {
    Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});
    history.go(-1);
  },

  actions: {
   	unauthorized: function () {
		 this.transitionToAnimated('unauthorized', {main: 'slideLeft'});
   	},

	  loading: function(transition, originRoute) {
     var view = this.container.lookup('view:loading').append();
     this.set('loadingView', view);
     this.router.one('didTransition', view, 'destroy');
    },

    error: function(error, transition) {
        var view = this.get('loadingView');
        view.destroy();
        // Return true to bubble this event to any parent route.
        return true;
      }
  },
});

module.exports = ApplicationRoute;
