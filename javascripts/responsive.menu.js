/* 
* Responsive Menu Trigger 
*/

document.getElementById('links-trigger').onclick = function() { // Find element with id 'links-trigger', and perform function on click... 
  var links = document.querySelector('#links'); // Find element with id 'links'  
	links.classList.toggle('show'); // Toggle 'show' class  
}