Goblab Starter
==============================

**Versions:** Ember 1.7, 1.0.0-beta.5+canary.b5d02af1, Handlebars 1.1.2, jQuery 2.0.3

## Prerequisites
- Node.js `http://nodejs.org`
- MongoDB `brew install mongodb`
- ember-tools: `sudo npm install -g ember-tools`

## Usage
Clone repo and navigate to the directory in terminal. Then to install all the dependencies run:
```
npm install
```

To start a web server, run `node app.js`. **Note**: MongoDB must be running or else the server won't start. Then visit `http://localhost:3000`. There are no server-side views, thus you will not see `res.render` anywhere in the code. The `index.html` is loaded implicitly from the `/public` folder. And `index.html` in turn loads the entire Ember application.

Updating *.scss stylesheets will automatically result in generating a proper css file, as long as the Express server is running. This ability is provided by the `node-sass` library.

For Ember source files you will use **ember-tools** to build and watch for file changes. Simply run `ember build` in the project root directory to compile all javascript files into `application.js`. If you want ember-tools to automatically run build command when files change, run `ember build -w`. Simple as that.

To recap: Make sure MognoDB is running. Run `node app.js`. Then in a separate terminal tab run `ember build -w`. And you are all set.

For generating models, views, controllers, templates, routes please refer to ember-tools [github page](https://github.com/rpflorence/ember-tools).




## Librarys
- Ember EasyForms
- Ember Validations
- Ember SimpleAuth
- Ember ListView


## Active Modules
- User  
	- Login
	- Logout
	- Sigin
	- Profile
		- Create
		- Edit
		- View
- Entry
	- View
	- Edit
	- Create
	- Delete
	
- UserWall:
	- View user Wall
		- View profile details
		- View user entries

## TO-DO
- Node app.js refactor
- Node app.js modularize
- ~~Node app.js implement Socket.io~~
- ~~Implement Ember Socket~~
- Implement Ember DC
- Implement Ember Leaflet (Maps)
- Implement User Profile Avatar (File upload, front end and back end)
