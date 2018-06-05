# Haventec Authenticate sample app

This is a sample application to demonstrate how to use Haventec Authenticate.
This application is **NOT** intended to be used in a Production environment.

## Getting Started

### Prerequisites

Install [NodeJS](https://nodejs.org) > v8.0.0
 
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

## Fingerprint Authentication

The app supports authentication using the user's fingerprint, on supported iOS and Android devices, in addition to PIN. 
The fingerprint will need to be activated on the device in order to enable this. Please see instructions for the specific device on setting up fingerprint ID scan.

## Publishing

[Ionic publishing](http://ionicframework.com/docs/v1/guide/publishing.html)

## Built With

* [Ionic](https://ionicframework.com/)
* [Typescript](https://www.typescriptlang.org/) 

## Authors

* [Haventec](http://www.haventec.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Troubleshooting

### Error building or running on Android (spawn EACCES)


**Steps to reproduce:** 
1. Run from the project folder the following command in order to build for android
```
cordova build android --verbose
```

**Error Output**

```
No scripts found for hook "before_compile".
		ANDROID_HOME=/Users/oscarsancheziglesias/Library/Android/sdk
		JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
		Running command: "/Applications/Android Studio.app/Contents/gradle/gradle-4.4/bin/gradle" -p /Users/oscarsancheziglesias/IdeaProjects/haventec-authenticate-sample-app/platforms/android wrapper -b /Users/oscarsancheziglesias/IdeaProjects/haventec-authenticate-sample-app/platforms/android/wrapper.gradle
		(node:78017) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: spawn EACCES
		(node:78017) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
		➜  haventec-authenticate-sample-app git:(master)
```

**Solution**
* Give execution permission to gradle. (Use the right location of gradle at your environment stated in the error above)
```
sudo chmod +x /Applications/Android\ Studio.app/Contents/gradle/gradle-4.4/bin/gradle
```
