var copy = "../../src";
var commons = require("@vimlet/commons");


commons.run.exec("node", [copy, "-i", "resources/**/*.*", "-o", "output"], null, null, function (error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log("done!");
    }
  });

  
commons.run.exec("node", [copy, "-w", "-i", "resources/**/*.*", "-o", "output"], null, null, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log("Watching!");
  }
});