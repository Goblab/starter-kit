var EditEntryController = Ember.ObjectController.extend({

  actionsList: [
    {
      name: 'Volver',
      action: 'back',
      class: 'btn-defaul',
      icon: 'fa-share',
      private: false,
    },
    {
      name: 'Guardar',
      action: 'submit',
      class: 'btn-success',
      icon: 'fa-save',
      private: true,      
    }
  ],

  actions: {
    back: function () {
      Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});  
      history.go(-1);
    },

    submit: function() {
      if (this.get('model').get('isValid')) {
          _self = this;
          this.get('model').save().then(function (model) {
            model.get('author').get('entries').pushObject(model);
            _self.get('socket').emit('newRecord', {model: 'user', data: model.get('author.id')}); 
            _self.get('socket').emit('newRecord', {model: 'entry', data: model.get('id')});
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

