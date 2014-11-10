var EditEntryController = Ember.ObjectController.extend({

  actionsList: [
    {
      name: 'Guardar',
      action: 'submit',
      class: 'btn-success',
      icon: 'fa-save',
      private: true,      
    }
  ],

  actions: {
    submit: function() {
      that = this;
      if (this.get('model').get('isValid')) {
          this.get('model').save().then(function (model) {
            that.get('socket').emit('newRecord', {model: 'entry', data: model.get('id')});
            that.get('socket').emit('newRecord', {model: 'user', data: model.get('author.id')}); 
          });
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

