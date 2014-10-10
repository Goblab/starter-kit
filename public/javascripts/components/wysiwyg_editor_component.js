var WysiwygEditorComponent = Ember.Component.extend({
  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,

  willDestroyElement: function() {
    this.$('textarea').destroy();
  },

  didInsertElement: function() {
    var _this = this;
    var btnSize = this.get('btnSize');
    var height = this.get('height');
    this.$('.wysiwyg-textarea').summernote({
      airMode: true,
      airPopover: [
        ['color', ['color']],
        ['style', ['fontname']],
        ['size', ['fontsize']],
        ['font', ['bold', 'underline', 'clear']],
        ['para', ['ul', 'paragraph']],
        ['insert', ['link', 'picture']]
      ]      
    });

    var content = this.get('content');

    this.$('.wysiwyg-textarea').code(content);
    this.$('.btn').addClass(btnSize);
  },
  
  keyUp: function() {
    this.doUpdate();
  },

  click: function() {
    this.doUpdate();
  },

  doUpdate: function() {
    var content = this.$('.note-editable').code();
    this.set('content', content);
  }
});



module.exports = WysiwygEditorComponent;

