function deleteRegion(id){
    $.ajax({
        url: '/regions.handlebars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteTrainer(id){
    $.ajax({
        url: '/trainer.handlebars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deletePokedex(id){
    $.ajax({
        url: '/pokedex.handlebars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deletePokemon(id){
    $.ajax({
        url: '/pokemon.handlebars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deletePokedexPokemon(id){
    $.ajax({
        url: '/Pokedex_pokemon.handlebars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};