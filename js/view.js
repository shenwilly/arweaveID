$(function(){
	
});

function update_login_state(is_logged_in, address) {
	if (is_logged_in) {
		$(".not-logged-in").hide();
		$(".logged-in").show();
		$("#arweave_public_address").html(address);
		// mark_owned_questions()
	} else {
		$(".not-logged-in").show();
		$(".logged-in").hide();
		$("#arweave_public_address").html();
	}
}
