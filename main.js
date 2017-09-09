
var cell_id = '';
var chip_div_id = '';
var chip_img_id = '';
var col = $('.p_text');
 function createTable() {	
    var tbl = document.createElement("Table");	
	var elem = document.getElementById("main_tbl");	
	elem.appendChild(tbl);	
	for(j = 0; j < 14; j++){
		trow = tbl.appendChild(document.createElement('tr'));
		for (i = 0; i < 14; i++) {
			if (j>8) {
			cell_id = "cell_" + j + "_" + i + "_start";
			} else {
				cell_id = "cell_" + j + "_" + i;
			}
			
		tcell =	trow.appendChild(document.createElement('td'));		
		tcell.setAttribute( "id", cell_id );
		if(j!=9){
			tcell.style.border = "1px solid black";			
		} else {
			tcell.style.borderTop = "2px solid red";
			tcell.style.borderLeft = "1px solid black";
			tcell.style.borderRight = "1px solid black";
		}
		}
	}
}
var chip_names = ["St", "Asmin", "Aircraft", "AtomBomb", "Avia", "Br", "Kraser", "Krpl", "Lincor", "Mine", "R", "Sm", "Sugmarine", "Tk", 
"Torpeda", "Tr", "VMB"];
var chip_pictures = new Array ();
chip_pictures[0] = "st.jpg";
chip_pictures[1] = "asm.jpg";
chip_pictures[2] = "aircraft.jpg";
chip_pictures[3] = "atombomb.jpg";
chip_pictures[4] = "avia.jpg";
chip_pictures[5] = "br.jpg";
chip_pictures[6] = "kraser.jpg";
chip_pictures[7] = "krpl.jpg";
chip_pictures[8] = "linkor.jpg";
chip_pictures[9] = "mine.jpg";
chip_pictures[10] = "r.jpg";
chip_pictures[11] = "sm.jpg";
chip_pictures[12] = "sugmarin.jpg";
chip_pictures[13] = "tk.jpg";
chip_pictures[14] = "torpeda.jpg";
chip_pictures[15] = "tr.jpg";
chip_pictures[16] = "vmb.jpg";
var chip_amount = [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function createChipContainer() {		
	for (i = 0; i < chip_pictures.length; i++) {
		chip_div_id = "chip_div_" + chip_names[i];
		chip_img_id = "chip_img_" + chip_names[i];
		var elem = document.getElementById("chip-container");
		var	div_row = elem.appendChild(document.createElement('div'));
		div_row.setAttribute( "class", "row" );
		
		var div_col4 = div_row.appendChild(document.createElement('div'));
		div_col4.setAttribute("class", "col-md-4");
		div_col4.setAttribute("id", chip_div_id);  
		
		for (j = 0; j < chip_amount[i]; j++) {
			var div_elem_img = div_col4.appendChild(document.createElement('img'));		
			div_elem_img.setAttribute("id", chip_img_id + 'i');
			div_elem_img.setAttribute("src", chip_pictures[i]);	
			div_elem_img.setAttribute("height", "20");
			div_elem_img.setAttribute("width", "40");
			div_elem_img.style.zIndex = j;
		}
		var div_col3 = div_row.appendChild(document.createElement('div'));
		div_col3.setAttribute("class", "col-md-3");
	
		var elem_amount = div_col3.appendChild(document.createElement('p'));
		elem_amount.innerHTML = chip_amount[i];
		elem_amount.setAttribute( "class", "p_text" );
	
		var div_col5 = div_row.appendChild(document.createElement('div'));
		div_col5.setAttribute("class", "col-md-5");
	
		var elem_name = div_col5.appendChild(document.createElement('p'));
		elem_name.innerHTML = chip_names[i];	
	}	  
}
$(document).ready(function() {
//Эффект перетаскивания
$('img[id*=chip_img]').draggable({
		revert : 'invalid',
		helper: 'clone',
		cursor : 'move'
	});
	
// Ячейки
$('td[id*=start]').droppable({
		accept: 'img[id*=chip_img]',
		activeClass: 'highlight',
		drop: function(event, ui) {
			var chip = $(ui.draggable);
			var cell = $(this).attr('id');
			var chip_id = $(chip).parent().attr('id');
			var a = $('#' + chip_id + '+ div > p').text();			
			var a1 = parseInt(a)-1;
			if (a1 >= 0){
				$('#' + chip_id + '+ div > p').text(a1);
			}
			chip.fadeOut(200, function(){
			$(this).appendTo('#' + cell).fadeIn();	
			checkStart();
			});
			
			
		}
});
// Колонка с фишками

$.each(chip_names,function(index,value){
  $('#chip_div_' + value).droppable({	  
		accept: 'img[id*=chip_img_' + value+ ']',
		drop: function(event, ui) {			
		var chip_back = $(ui.draggable);
		chip_back.fadeOut(200, function(){
		$(this).appendTo('#chip_div_' + value).fadeIn();
		var a = $('#chip_div_' + value + '+ div > p').text(); 		
		var a1 = parseInt(a)+1;
			$('#chip_div_' + value + '+ div > p').text(a1);
		});		
	}	
});

});

function checkStart() {
    var flag = true;
		$('.p_text').each(function(index){					 				 
			if ( $( this ).text() != '0' ) { 				  
				flag = false;
			}			   
	    });  		
		if(flag){		
			$('#play_but').removeClass('disabled'); 
		}	 
	}

function object_start(cell_id_obj, img_id_obj) {
  this.cell_id_obj = cell_id_obj;
  this.img_id_obj = img_id_obj;
}

	$('#play_but').click(function(){
		$('td[id*=start]').each(function(index){
			if ( $( this ).is(':parent') ) { 	
				var cell_id_obj = $(this).attr('id');
				var img_id_obj = $(this).children().attr('id');
				alert (cell_id_obj + ',' +img_id_obj);
				 
				 
			}			   
	    });  
});
	
}); //Конец ready

