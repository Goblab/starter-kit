var IndexRoute = Ember.Route.extend({
  model: function  () {
	return this.get('store').find('entry');
  }
});

module.exports = IndexRoute;

