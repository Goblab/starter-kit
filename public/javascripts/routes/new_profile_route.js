var profile = require('../models/profile');

var NewProfileRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {

  renderTemplate: function(controller, model) {
    this._super(controller, model);
    this.render('edit_profile', {controller: 'new_profile'});
  },

  model: function() {
    var store = this.get('store');
    var user_id = this.get('session.user_id');
    return new Ember.RSVP.Promise(function(resolve) {
        var profile = store.createRecord('profile');
        store.find('user', user_id).then(function(user) {
          profile.set('user', user);
          resolve(profile);
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

module.exports = NewProfileRoute;

