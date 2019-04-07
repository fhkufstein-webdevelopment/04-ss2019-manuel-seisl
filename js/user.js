$(document).ready(function(){

    var userListBody = $(".userList tbody");

    //@todo store and somehow update the current number of users

    $(".needs-validation").submit(function(event){

        event.preventDefault();
        event.stopPropagation();

        if (this.checkValidity() === false){

            $(this).addClass("was-validated");

            return false;

        };

        //@todo
        //1. get values
        //2. create a new element
        //3. somehow add them to userListBody
        //4. update number of current users
        //5. clear entries from the form
        //6. maybe do something else... :-)

        // Get number of users and username

        var usersCnt = $(userListBody).find("tr").length,
            username = $(this).find("input#username").first().val();

        // Add user

        $(userListBody).append(writeEntry(usersCnt + 1, username));

        // Clear form field

        $(this).find("input#username").val("");

        return false;

    });

    $(userListBody).on("click", ".deleteTrigger", function(){

        //@todo
        //1. remove current user from dom
        //2. update number of current users

        // Show remove confirmation modal

        $(this).parents("tr").first().addClass("delete");
        showModal();

    });

    // Write entry with index and username

    function writeEntry(index, username){

        var html = "";

        html += "<tr>";
            html += "<td>" + index + "</td>";
            html += "<td>" + username + "</td>";
            html += "<td>";
                html += "<button type='button' class='btn btn-secondary btn-danger deleteTrigger' title='Löschen'>";
                    html += "<i class='fa fa-trash'></i>";
                html += "</button>";
            html += "</td>";
        html += "</tr>";

        return html;

    };

    // Show remove confimation modal

    function showModal(){

        var html = "";

        html += "<div class='modal fade removeModal' tabindex='-1' role='dialog'>";
            html += "<div class='modal-dialog' role='document'>";
                html += "<div class='modal-content'>";
                    html += "<div class='modal-header'>";
                        html += "<h5 class='modal-title'>Benutzer löschen</h5>";
                    html += "</div>";
                    html += "<div class='modal-body'>";
                        html += "<p>Sind Sie sicher, dass Sie den Benutzer löschen möchten?</p>";
                    html += "</div>";
                    html += "<div class='modal-footer'>";
                        html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Abbrechen</button>";
                        html += "<button type='button' class='btn btn-primary removeTrigger'>Ja, löschen</button>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";
        html += "</div>";

        $("body").append(html);

        setTimeout(function (){
            $(".removeModal").modal("show");
        }, 100);

        // Cancel event from modal

        $(".removeModal").on("hidden.bs.modal", function(e){
            $(".removeModal").remove();
            $(userListBody).find("tr").removeClass("delete");
        });

        // Show event from modal

        $(".removeModal").on("show.bs.modal", function(e){

            // Click event "delete" button

            $(".removeModal").on("click", ".removeTrigger", function(){

                $(userListBody).find("tr.delete").remove();

                // Hide modal

                $(".removeModal").modal("hide");

                // Update entries index

                updateEntriesIndex();

            });
        });

    };

    // Update entries index

    function updateEntriesIndex(){
        $(userListBody).find("tr").each(function(index){
            $(this).find("td:first-child").text(index + 1);
        });
    };

});