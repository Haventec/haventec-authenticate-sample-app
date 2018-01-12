# Haventec Authenticate sample app

This is a sample application to demonstrate how to use Haventec Authenticate.
This application is **NOT** intended to be used in a Production environment.

## Getting Started

### Prerequisites

Install [NodeJS](https://nodejs.org)
 
Install [Ionic](https://ionicframework.com/)

### Installing

Install the dependencies within the root folder
```
npm install
```

### Configure the App

We need to update the API_ENDPOINT and APPLICATION_UUID values in the application.const.ts file.

The API_ENDPOINT value tells this application where your backend server is located.

The APPLICATION_UUID is from the Haventec Cloud Portal. This is created when you add a new Application

Edit the values in 
```
/src/constants/application.const.ts
```

### Running

Start the server
```
ionic serve
```

Run with Android
```
ionic cordova run android
```

Run with iOS
```
ionic cordova run ios
```
## Backend Sever

This sample application was built to work with [Haventec's Authenticate sample server](https://github.com/Haventec/haventec-authenticate-sample-server).
However you can modify this code to easily work with your own server

## Deploying

[Ionic deploying](https://ionicframework.com/docs/intro/deploying/)

## Publishing

[Ionic publishing](http://ionicframework.com/docs/v1/guide/publishing.html)

## Built With

* [Ionic](https://ionicframework.com/)
* [Typescript](https://www.typescriptlang.org/) 

## Authors

* [Haventec](http://www.haventec.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
