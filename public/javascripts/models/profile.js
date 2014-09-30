var Profile = DS.Model.extend({
  age: DS.attr('number'),
  name: DS.attr('string'),
  last_name: DS.attr('string'),
  avatar: DS.attr('string'),
  user: DS.belongsTo('user'),
});

module.exports = Profile;

