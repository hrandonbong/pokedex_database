function updateRegion(id){
    $.ajax({
        url: '/regions.handlebars/' + id,
        type: 'PUT',
        data: $('#update-region').serialize(),
        success: function(result){
            window.location.href = "/regions.handlebars";
            // window.location.reload(true);
        }
    })
};