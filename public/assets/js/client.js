

$(document).ready(function () {

  // on click function for devouring a burger
  $(".change-eaten").on("click", function (event) {
    // grabbing the id number
    var id = $(this).data("id");
    // changing devoured to be true
    var newDevouredState = {
      devoured: true
    };

    // put ajax call to update devoured and reload
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        location.reload();
      }
    );
  });

  // onclick event for clear all button
  $("#clear").on("click", function (event) {
    // ajax delete all call
    $.ajax("/api/burgers", {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted all");
        location.reload();
      }
    )
  })

  // on click event for creating new burger
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    // grabs new burger name and sets devoured to false
    var newBurger = {
      burger_name: $("#newBurger").val().trim(),
      devoured: false
    };

    // to prevent empty inputs from creating blank burgers
    if (newBurger.burger_name) {

      // ajax Put to update list with new burger and reload the page
      $.ajax("/api/burgers", {
        type: "PUT",
        data: newBurger
      }).then(
        function () {
          location.reload();
        }
      );
    }
  });

});

