var Profile = DS.Model.extend(Ember.Validations.Mixin, {
  age: DS.attr('number'),
  name: DS.attr('string'),
  last_name: DS.attr('string'),
  avatar: DS.attr('string'),
  user: DS.belongsTo('user'),

  validations: {
    name: {
      presence: true,
      length: { minimum: 3 }
    },
    last_name: {
      presence: true,
      length: { minimum: 3 }
    },
    age: {
    	presence: true,
    	onlyInteger: true,
    	greaterThan: 18, lessThanOrEqualTo : 90
    }
  }     
});

module.exports = Profile;

