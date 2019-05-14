$(function(){
	// TODO: Add complete validation for each field
	validator = $('#form-identity').validate({
	    rules: {
	      input_name: {
	        required: true
	      },
	      input_email: {
	        required: true
	      },
	      input_ethereum: {
	        required: true
	      },
	      input_twitter: {
	        required: true
	      },
	      input_discord: {
	        required: true
	      },
	    },
	    messages: {
	      input_name: {
	        required: 'Name must not be empty',
	      },
	      input_email: {
	        required: 'Email address must not be empty',
	      },
	      input_ethereum: {
	        required: 'Ethereum address must not be empty',
	      },
	      input_twitter: {
	        required: 'Twitter handle must not be empty',
	      },
	      input_discord: {
	        required: 'Discord ID must not be empty',
	      },

	    },
		onfocusout: false,
		onkeyup: false,
		onclick: false
	  });
	

	$(".btn-save").click(function() {
		let input_field = $(this).parent().find("input");

		if (!input_field.valid()) return;

		let type = input_field.attr("data");
		let value = input_field.val();
		save_identity_field(type, value);
		console.log(input_field.length, type, value);
	})
});

function update_login_state(is_logged_in, address) {
	if (is_logged_in) {
		fetch_identity(address);
		$(".not-logged-in").hide();
		$(".logged-in").show();
		$("#arweave_public_address").html(address);
	} else {
		$(".not-logged-in").show();
		$(".logged-in").hide();
		$("#arweave_public_address").html();
	}
}
