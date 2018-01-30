$(document).ready(function(){
  $('.collapsible').collapsible();
  $('select').material_select();

  $('.start-rule').change(function(){
	  console.log(this.value);
  });
});

