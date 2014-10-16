var ApplicationView = Ember.View.extend({
	menuIsPressent: false,

	actions: {
		showMenu: function () {
			if (!this.get('menuIsPressent')) {
				this.$().addClass("show-menu");
				_self = this;
				Ember.run.next(function () {
					_self.set('menuIsPressent', true);
				});
			} else {
				this.hideMenu();
			}
		},

		hideMenu: function () {
			this.hideMenu();
		},
	},

	hideMenu: function () {
		this.set('menuIsPressent', false);
		this.$().removeClass("show-menu");
	},

	click: function () {
		if (this.get('menuIsPressent')) {
			this.hideMenu();
		}
	},

	didInsertElement: function () {
		this._super();
		document.addEventListener("backbutton", backKeyDown, true); 
		function backKeyDown() { 
		     // Call my back key code here.
		    alert('go back!');
		}		
	}
});

module.exports = ApplicationView;

