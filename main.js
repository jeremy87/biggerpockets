$(document).ready(function(){
	
	$('.btn').click(function() {
		var objectName = $('#object-name').val();
		var objectUrl = $('#object-url').val();
    var rentBuy = $('#rentbuy :selected').text();
    
    //IMAGE VARIABLES
    var image1 = "http://www.letsgojeremy.com/wp-content/uploads/2017/01/house1.jpg";
    var image2 = "http://www.letsgojeremy.com/wp-content/uploads/2017/01/house2.jpg";
    var image3 = "http://www.letsgojeremy.com/wp-content/uploads/2017/01/house3.jpg";
    var image4 = "http://www.letsgojeremy.com/wp-content/uploads/2017/01/house4.jpg";
    var image5 = "http://www.letsgojeremy.com/wp-content/uploads/2017/01/house5.jpg";
    
    //IMAGES AT RANDOM ARRAY
    var imageArray = [image1, image2, image3, image4, image5];
    var randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];

    //CREATES PROPERTY LISTING
      if(objectName !== "" && objectUrl !== "") {
        $('.member-berries').prepend(
        '<div class="col-lg-4 memory">' + 
        '<img src="'+ randomImage + '" width="100%">' +
        '<div class="icons"><a class="memory-edit" src="#"><i class="fa fa-pencil"></i></a><a class="memory-delete" src="#"><i class="fa fa-trash"></i></a></div>' + 
        '<p class="rentbuy"><span class="rentbuy">' + rentBuy + '</span></p>' +
        '<p class="object-name">' + objectName + '</p>' + 
        '<span class="input-box"><input></input></span>' + 
        '<p class="object-url">' + objectUrl + '</p>' + 
        '</div>');
      } else {
        alert("Please fill in the fields");
      }

      if(rentBuy === 'Rent') {
        $('span.rentbuy').css('background-color', '#77acc6');
      } else {
        $('span.rentbuy').css('background-color', '#ee7b3c');
    }
	});

  $('#object-name, #object-url, #rentbuy').keypress(function(e){
        if(e.which === 13){
            $('.btn').click();
        }
    });
});

// SHOW ICONS ON HOVER
// I COMMENTED THIS CODE OUT BECAUSE I THOUGHT SHOWING THE ICONS AT ALL TIMES HELPED BALANCE
// THE TILE AND IMPROVED UX OF THE APP. HOWEVER, IT WAS PART OF THE REQUIRMENTS SO
// I WANTED TO SHOW I COULD STILL DO IT. 
// $(document).on({
//     mouseenter: function() {
//       $(this).children('.icons').css('display', 'inline-block');
//     },
//     mouseleave: function() {
//       $(this).children('.icons').css('display', 'none');
//     }
// }, ".memory");

// REMOVE PROPERTY WHEN TRASH ICON IS CLICKED
$(document).on('click', '.memory-delete', function() {
  $(this).closest('.memory').remove();
});

//EDIT PROPERTY NAME WITH PENCIL ICON IS CLICKED
$(document).on('click', '.memory-edit', function() {

  var parent = $(this).parents('div.memory');
  if($(this).hasClass('memory')) {
    parent = this;
  } 
  var name = $(parent).find('.object-name').text();
    $(parent).find('.object-name').hide();
    $(parent).find('.input-box').show();
    $(parent).find('.input-box input').val(name).focus();
});

$(document).on('blur','.memory', function(){
    var name = $(this).find('input').val();
    var parent = $(this).parents('div.memory');
      if($(this).hasClass('memory')) {
        parent = this;
      }
    $(parent).find('.object-name').show();
    $(parent).find('.input-box').hide();
    $(parent).find('.object-name').text(name);

    $.ajax({
      type: 'GET',
      url: 'change-name.xhr?name=' + name
    });
});