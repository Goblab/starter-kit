var Authentication = Ember.Application.initializer({
  name:       'authentication',
  initialize: function(container, application) {
    // register the custom authenticator so the session can find it
    container.register('authenticator:custom', App.CustomAuthenticator);
    Ember.SimpleAuth.Session.reopen({
      currentUser: function() {
        var userId = this.get('user_id');
        var _self = this;
        if (!Ember.isEmpty(userId)) {
          container.lookup('store:main').find('user', userId).then(function (user) {

          }, function (error) {
            _self.invalidate();
          });            
          return container.lookup('store:main').find('user', userId);
        }

      }.property('user_id'),
    });
    Ember.SimpleAuth.setup(container, application, {
      authorizerFactory: 'ember-simple-auth-authorizer:oauth2-bearer'
    });    
  }
});


module.exports = Authentication;
