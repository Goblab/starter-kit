var LoginController = Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, {
  authenticatorFactory: 'authenticator:custom'
});

module.exports = LoginController;
