var offsetComic = 0 ;
var offsetEvent = 0 ;
var offsetSeries = 0 ;



{
    // getting the submit value from the params
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

   var value = params.hero.replace(' ',''); // "some_value and removes white spaces"
   


    // fetching the data of submited data and created info

    var createHeroInfo = function(){

        window.addEventListener('load',function(){

            $.ajax({
                type:'get',
                url:`http://gateway.marvel.com/v1/public/characters?limit=100&name=${value}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
                success: function(data){
                    console.log(data);
                    $('#hero-name').text(value);
                    $('#hero-desc').text(data.data.results[0].description);
                    $('#hero-img').attr('src',`${data.data.results[0].thumbnail.path}/portrait_incredible.${data.data.results[0].thumbnail.extension}`);
                    
                    comicList(data.data.results[0].comics.collectionURI);
                    eventList(data.data.results[0].events.collectionURI);
                    seriesList(data.data.results[0].series.collectionURI);
                }, error: function(err){

                    
                }
            })
        })

        
    }

    // creating a list of comics of Hero

    let comicDOM = function(comic){
       
        return ` <div class=comic>
                    <figure style="width:180px; height:350px">
                        <img src="${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}" alt="${comic.title}" >
                        <figcaption style="overflow:hidden;">${comic.title}</figcaption>
                    </figure>
                </div>` 
    }

    let comicList = function(comicLink){

        
        $.ajax({
            type:"get",
            url:comicLink+`?limit=5&offset=${offsetComic}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
            success: function(data){
                console.log(data);
                for(comic of data.data.results){
                   let addComic = comicDOM(comic);
                    $('#comic-lists').append(addComic);
                }
            }
        });
    }

    // creating a events list for Hero

    let EventDOM = function(event){
       
        return ` <div class=event>
                    <figure style="width:180px; height:350px">
                        <img src="${event.thumbnail.path}/portrait_xlarge.${event.thumbnail.extension}" alt="${event.title}" >
                        <figcaption>${event.title}</figcaption>
                    </figure>
                </div>` 
    }

    let eventList = function(EventLink){

        
        $.ajax({
            type:"get",
            url:EventLink+`?limit=5&offset=${offsetEvent}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
            success: function(data){

                console.log(data);
                for(ev of data.data.results){
                   let addEvent = EventDOM(ev);
                    $('#event-lists').append(addEvent);
                }
            }
        });
    }

    // creating a series list of Hero
    
    let seriesDOM = function(series){
       
        return ` <div class=event>
                    <figure style="width:180px; height:350px">
                        <img src="${series.thumbnail.path}/portrait_xlarge.${series.thumbnail.extension}" alt="${series.title}" >
                        <figcaption>${series.title}</figcaption>
                    </figure>
                </div>` 
    }

    let seriesList = function(seriesLink){

        
        $.ajax({
            type:"get",
            url:seriesLink+`?limit=5&offset=${offsetSeries}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
            success: function(data){
                console.log(data);
                for(ev of data.data.results){
                   let addseries = seriesDOM(ev);
                    $('#series-lists').append(addseries);
                }
            }
        });
    }

    // creating a stories list
        let storiesDOM = function(stories){
       
            return ` <div class=event>
                        <figure style="width:180px; height:350px">
                            <img src="${stories.thumbnail.path}/portrait_xlarge.${stories.thumbnail.extension}" alt="${tories.title}" >
                            <figcaption>${stories.title}</figcaption>
                        </figure>
                    </div>` 
        }
    
        let storiesList = function(storiesLink){

            
            $.ajax({
                type:"get",
                url:storiesLink+'?limit=5&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511',
                success: function(data){

                    for(ev of data.data.results){
                       let addstories = storiesDOM(ev);
                        $('#stories-lists').append(addstories);
                    }
                }
            });
        }

        // offset lists for fetching next and previous

        $('#heroInfo').click(function(e){
            
            if(e.target.classList.contains('offset-Inc')){

                $.ajax({
                    type:'get',
                    url:`https://gateway.marvel.com:443/v1/public/characters?name=${value}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
                    success: function(data){
                        if(e.target.parentElement.id =="comics"){
                            let comicData = data.data.results[0].comics
                            let comics = e.target.parentElement.querySelector('#comic-lists');
                            if(comicData.available > (offsetComic+5)){
                                while (comics.hasChildNodes()) {
                                    comics.removeChild(comics.firstChild);
                                }
                                offsetComic += 5;
                                comicList(comicData.collectionURI);

                            }else{
                                offsetComic = 0;
                            }
                        }else if(e.target.parentElement.id =="Events"){

                            let EventData = data.data.results[0].events
                            let Events = e.target.parentElement.querySelector('#event-lists');

                            if(EventData.available > (offsetEvent+5)){
                                while (Events.hasChildNodes()) {
                                    Events.removeChild(Events.firstChild);
                                }
                                offsetEvent += 5;
                                eventList(EventData.collectionURI);

                            }else{
                                offsetEvent = 0;
                            }
                        }else if(e.target.parentElement.id =="Series"){

                            let SeriesData = data.data.results[0].series
                            let Series = e.target.parentElement.querySelector('#series-lists');

                            if(SeriesData.available > (offsetEvent+5)){
                                while (Series.hasChildNodes()) {
                                    Series.removeChild(Series.firstChild);
                                }
                                offsetSeries += 5;
                                seriesList(SeriesData.collectionURI);

                            }else{
                                offsetSeries = 0;
                            }
                        }
                        
                    }
                })
               
            }
            if(e.target.classList.contains('offset-dec')){

                $.ajax({
                    type:'get',
                    url:`https://gateway.marvel.com:443/v1/public/characters?name=${value}&ts=1672118036&apikey=652daec402a35144b270c8c50e8398ca&hash=1439ea2f769fd2d1cc64b62ffb0f0511`,
                    success: function(data){
                        if(e.target.parentElement.id =="comics"){
                            let comicData = data.data.results[0].comics
                            let comics = e.target.parentElement.querySelector('#comic-lists');

                            if(0 <= (offsetComic-5)){
                                while (comics.hasChildNodes()) {
                                    comics.removeChild(comics.firstChild);
                                }
                                offsetComic -= 5;
                                comicList(comicData.collectionURI);

                            }else{
                                offsetComic = 0;
                            }
                        }else if(e.target.parentElement.id =="Events"){

                            let EventData = data.data.results[0].events
                            let Events = e.target.parentElement.querySelector('#event-lists');

                            if(0 <= (offsetEvent-5)){
                                while (Events.hasChildNodes()) {
                                    Events.removeChild(Events.firstChild);
                                }
                                offsetEvent -= 5;
                                eventList(EventData.collectionURI);

                            }else{
                                offsetEvent = 0;
                            }
                        }else if(e.target.parentElement.id =="Series"){

                            let SeriesData = data.data.results[0].series
                            let Series = e.target.parentElement.querySelector('#series-lists');

                            if(0 <= (offsetSeries-5)){
                                while (Series.hasChildNodes()) {
                                    Series.removeChild(Series.firstChild);
                                }
                                offsetSeries -= 5;
                                seriesList(SeriesData.collectionURI);

                            }else{
                                offsetSeries = 0;
                            }
                        }
                        
                    }
                })

            }
        });

      
    
    

    createHeroInfo();
}