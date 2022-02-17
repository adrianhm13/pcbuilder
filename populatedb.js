#! /usr/bin/env node

console.log(
  "This script populates some categories, manufacturers and components. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Category = require("./models/category");
var Component = require("./models/component");
var Manufacturer = require("./models/manufacturer");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var components = [];
var manufacturers = [];

function categoryCreate(title, description, cb) {
  var category = new Category({ title, description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function manufacturerCreate(name, description, website, cb) {
  var manufacturer = new Manufacturer({ name, description, website });

  manufacturer.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Manufacturer: " + manufacturer);
    manufacturers.push(manufacturer);
    cb(null, manufacturer);
  });
}

function componentCreate(name, features, price, category, cb) {
  var component = new Component({ name, features, price, category });

  component.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Component: " + component);
    components.push(component);
    cb(null, component);
  });
}

//Functions to create components, manufacturers and categories

function createCategory(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate(
          "CPU",
          "A central processing unit (CPU), also called a central processor, main processor or just processor, is the electronic circuitry that executes instructions comprising a computer program. The CPU performs basic arithmetic, logic, controlling, and input/output (I/O) operations specified by the instructions in the program.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "CPU Coolers",
          "A component that draws heat away from a CPU chip and other hot-running chips such as a graphics processor (GPU). ",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Motherboard",
          "Also called the 'system board,' 'main board' 'base board' or 'logic board,' it is the primary printed circuit board in a computer or other electronic device. In a modern desktop computer, the motherboard contains CPU and RAM sockets and the chipset, which houses the control circuits for all primary peripheral devices (drives, keyboard, mouse, etc.).",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Memory RAM",
          "The main memory in a computer. RAM is the temporary workspace where instructions are executed and data are processed. ",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createManufacturer(cb) {
  async.parallel(
    [
      function (callback) {
        manufacturerCreate(
          "AMD",
          "Founded in 1969 as a Silicon Valley start-up, the AMD journey began with dozens of employees focused on leading-edge semiconductor products. From those modest beginnings, AMD has grown into a global company setting the standard for modern computing through major technological achievements and many important industry firsts along the way.",
          "https://www.amd.com/es/corporate/about-amd",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Intel",
          "Founded in 1968, Intel’s technology has been at the heart of computing breakthroughs. We are an industry leader, creating world-changing technology that enables global progress and enriches lives.",
          "https://www.intc.com/about-intel",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Corsair",
          "CORSAIR (NASDAQ:CRSR) is a leading global developer and manufacturer of high-performance gear and technology for gamers, content creators, and PC enthusiasts.",
          "https://www.corsair.com/",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createComponent(cb) {
  async.parallel(
    [
      function (callback) {
        componentCreate(
          "AMD Ryzen 7 2700X",
          "Number of cores: 7, Number of threads: 16, Base Clock Speed: 3.7 GHz, Maximum Boost Speed: 4.3 GHz",
          300,
          categories[0],
          callback
        );
      },
      function (callback) {
        componentCreate(
          "Intel I9 9900K",
          "Number of cores: 8, Number of threads: 16, Max Turbo Frequency: 5.00 GHz, Processor Base Frequency: 3.60 GHz",
          550,
          categories[0],
          callback
        );
      },
      function (callback) {
        componentCreate(
          "Corsair Vengeance 2x8 ",
          "Type Memory: DDR4, Memory Color: BLACK, Speed Rating: PC4-25600 (3200MHz), SPD Speed: 2133MHz, 16 GB in two slots",
          75,
          categories[3],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategory, createManufacturer, createComponent],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Components: " + components);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
