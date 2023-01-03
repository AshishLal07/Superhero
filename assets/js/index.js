// create a search list of what you type


$('#heroDataList').on('keyup',function(e){
    
    $('#startWith').html("")
    let charName = e.target.value;
    if(charName){
        
        $.ajax({
            type:'get',
            url:`https://gateway.marvel.com:443/v1/public/characters?limit=20&nameStartsWith=${charName}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
            success:function(data){
            
                for(let val of data.data.results){
            
                    let li = `<li data-id="${val.id}"> ${val.name}</li>`
                    $('#startWith').append(li);
                }
    
            }
        });
    }
    
});

$('#startWith').click(function(e){
    $('#heroDataList').val(e.target.textContent);
})

// favourite button functionality and local storage used to store data

$('#fav').click(function(e){
    if($('#heroDataList').val() != ''){
        let heroName = $('#heroDataList').val().replace(' ','');

        $.ajax({
            type:'get',
            url:`https://gateway.marvel.com:443/v1/public/characters?limit=100&name=${heroName}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
            success:function(data){
                let hero = {
                    id:data.data.results[0].id,
                    name:heroName 
                }
                window.localStorage.setItem(hero.id,hero.name);
                notificaiton("Added to your favourite list");
               
            }
        });
    }
})

function notificaiton(setMessage){
    alert(setMessage);
}