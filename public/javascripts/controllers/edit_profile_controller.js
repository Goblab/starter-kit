var EditProfileController = Ember.ObjectController.extend({
  actions: {
    submit: function() {
      if (this.get('model').get('isValid')) {
          this.get('model').save();
          this.redirectToModel();
      };
    },
    cancel: function() {
      this.transitionToRoute('entries');
    }
  },  
  
  redirectToModel: function() {
    var router = this.get('target');
    var model = this.get('model');
    router.transitionTo('profile', model);
  }
});

module.exports = EditProfileController;

