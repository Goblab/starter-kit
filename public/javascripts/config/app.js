
var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    Socket: EmberSockets.extend({
        host: '181.164.86.99',
        port: 5000,
        controllers: ['Entries', 'EditEntry', 'UserProfile'],
        autoConnect: true
    }),
});

App.AutoSuggestComponent = window.AutoSuggestComponent;

// the custom authenticator that handles the authenticated account
App.CustomAuthenticator = Ember.SimpleAuth.Authenticators.OAuth2.extend({
  authenticate: function(credentials) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // make the request to authenticate the user at endpoint /v3/token
      Ember.$.ajax({
        url:  'token',
        type: 'POST',
        data: { grant_type: 'password', username: credentials.identification, password: credentials.password }
      }).then(function(response) {
        Ember.run(function() {
          // resolve (including the account id) as the AJAX request was successful; all properties this promise resolves
          // with will be available through the session
          resolve({ access_token: response.access_token, user_id: response.user_id });
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseText);
        });
      });
    });
  }
});

Ember.Route.reopen({
  renderTemplate: function (controller, model) {
    this._super(controller, model);
    if (controller.get('actionsList')) {
      this.render('action_bar', {outlet: 'actionBar', into: 'application'});
    } else {
      this.render('action_bar', {outlet: 'actionBar', into: 'application', controller: this.controllerFor('application')});
    }
  },
})


Ember.SimpleAuth.AuthenticatedRouteMixin.reopen({
  beforeModel: function(transition) {
    this._super(transition);
    if (!this.get('session').get('isAuthenticated')) {
      transition.abort();
      this.get('session').set('attemptedTransition', transition);
      Ember.assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop.', this.get('routeName') !== 'login');
      transition.send('authenticateSession');
    } else {
      if (this.get('roles'))
      {
        //transition.abort();
        //transition.send('unauthorized');
      }
    }
  }
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

module.exports = App;

$(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') || $(e.target).is('button')) {
        $(this).collapse('hide');
    }
});