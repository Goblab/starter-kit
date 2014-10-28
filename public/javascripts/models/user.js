var User = DS.Model.extend({
	username: DS.attr('string'),
	email: DS.attr('string'),
	profile: DS.belongsTo('profile', {async: true}),
	entries: DS.hasMany('entry', {async: true}),
});

module.exports = User;

