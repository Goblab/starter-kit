var EditEntryController = Ember.ObjectController.extend({
  actions: {
    submit: function() {
      if (this.get('model').get('isValid')) {
          _self = this;
          this.get('model').save().then(function (model) {
            _self.get('socket').emit('newEntry', model.get('id'));
          });;
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
    router.transitionTo('entry', model);
  }

});

module.exports = EditEntryController;

