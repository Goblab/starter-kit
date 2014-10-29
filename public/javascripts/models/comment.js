var Comment = DS.Model.extend(Ember.Validations.Mixin,{

  message: DS.attr('string'),
  author: DS.belongsTo('user'),
  entry: DS.belongsTo('entry'),
  createdAt: DS.attr('string', {
      defaultValue: function() { return new Date(); }
  }),
    
  validations: {
    /*
    message: {
      presence: true,
      length: { minimum: 40 }
    },
    */
  }
});

module.exports = Comment;

