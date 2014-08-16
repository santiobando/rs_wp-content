jQuery(document).ready(function ($) {
	
	
	//only begin if we're sure it's the right page
	if($('h3:contains("Typography")').length > 0 && $('#redux-opts-form-wrapper').length  > 0){
		
		//add font loading gif
		$('.typography-table tbody tr:nth-child(4n+0) td').append('<span class="font-attrs-loading"></span>');
		
		//turn selects into chosen
		$('.font-family select').chosen();
		
	

		$('.typography-table .font-family select').change(function(){

			updateFontAttrs($(this));
			
			//auto select first option in visible list
			$(this).closest('tr').next('tr').next('tr').find('select option').attr('selected','');
			$(this).closest('tr').next('tr').next('tr').find('select option:visible:first').attr('selected','selected');
			
			$(this).closest('tr').next('tr').next('tr').next('tr').find('select option').attr('selected','');
			$(this).closest('tr').next('tr').next('tr').next('tr').find('select option:visible:first').attr('selected','selected');

		});//change event
		
		
		
		
		//on load only show the corresponding weights
		//if($('input[name="salient[use-custom-fonts]"]').is(':checked')){
		$('.typography-table .font-family select').each(function(){
			updateFontAttrs($(this));
		});
		//}

		
	
	}//if typography h3
	
	
	
	
	function updateFontAttrs(element){
		
		//unhide all
		element.closest('tr').next('tr').next('tr').find('select option').show();
		

		var $that = element;
		
		//check what weights are available for font
		var $dataToPass = {
			action: 'nectar_check_font_attrs', 
			font_family: element.val(), 
		}
		
		//show loading
		$that.closest('tr').next('tr').next('tr').next('tr').find('.font-attrs-loading').stop().animate({'opacity':'1'},350);
		
		$.post(fontData.ajaxurl, $dataToPass, function(data){
			
			//hide loading
			$('.font-attrs-loading').stop().animate({'opacity':'0'},250);
			
			//parse returned JSON
			$json = $.parseJSON(data);
			
			//hide all options expect the placeholder
			$that.closest('tr').next('tr').next('tr').find('select option:not(:first)').hide();
			$that.closest('tr').next('tr').next('tr').next('tr').find('select option:not(:first)').hide();
			
			//loop through the json obj and show the applicable attrs
			$.each($json,function(i,v){
				
				 $.each(v.subsets,function(i,v){
				 	$that.closest('tr').next('tr').next('tr').next('tr').find('td option[value='+v+']').show(); 
				 });
				 
				 $.each(v.weights,function(i,v){
				 	$that.closest('tr').next('tr').next('tr').find('td option[value='+v+']').show(); 
				 });
				 
			});
			
		});
		

		
	}
	
	
	
	
	
})
