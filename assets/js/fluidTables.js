/* 

fluidTable ver 0.2 by Bjørn Tennøe
===

About: CSS and JavaScript (requires jQuery) for fluid tables, e.g. for displaying search result snippets with attribute-value pairs in a fluid layout.
Lisence: CC-BY-SA (http://creativecommons.org/licenses/by-sa/4.0/)

Files: 

* fluidTable.css
* fluidTable.js

*/

// Resize fluid table(s)
function resizeFluidTables() {

  // Show source cells
  $( ".fluid-table-invisible-source" ).show(0);

  var fluidTableCellWidth = [];

  // Measure (normally invisible) source cells
  $( ".fluid-table-invisible-source td" ).each(function( index, value ) {
    fluidTableCellWidth[index] = $( this ).width();
  });

  // Resize (always visible) target cells. Adding 1 pixel due to apparent bug in Firefox.
  $( ".fluid-table-visible-target td>i" ).each(function( index, value ) {
    $( this ).css({'width': fluidTableCellWidth[index]+1 });
  });

  // Re-hide source cells
  $( ".fluid-table-invisible-source" ).hide();

}

// Create table(s) to be fluid
function initFluidTables() {

  // Create a container. Not really necessary, but keeps DOM tidier.
  $(".fluid-table").wrap( "<div></div>" );

  // This looks like a mess. What it does, is that .fluid-table duplicates itself, and each sibling gets a different class.
  $(".fluid-table").each(function() {
    $( this ).clone().appendTo( $( this ).addClass( "fluid-table-invisible-source" ).parent() ).addClass( "fluid-table-visible-target" );
  });

  // Add truncating element inside target cells
  $(".fluid-table-visible-target td").wrapInner( "<i></i>");

  // Truncate table contents at first drawing of the DOM and every time the window resizes
  resizeFluidTables();
  $( window ).resize(function() {
    resizeFluidTables();
  });

}