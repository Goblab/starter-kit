Ember.EasyForm.Config.registerWrapper('basicFormWrapper', {
  // Define the custom template
  inputTemplate: 'wrappers/basic',

  // Define a custom config used by the template
  controlsWrapperClass: 'basic-controls',

  // Define the classes for the form, label, error...
  formClass: 'basic-form',
  fieldErrorClass: 'basic-error',
  errorClass: 'basic-help-inline',
  hintClass: 'help-block',
  labelClass: 'basic-control-label',
  inputClass: 'form-group'  
});


