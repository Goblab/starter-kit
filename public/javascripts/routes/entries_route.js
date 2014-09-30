var EntryRoute = Ember.Route.extend({

  model: function() {
    return this.store.find('entry');
  }

});

module.exports = EntryRoute;

