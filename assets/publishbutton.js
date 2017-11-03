(function ($) {
	'use strict';

	Symphony.Language.add({
		'Published': false,
		'Unpublished': false
	});

	$(function() {
		if ($('.page-edit .field-publishbutton').length <= 0) return false;

		var publish_field = $('.field-publishbutton input'),
			publish_field_name = publish_field.attr('name'),
			publish_button = $('#context .actions').append('<li><a class="publishbutton-trigger create button disabled">' + Symphony.Language.get('Unpublished') + '</a></li>').find('.create');

		if (publish_field.is(':checked')) {
			publish_button
				.removeClass('disabled')
				.text(Symphony.Language.get('Published'));
		}

		publish_button.on('click', function () {
			var data = {
				'xsrf': Symphony.Utilities ? Symphony.Utilities.getXSRF() : '',
				'id': Symphony.Context.get('env').entry_id,
				'action[save]': 1,
				'action[ignore-timestamp]': 1
			};

			if (publish_button.hasClass('disabled')) {
				data[publish_field_name]  = 'on';

				publish_button
					.removeClass('disabled')
					.text(Symphony.Language.get('Published'));

				publish_field.attr('checked', true);
			}
			else {
				data[publish_field_name]  = 'off';

				publish_button
					.addClass('disabled')
					.text(Symphony.Language.get('Unpublished'));

				publish_field.attr('checked', false);
			}

			updateState(data);
		});

		function updateState(data) {
			$.ajax({
				data: data,
				dataType: 'html',
				type: 'POST',
				error: function(result){
					console.log('error', result);
				},
				// Add file
				success: function(result) {
					console.log('success');
				},
			});

		}
	});

})(jQuery);
