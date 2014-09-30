var EditEntryRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
	roles: ['PEPE'],
});

module.exports = EditEntryRoute;

