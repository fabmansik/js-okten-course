
let ID = new URL(document.URL).searchParams.get('id')
let info = document.getElementById("info");
let userInfo = document.getElementById('user-info')
let swipeDiv = document.getElementById('swipeDiv')


fetch(`https://jsonplaceholder.typicode.com/users/${ID}`)
    .then(response => response.json())
    // address company email id name phone username website
    .then(user => {

        console.log(Object.entries(user));

        fillObjectInElement(user, userInfo)

    })
    .then(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${ID}/posts`)
            .then(response => response.json())
            .then(userPosts => {
                let userPostsButton = document.createElement('button');
                userPostsButton.innerText='Posts'
                userPostsButton.classList.add('postsButton')

                info.appendChild(userPostsButton)

                userPostsButton.addEventListener('click',function (){
                    info.id="info-after"
                    swipeDiv.id="swipedDiv"
                    userPostsButton.disabled='true'

                    let posts = document.createElement('div');
                    posts.classList.add('postsDiv')
                    document.body.appendChild(posts)

                    for (const userPost of userPosts) {
                        let postDiv = document.createElement('div');
                        postDiv.classList.add('post')
                        postDiv.style='width:18%'
                        postDiv.innerHTML=`<p class="title">${userPost.title}</p>`

                        console.log(userPost.id)

                        let postDetailsButton = document.createElement('button');
                        postDetailsButton.classList.add('postDetails')
                        postDetailsButton.innerText='Post details'

                        let aLink = document.createElement('a')
                        aLink.setAttribute('href',`post-details.html?id=${userPost.id}`)

                        postDiv.appendChild(aLink)
                        aLink.appendChild(postDetailsButton)
                        posts.appendChild(postDiv)
                    }
                })
            })
    })
function fillObjectInElement(object, htmlElement){
    console.log(htmlElement)
    let objectEntries = Object.entries(object)
    for (let objectEntry of objectEntries) {
        if (typeof objectEntry[1] === 'object'){
            let pElement = document.createElement('p');
            pElement.innerHTML =`${objectEntry[0]}:`
            pElement.style='font-weight: bold'
            pElement.classList.add(`${objectEntry[0]}`)
            htmlElement.appendChild(pElement)
            fillObjectInElement(objectEntry[1],htmlElement)
        } else {
            let pElement = document.createElement('p');
            pElement.classList.add(`${objectEntry[0]}`)
            pElement.innerText = `${objectEntry[0]}: ${objectEntry[1]}`
            htmlElement.appendChild(pElement)
        }
    }
}
