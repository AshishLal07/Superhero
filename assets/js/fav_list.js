
// event listener for the delete functionality

$('#fav-container').click(function(e){
   
    if(e.target.classList.contains('trash')){
        let heroId = e.target.parentElement.parentElement.dataset.id;
        localStorage.removeItem(heroId);
        $('#fav-list').html('');
        CreateList();
    }
})


function listDOM(indexNo, heroName,id){
    return `<tr data-id="${id}">
                <th> ${indexNo<10? 0:''}${indexNo}</th>
                <th style="text-align: left;">${heroName}</th>
                <th ><i class="fa-solid fa-trash-can trash"></i></th>
            </tr>`
}

// create list and can be used as rendering the list

function CreateList(){

    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        let newVal = listDOM(i+1,localStorage.getItem(localStorage.key(i)),localStorage.key(i));
        $('#fav-list').append(newVal);

      }
    
}

CreateList();