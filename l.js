// Function to create the layout modal
function createLayoutModal() {
    // Create the modal structure
    var modalHtml = `
      <div class="modal fade" id="layoutModal" tabindex="-1" role="dialog" aria-labelledby="layoutModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="layoutModalLabel"><i class="fas fa-book-reader"></i></h5>
              <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="layout-option">
                      <a href="/">
                        <img src="layout.PNG" alt="Layout A">
                        Layout A
                      </a>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="layout-option">
                      <a href="qi.html">
                        <img src="layout2.PNG" alt="Layout B">
                        Layout B
                      </a>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="layout-option">
                      <a href="/c">
                        <img src="layout2.PNG" alt="Layout C">
                        Layout C
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append the modal HTML to the body
    $('body').append(modalHtml);

    // Attach event listener to the close button
    $('#layoutModal .close').click(function() {
        $('#layoutModal').modal('hide');
    });
}

// Function to open the layout modal
function openLayoutModal() {
    $('#layoutModal').modal('show');
}

// Call the function to create the layout modal
createLayoutModal();

// Attach event listener to the button to open the modal
$('#openLayoutModal').click(function() {
    openLayoutModal();
});
