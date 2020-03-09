$(function() {

  $("#orderForm input,#orderForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name2").val();
      var email = $("input#email2").val();
      var phone = $("input#phone2").val();
      var message = $("textarea#message2").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendOrderButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "./../php/order.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#ordering').html("<div class='alert alert-success'>");
          $('#ordering > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#ordering > .alert-success')
            .append("<strong>Ваша замова адпраўлена. У бліжэйшы час з вамі звяжацца пчаляр, каб удакладніць дэталі.</strong>");
          $('#ordering > .alert-success')
            .append('</div>');
          //clear all fields
          $('#orderForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#ordering').html("<div class='alert alert-danger'>");
          $('#ordering > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#ordering > .alert-danger').append($("<strong>").text("Выбачайце " + firstName + ", нешта пайшло не так на маім паштовым сэрверы. Калі ласка паспрабуйце трохі пазней!"));
          $('#ordering > .alert-danger').append('</div>');
          //clear all fields
          $('#orderForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
