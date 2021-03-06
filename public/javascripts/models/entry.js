var Entry = DS.Model.extend(Ember.Validations.Mixin, {

  message: DS.attr('string'),
  author: DS.belongsTo('user'),
  comments: DS.hasMany('comment', {async: true}),

  createdAt: DS.attr('string', {
      defaultValue: function() { return new Date(); }
  }),

  validations: {
    message: {
      presence: true,
      length: { minimum: 40 }
    },
  }    
});

module.exports = Entry;