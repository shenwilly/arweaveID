$(function(){
	$(".btn-save").click(function() {
		let input_field = $(this).parent().find("input");
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
