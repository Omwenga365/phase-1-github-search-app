document.addEventListener('DOMContentLoaded', () => {
  
    //declarions
    const form = document.getElementById('github-form');
    const search = document.getElementById('search');
  
    //event listener for the form
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${search.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const hitArray = data['items'];
            renderHitArray(hitArray);
        });
    });
  });
  
  
  //function that renders the hits of the users 
  function renderHitArray(hitArray){
   
    const hits = document.getElementById('user-list');
    hitArray.map(hit => {
        
      //creating elements and putting data in them on the DOM
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        h2.textContent = hit['login'];
        const img = document.createElement('img');
        img.src = hit['avatar_url'];
        const htmlUrl = document.createElement('p');
        htmlUrl.textContent = hit['html_url'];
  
        //appending the created elements to li
        li.appendChild(h2);
        li.appendChild(img);
        li.appendChild(htmlUrl);
  
        //appending li to hits
        hits.appendChild(li);
  
        // Event listener when the search button is clicked
        h2.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${hit['login']}/repos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/vnd.github.v3+json'
                }
            })
            .then(response => response.json())   
            .then(repositories => renderRepositories(repositories))
        });
    });
  }
  
  //Function that renders repositories
  function renderRepositories(repositories){
    //declarations
    const repositoryList = document.getElementById('repos-list');
    repositories.map(repository => {
  
        //creating elements and adding data to them to appear on the DOM
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        h2.textContent = repository['name'];
        
        //appending children to their parents
        li.appendChild(h2);
        repositoryList.appendChild(li);
    });
  }