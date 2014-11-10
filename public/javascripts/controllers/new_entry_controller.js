var EditEntryController = require('./edit_entry_controller');

// inherit from edit controller
var NewEntryController = EditEntryController.extend({
  breadCrumb: 'New Entry',
  breadCrumbPath: 'new_entry',
});

module.exports = NewEntryController;

