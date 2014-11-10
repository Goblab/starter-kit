var Rabit = DS.Model.extend(Ember.Validations.Mixin,{

  name: DS.attr('string')

  ,
  validations: {
    /*
    message: {
      presence: true,
      length: { minimum: 40 }
    },
    */
  }
});

module.exports = Rabit;

