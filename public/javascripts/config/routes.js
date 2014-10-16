var App = require('./app');

App.Router.map(function() {

  // generated by ember-generate --scaffold
  this.resource('articles');
  this.resource('article', {path: '/articles/:article_id'});
  this.route('edit_article', {path: '/articles/:article_id/edit'});
  this.route('new_article', {path: '/articles/new'});
  // end generated routes


  // generated by ember-generate --scaffold
  this.resource('articles');
  this.resource('article', {path: '/articles/:article_id'});
  this.route('edit_article', {path: '/articles/:article_id/edit'});
  this.route('new_article', {path: '/articles/new'});
  // end generated routes


  // generated by ember-generate --scaffold
  this.resource('articles');
  this.resource('article', {path: '/articles/:article_id'});
  this.route('edit_article', {path: '/articles/:article_id/edit'});
  this.route('new_article', {path: '/articles/new'});
  // end generated routes


  // generated by ember-generate --scaffold
  this.resource('malus');
  this.resource('malu', {path: '/malus/:malu_id'});
  this.route('edit_malu', {path: '/malus/:malu_id/edit'});
  this.route('new_malu', {path: '/malus/new'});
  // end generated routes


  // generated by ember-generate --scaffold
  this.resource('profiles');
  this.resource('profile', {path: '/profiles/:profile_id'});
  this.route('edit_profile', {path: '/profiles/:profile_id/edit'});
  this.route('new_profile', {path: '/profiles/new'});
  // end generated routes

  this.route('login');
  this.route('logout');
  this.route('signup');
  this.route('unauthorized');
  this.route('user_profile', {path: '/users/:user_id/profile'});

  // generated by ember-generate --scaffold
  this.resource('entries');
  this.resource('entry', {path: '/entries/:entry_id'});
  this.route('edit_entry', {path: '/entries/:entry_id/edit'});
  this.route('new_entry', {path: '/entries/new'});
  // end generated routes



});

