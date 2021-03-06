# FitnessTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Commands

- ng new fitness-tracker
- give y for add route
- select scss
- create new repository in github
- git remote add origin https://github.com/username/fitness-tracker.git
- git push origin master -f
- git checkout -b part1-adding-angular-material
- ng add @angular/material
- prebuilt theme - Indigo/Pink
- Material typograpy - N
- browser animations - Y

- ng g c auth/signup -m=app.module
- ng g c auth/login -m=app.module
- ng g c training -m=app.module
- ng g c training/current-training -m=app.module
- ng g c training/new-training -m=app.module
- ng g c training/past-trainings -m=app.module
- ng g c welcome -m=app.module

- create app-routing.module.ts for simplest routing for now
- ng g m app-routing --flat --module=app

- npm i -s @angular/flex-layout @angular/cdk
- npm i moment
- npm i @angular/material-moment-adapter

- ng g c navigation/header --module=app.module

- [x] ng add @angular/fire
- Register app in firebase console
- name: afb-fitness-tracker
  gives this

/\*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.19.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.19.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

\*/

/_
install firebase cli
npm install -g firebase-tools
_/

/\*
deploy to firebase hosting

$ firebase login
$ firebase init
\$ firebase deploy
\*/

- add firebaseConfig in environment.ts file

- npm install @ngrx/store --save
  or
- ng add @ngrx/store@latest

- cleanup branch created

To Deploy

- npm install -g firebase-tools

- firebase login / logout

- firebase init

  it will ask many questions: 1. select project: afb-fitness-tracker 2. directory to publish (and make it public): give the relative path of dist/fitness-tracker folder
  dont overwrite the index.html, use as it is.

- firebase deploy

- firebase deploy

## Lazy loading components reference:

https://johnpapa.net/angular-9-lazy-loading-components/
https://netbasal.com/welcome-to-the-ivy-league-lazy-loading-components-in-angular-v9-e76f0ee2854a
https://labs.thisdot.co/blog/loading-components-dynamically-in-angular-9-with-ivy
https://indepth.dev/lazy-loading-angular-modules-with-ivy/

https://brianflove.com/2019-12-13/lazy-load-angular-v9-components/
https://www.mokkapps.de/blog/manually-lazy-load-modules-and-components-in-angular/

https://www.ganatan.com/tutorials/lazy-loading-with-angular
