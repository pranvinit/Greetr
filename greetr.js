(function (global, $) {
  // creates a new object (trick borrowed from jQuery so we don't have to use the 'new' keyword)
  const Greetr = function (firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  };

  // hidden within the scope of the IIFE and never directly accessible (methods declared in the library still have access to the variables because of closures)
  const supportedLangs = ["en", "es", "cn"];

  // informal greetings
  const greetings = {
    en: "Hello",
    es: "Hola",
    cn: "Nǐ hǎo",
  };

  // formal greetings
  const formalGreetings = {
    en: "Greetings",
    es: "Saludos",
    cn: "Wènhòu",
  };

  // log messages
  const logMessages = {
    es: "Logged in",
    es: "Conectado",
    cn: "Dēnglù",
  };

  Greetr.prototype = {
    fullName() {
      // 'this' refers to the calling object at execution time
      return this.firstname + " " + this.lastname;
    },
    validate() {
      // check that is a valid language
      // references the externally inaccessible 'supportedLangs' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Language";
      }
    },
    greeting() {
      // retrieve messages from object by referring to properties using [] syntax
      return greetings[this.language] + " " + this.firstname + "!";
    },
    formalGreetings() {
      return formalGreetings[this.language] + ", " + this.fullName();
    },
    // chainable methods return their own containing object
    greet(formal = false) {
      let message;
      // if undefined or null it will be coerced to 'false
      if (formal) {
        message = this.formalGreetings();
      } else {
        message = this.greeting();
      }
      if (console) {
        console.log(message);
      }
      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },
    log() {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }
      // make chainable
      return this;
    },
    setLang(lang) {
      this.language = lang;
      this.validate();
      return this;
    },
    HTMLGreeting(selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }
      if (!selector) {
        throw "Missing jQuery selector";
      }
      // determine the message
      let message;
      if (formal) {
        message = this.formalGreetings();
      } else {
        message = this.greeting();
      }
      // inject the message in the chosen node in the DOM
      $(selector).html(message);
      // make chainable
      return this;
    },
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function (firstname = "", lastname = "", language = "en") {
    const self = this;
    self.firstname = firstname;
    self.lastname = lastname;
    self.language = language;
    self.validate();
  };
  // sets the prototype of the newly created object from the 'Greetr' function to the prototype property of 'Greetr'
  Greetr.init.prototype = Greetr.prototype;
  // attach our Greetr to the global object, and provide a shorhand '$G' for ease of use
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
