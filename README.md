# Figma Faker Plugin

Generate massive amounts of realistic fake data in Figma.

This is a UI built on top of [faker.js](https://github.com/Marak/faker.js).

## Data Included
+ Names
+ Addresses
+ Companies
+ Phone numbers
+ Dates
+ Lorem Ipsum
+ Internet text
+ Commerce text
+ Finance text
+ Random text
+ Computer system text
+ Hacker text

## Usage

+ Install it from the [Figma plugin library](https://www.figma.com/community).
+ Select one or more objects
+ Any text nodes in the selection will be replaced with the Faker text of your choice

## Development

First clone this repository
```shell
git clone https://github.com/coryetzkorn/figma-faker
cd figma-faker
```

Install dependencies & build files
```shell
npm install
npm run build
```

After that open a project in Figma Desktop, select _Plugins -> Development -> New Plugin_. Click `Choose a manifest.json` and find the `manifest.json` file in this plugin directory.

Done! Now _Plugins -> Development -> Faker_

## ToDo

- [ ] Better / more human date formatting

## Author

Cory Etzkorn ([Twitter](https://twitter.com/coryetzkorn))
