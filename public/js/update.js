function updateRegion(id){
    $.ajax({
        url: '/regions.handlebars/' + id,
        type: 'PUT',
        data: $('#update-region').serialize(),
        success: function(result){
            window.location.replace(".");
            // window.location.reload(true);
        }
    })
};