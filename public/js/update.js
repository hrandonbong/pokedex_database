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

function updateTrainer(id){
    $.ajax({
        url: '/trainer.handlebars/' + id,
        type: 'PUT',
        data: $('#update-trainer').serialize(),
        success: function(result){
            window.location.href = "/trainer.handlebars";
        }
    })
};

function updatePokedex(id){
    $.ajax({
        url: '/pokedex.handlebars/' + id,
        type: 'PUT',
        data: $('#update-pokedex').serialize(),
        success: function(result){
            window.location.href = "/pokedex.handlebars";
        }
    })
};

function updatePokemon(id){
    $.ajax({
        url: '/pokemon.handlebars/' + id,
        type: 'PUT',
        data: $('#update-pokemon').serialize(),
        success: function(result){
            window.location.href = "/pokemon.handlebars";
        }
    })
};

function updatePokedexPokemon(id){
    $.ajax({
        url: '/pokedex_pokemon.handlebars/' + id,
        type: 'PUT',
        data: $('#update-pokedex_pokemon').serialize(),
        success: function(result){
            window.location.href = "/pokedex_pokemon.handlebars";
        }
    })
};