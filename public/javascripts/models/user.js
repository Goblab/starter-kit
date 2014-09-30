var User = DS.Model.extend({
	username: DS.attr('string'),
	email: DS.attr('string'),
	entries: DS.hasMany('entry', {async: true}),
	profile: DS.belongsTo('profile'),
});

module.exports = User;

