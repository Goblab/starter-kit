var NewEntryRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
  renderTemplate: function(controller, model) {
    this._super(controller, model);
    this.render('edit_entry', { controller: 'new_entry' });
  },

  model: function() {
    var store = this.get('store');
    var user_id = this.get('session.user_id');
    return new Ember.RSVP.Promise(function(resolve) {
        var entry = store.createRecord('entry');
        store.find('user', user_id).then(function(user) {
          entry.set('author', user);
          resolve(entry);
        });    
    });    
  },

  deactivate: function() {
    var model = this.get('controller.model');
    if (!model.get('isSaving')) {
      model.deleteRecord();
    }
  }  
});

module.exports = NewEntryRoute;

