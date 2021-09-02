const searchResult = document.getElementById('search-result');

// Book Counter function 
const displayBookCounter = (text, display, color = 'rgb(16, 95, 199)') =>{
    const bookCount = document.getElementById('books-count');
    bookCount.innerText = text;
    bookCount.style.display = display;
    bookCount.style.color = color; 
}



// Search Function 
const searchBook = async() => {
    const searchField = document.getElementById('search-field');
   

    // all clear 
    const searchText = searchField.value;
    searchField.value = '';
    searchResult.textContent = '';
    
    displayBookCounter('', 'none');



    if(searchText === ''){
        displayBookCounter(`Please Enter Somthing!!!`, 'block', 'red');
    }
    else{

        // Api fetch
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        const res = await fetch(url);
        const jsonData = await res.json();
        displaySearchResult(jsonData);
    }
}


// search result function 

const displaySearchResult = (books) => {

    // console.log(books);
    searchResult.textContent = '';
    if(books.numFound === 0){
        displayBookCounter(`No results found !!!`, 'block', 'red');
    }
    else{ 

        displayBookCounter(`${books.numFound} results found !!!`, 'block');
        

        // Main result 
        books.docs.forEach((book) => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card p-1">
              <div class="card-body">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top mb-4" alt="...">
                
                <div class="card-body">
                <h5 class="card-title"><span class="fw-bold">Book's Name/Type: </span>${book.title}</h5>
                   <h5 class="card-title mb-3">
                          <span class="fw-bold">Author's Name: </span>
                                           ${book.author_name?.toString() ?? "Unknown Author"}
                   </h5>
                   <h5 class="card-title mb-3"><span class="fw-bold">Publisher: </span>${book.publisher?.[0].toString() ?? "Unknown Publisher"}</h5>
                   <h5 class="card-title"><span class="fw-bold">First Publish Year: </span>${book.first_publish_year ?? "Unknown Publish Year"}</h5>
                </div>
              </div>
            </div>
            `;
            searchResult.appendChild(div);
          });
    }
    
}








/*
const toggleSpinnerON =  (displayStyle) =>{
    document.getElementById('spinner2').style.visibility = displayStyle;
    document.getElementById('spinner3').style.visibility = displayStyle;
    document.getElementById('spinner1').style.visibility = displayStyle;
}
*/