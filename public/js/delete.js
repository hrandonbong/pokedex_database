function deleteRegion(id){
    $.ajax({
        url: '/regions.handlebars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};