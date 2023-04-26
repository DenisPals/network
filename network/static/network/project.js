document.addEventListener('DOMContentLoaded', () => {

    let authenticated = false
    if (document.querySelector('#profileLink') != null) {
        authenticated = true
    }

    // Load all Posts
    loadPosts('allposts')

    // Add EventListeners
    if (authenticated) {
        document.querySelector('#postForm').onsubmit = newPost
        document.querySelector('#followingLink').addEventListener('click', () => {loadPosts('following')})
        document.querySelector('#profileLink').addEventListener('click', () => {
            loadPosts('profile', document.querySelector('#profileLink').firstChild.innerHTML)})
    }
    document.querySelector('#index').addEventListener('click', () => {loadPosts('allposts')})
})


function loadPosts(view, profile) {

    if (view === 'allposts') {
        fetch('/getview/pagecount/allposts/none')
        .then(response => response.json())
        .then(lastPage => {

            // Delete previous pagination
            if (document.querySelector('#next') != null) {
                document.querySelector('#next').remove()    
            }
            if (document.querySelector('#previous') != null) {
                document.querySelector('#previous').remove()    
            }

            // Load first page by default and get amount of pages
            pageView(1, 'allposts')
            
            // Implement Pagination
            let pagination = document.querySelector('#pagination')
            let preLi = document.createElement('li')
            let preBu = document.createElement('button')

            preLi.classList.add('page-item')
            preBu.classList.add('page-link')
            preBu.innerHTML = 'Previous'
            preBu.id = 'previous'

            preLi.append(preBu)
            pagination.append(preLi)


            let nexLi = document.createElement('li')
            let nexBu = document.createElement('button')

            nexLi.classList.add('page-item')
            nexBu.classList.add('page-link')
            nexBu.innerHTML = 'Next'
            nexBu.id = 'next'

            nexLi.append(nexBu)
            pagination.append(nexLi)

            // Hide previous by default, as page one is loaded at start
            document.querySelector('#previous').style.display = 'none'

            // Hide next if only one page exists
            if (lastPage === 1) {
                document.querySelector('#next').style.display = 'none'
            }

            // Initialize page
            let currentPage = 1

            // Listen to clicks on next button
            document.querySelector('#next').addEventListener('click', () => {
                currentPage++
                pageView(currentPage, 'allposts')
                if (currentPage > 1) {
                    document.querySelector('#previous').style.display = 'block'
                } 
                if (currentPage === lastPage) {
                    document.querySelector('#next').style.display = 'none'
                }
            })

            // Listen to clicks on previous button
            document.querySelector('#previous').addEventListener('click', () => {
                currentPage--
                pageView(currentPage, 'allposts')
                if (currentPage < lastPage) {
                    document.querySelector('#next').style.display = 'block'
                }
                if (currentPage === 1) {
                    document.querySelector('#previous').style.display = 'none'
                }
            })
        })
    }
    if (view === 'following') {
        fetch('/getview/pagecount/following/none')
        .then(response => response.json())
        .then(lastPage => { console.log(`Last page: ${lastPage}`)

            // Load first page by default and get amount of pages
            pageView(1, 'following')

            // Delete previous pagination
            if (document.querySelector('#next') != null) {
                document.querySelector('#next').remove()    
            }
            if (document.querySelector('#previous') != null) {
                document.querySelector('#previous').remove()    
            }
            
            // Implement Pagination
            let pagination = document.querySelector('#pagination')
            let preLi = document.createElement('li')
            let preBu = document.createElement('button')

            preLi.classList.add('page-item')
            preBu.classList.add('page-link')
            preBu.innerHTML = 'Previous'
            preBu.id = 'previous'

            preLi.append(preBu)
            pagination.append(preLi)


            let nexLi = document.createElement('li')
            let nexBu = document.createElement('button')

            nexLi.classList.add('page-item')
            nexBu.classList.add('page-link')
            nexBu.innerHTML = 'Next'
            nexBu.id = 'next'

            nexLi.append(nexBu)
            pagination.append(nexLi)

            // Hide previous by default, as page one is loaded at start
            document.querySelector('#previous').style.display = 'none'

            // Hide next if only one page exists
            if (lastPage === 1) {
                document.querySelector('#next').style.display = 'none'
            }

            // Initialize page
            let currentPage = 1

            // Listen to clicks on next button
            document.querySelector('#next').addEventListener('click', () => {
                currentPage++
                pageView(currentPage, 'following')
                if (currentPage > 1) {
                    document.querySelector('#previous').style.display = 'block'
                } 
                if (currentPage === lastPage) {
                    document.querySelector('#next').style.display = 'none'
                }
            })

            // Listen to clicks on previous button
            document.querySelector('#previous').addEventListener('click', () => {
                currentPage--
                pageView(currentPage, 'following')
                if (currentPage < lastPage) {
                    document.querySelector('#next').style.display = 'block'
                }
                if (currentPage === 1) {
                    document.querySelector('#previous').style.display = 'none'
                }
            })
        })
    }

    if (view == 'profile') {

        fetch(`/getview/pagecount/profile/${profile}`)
        .then(response => response.json())
        .then(lastPage => {

            // Load first page by default and get amount of pages
            pageView(1, 'profile', profile)

            // Delete previous pagination
            if (document.querySelector('#next') != null) {
                document.querySelector('#next').remove()    
            }
            if (document.querySelector('#previous') != null) {
                document.querySelector('#previous').remove()    
            }

            // Implement Pagination
            let pagination = document.querySelector('#pagination')
            let preLi = document.createElement('li')
            let preBu = document.createElement('button')

            preLi.classList.add('page-item')
            preBu.classList.add('page-link')
            preBu.innerHTML = 'Previous'
            preBu.id = 'previous'

            preLi.append(preBu)
            pagination.append(preLi)


            let nexLi = document.createElement('li')
            let nexBu = document.createElement('button')

            nexLi.classList.add('page-item')
            nexBu.classList.add('page-link')
            nexBu.innerHTML = 'Next'
            nexBu.id = 'next'

            nexLi.append(nexBu)
            pagination.append(nexLi)

            // Hide previous by default, as page one is loaded at start
            document.querySelector('#previous').style.display = 'none'

            // Hide next if only one page exists
            if (lastPage === 1) {
                document.querySelector('#next').style.display = 'none'
            }

            // Initialize page
            let currentPage = 1

            // Listen to clicks on next button
            document.querySelector('#next').addEventListener('click', () => {
                currentPage++
                pageView(currentPage, 'profile', profile)
                if (currentPage > 1) {
                    document.querySelector('#previous').style.display = 'block'
                } 
                if (currentPage === lastPage) {
                    document.querySelector('#next').style.display = 'none'
                }
            })

            // Listen to clicks on previous button
            document.querySelector('#previous').addEventListener('click', () => {
                currentPage--
                pageView(currentPage, 'profile', profile)
                if (currentPage < lastPage) {
                    document.querySelector('#next').style.display = 'block'
                }
                if (currentPage === 1) {
                    document.querySelector('#previous').style.display = 'none'
                }
            })
        })
    }
}

function newPost() {
    // Get Posts content
    const content = document.querySelector('#postContent').value

    // Send post request to API
    fetch('/post', {
        method: 'POST',
        body: JSON.stringify({
            content: content
        })
    })
    // Reload posts
    loadPosts('allPosts')
}

function pageView(page, view, profile) {

    // Check for authentication
    let authenticated = false
    if (document.querySelector('#profileLink') != null) {
        authenticated = true
    }
    // Hide Profile properties by default
    document.querySelector('#profile').style.display = 'none';

    // Show All Post properties by default
    if (authenticated) {
        document.querySelector('#postDiv').style.display = 'block';
    }
    document.querySelector('#allPosts').style.display = 'block';
    document.querySelector('#header').innerHTML = 'All Posts'

    // Delete all Posts from other views
    document.querySelector('#allPosts').innerHTML = ''

    // Define like button SVG
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-hand-thumbs-up-fill mb-1" viewBox="0 0 16 16">
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                </svg>`
    
    let svgD = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                </svg>`
    
    if (view === 'allposts') {

        fetch(`/getview/getposts/${view}/none?page=${page}`)
        .then(response => response.json())
        .then(posts => {

            for (let post = 0; post < posts[0].length; post++) {
            
                // Create Div
                let body = document.querySelector('#allPosts')
                let newDiv = document.createElement('div')
                
                if (authenticated) {
                    // Create Post
                    if (document.querySelector('#profileLink').firstChild.innerHTML === `${posts[0][post].user}`) {
                        newDiv.innerHTML = `<div class="alert alert-primary shadow">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                        <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><strong class="edit" data-id="${posts[0][post].id}" id="ed${posts[0][post].id}">Edit</strong><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">${svg}</button></div>`
                        body.append(newDiv)
                    } else {
                        newDiv.innerHTML = `<div class="alert alert-primary shadow">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                        <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">${svg}</button></div>`
                        body.append(newDiv)
                    }
                } else {
                    // Create Post
                    newDiv.innerHTML = `<div class="alert alert-primary shadow">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                    <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><button class="btn btn-primary btn-sm likeBtn" disabled>${svg}</button></div>`
                    body.append(newDiv)
                }

                if (authenticated) {
                // Set like button to right value
                    for (let x = 0; x < posts[1].length; x++) {
    
                        if (posts[1][x].postId === posts[0][post].id) {
                            newDiv.firstChild.lastChild.innerHTML = svgD
                        }
                    }
                }
            }
            // Add EventListeners to like btns for update and to user names to get profile
            document.querySelectorAll('.likeBtn').forEach(button => button.addEventListener('click', () => {
                
                // Send Put request to API to add new like
                fetch('/post', {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: button.id
                    })
                }) // Fetch new value from DB
                .then(response => response.json())
                .then(newValue => {
                    document.querySelector(`#lk${button.id}`).innerHTML = newValue.likes
                    if (newValue.liked != 0) {
                        button.innerHTML = svg
                    } else {
                        button.innerHTML = svgD
                    }
                })
            }))
            // Add EventListener to usernames to take them to profile on click
            if (authenticated) {
                document.querySelectorAll('.user').forEach(name => name.addEventListener('click', () => {
                    loadPosts('profile', name.innerHTML)
                }))
            }
            // Add EventListenert to "Edit" to create textarea
            document.querySelectorAll('.edit').forEach(edit => edit.addEventListener('click', () => {

                // Get content ID, old content and create textarea, then change submitted post in DB
                let pureId = edit.dataset.id
                let test = 'ed109'
                oldContent = document.querySelector(`#co${pureId}`).innerHTML
                
                let txtarea = `<textarea id="editContent" autofocus="true" class="form-control">${oldContent}</textarea>
                <button id="submitbtn" class="btn btn-primary col col-12 btn-sm">Post</button>`
                document.querySelector(`#co${pureId}`).innerHTML = txtarea
                document.querySelector('#submitbtn').addEventListener('click', () => {
                    fetch('/edit', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: pureId,
                            content: document.querySelector('#editContent').value
                        })
                    })
                    document.querySelector(`#co${pureId}`).innerHTML = document.querySelector('#editContent').value
                })
            }
            ))

        })
    }

    if (view === 'following') {

        document.querySelector('#postDiv').style.display = 'none';
        document.querySelector('#header').innerHTML = 'Following'

        fetch(`/getview/getposts/${view}/none?page=${page}`)
        .then(response => response.json())
        .then(posts => {

            if (posts[0].length < 1) {
                document.querySelector('#allPosts').innerHTML = `<h3 class="m-5">The users you are following haven't posted yet..</h3>`
            }
            document.querySelector('#allPosts').innerHTML = `${posts[0].length}`

            for (let post = 0; post < posts[0].length; post++) {
            
                // Create Div
                let body = document.querySelector('#allPosts')
                let newDiv = document.createElement('div')

                // Create Post
                if (document.querySelector('#profileLink').firstChild.innerHTML === `${posts[0][post].user}`) {
                    newDiv.innerHTML = `<div class="alert alert-primary shadow">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                    <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><strong class="edit" data-id="${posts[0][post].id} id="ed${posts[0][post].id}">Edit</strong><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">${svg}</button></div>`
                    body.append(newDiv)
                } else {
                    newDiv.innerHTML = `<div class="alert alert-primary shadow">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                    <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">${svg}</button></div>`
                    body.append(newDiv)
                }

                // Set like button to right value
                for (let x = 0; x < posts[1].length; x++) {
  
                    if (posts[1][x].postId === posts[0][post].id) {
                        newDiv.firstChild.lastChild.innerHTML = svgD
                    }
                }
            }
            // Add EventListeners to like btns for update and to user names to get profile
            document.querySelectorAll('.likeBtn').forEach(button => button.addEventListener('click', () => {
                
                // Send Put request to API to add new like
                fetch('/post', {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: button.id
                    })
                }) // Fetch new value from DB
                .then(response => response.json())
                .then(newValue => {
                    document.querySelector(`#lk${button.id}`).innerHTML = newValue.likes
                    if (newValue.liked != 0) {
                        button.innerHTML = svg
                    } else {
                        button.innerHTML = svgD
                    }
                })
            }))
            // Add EventListener to usernames to take them to profile on click
            document.querySelectorAll('.user').forEach(name => name.addEventListener('click', () => {
                loadPosts('profile', name.innerHTML)
            }))
            // Add EventListenert to "Edit" to create textarea
            document.querySelectorAll('.edit').forEach(edit => edit.addEventListener('click', () => {

                // Get content ID, old content and create textarea, then change submitted post in DB
                let pureId = edit.dataset.id
                console.log(pureId)
                oldContent = document.querySelector(`#co${pureId}`).innerHTML
                
                let txtarea = `<textarea id="editContent" autofocus="true" class="form-control">${oldContent}</textarea>
                <button id="submitbtn" class="btn btn-danger btn-sm">Post</button>`
                document.querySelector(`#co${pureId}`).innerHTML = txtarea
                document.querySelector('#submitbtn').addEventListener('click', () => {
                    fetch('/edit', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: pureId,
                            content: document.querySelector('#editContent').value
                        })
                    })
                    document.querySelector(`#co${pureId}`).innerHTML = document.querySelector('#editContent').value
                })
            }
            ))

        })
    }

    if (view === 'profile') {

        fetch(`/getview/getposts/profile/${profile}?page=${page}`)
        .then(response => response.json())
        .then(profile => {

            // Hide All Posts Page elements and display Profile elements
            document.querySelector('#postDiv').style.display = 'none';
            document.querySelector('#allPosts').style.display = 'none';
            document.querySelector('#follow').style.display = 'none'
            document.querySelector('#profile').style.display = 'block';
            document.querySelector('#header').innerHTML = 'Profile'
    
            // Render the name and amount of people the user is following and followed by
            document.querySelector('#username').innerHTML = profile[1][0].user
            document.querySelector('#amountFollowing').innerHTML = `Followers: ${profile[0].followers}`
            document.querySelector('#amountFollowers').innerHTML = `Following: ${profile[0].following}`
    
            // Delete old Posts list
            document.querySelector('#allPosts').innerHTML = ''
    
            // Display Posts of user in chronological order
            for (let y = 0; y < profile[1].length; y++) {
                let body = document.querySelector('#allPosts')
                let newDiv = document.createElement('div')
    
                // Create Posts
                if (document.querySelector('#profileLink').innerHTML != profile[1][y].user) {
                    newDiv.innerHTML = `<div class="alert alert-primary shadow">${profile[1][y].timestamp.slice(0, 10)} ${profile[1][y].timestamp.slice(11, -8)}<br>
                    <strong>${profile[1][y].user}</strong> <span id="lk${profile[1][y].id}">${profile[1][y].likes}</span><br><p class="mt-3" id="co${profile[1][y].id}">${profile[1][y].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${profile[1][y].id}">${svg}</button></div>`
                    body.append(newDiv)
                } else {
                    newDiv.innerHTML = `<div class="alert alert-primary shadow">${profile[1][y].timestamp.slice(0, 10)} ${profile[1][y].timestamp.slice(11, -8)}<br>
                    <strong>${profile[1][y].user}</strong> <span id="lk${profile[1][y].id}">${profile[1][y].likes}</span><br><p class="mt-3">${profile[1][y].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${profile[1][y].id}">${svg}</button></div>`
                    body.append(newDiv)
                }
    
                // Set like button to right value
                for (let x = 0; x < profile[3].length; x++) {
    
                    if (profile[3][x].postId === profile[1][y].id) {
                        newDiv.firstChild.lastChild.innerHTML = svgD
                    }
                }
            }
    
            // Add EventListeners to like btns for update and to user names to get profile
            document.querySelectorAll('.likeBtn').forEach(button => button.addEventListener('click', () => {
    
                // Send Put request to API to add new like
                fetch('/post', {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: button.id
                    })
                }) // Fetch new value from DB
                .then(response => response.json())
                .then(newValue => {
                    document.querySelector(`#lk${button.id}`).innerHTML = newValue.likes
                    if (newValue.liked != 0) {
                        button.innerHTML = svg
                    } else {
                        button.innerHTML = svgD
                    }
                })
            }))
            // Add EventListenert to "Edit" to create textarea
            document.querySelectorAll('.edit').forEach(edit => edit.addEventListener('click', () => {
    
                // Get content ID, old content and create textarea, then change submitted post in DB
                let pureId = edit.dataset.id
                oldContent = document.querySelector(`#co${pureId}`).innerHTML
                
                let txtarea = `<textarea id="editContent" autofocus="true" class="form-control">${oldContent}</textarea>
                <button id="submitbtn" class="btn btn-danger btn-sm">Post</button>`
                document.querySelector(`#co${pureId}`).innerHTML = txtarea
                document.querySelector('#submitbtn').addEventListener('click', () => {
                    fetch('/edit', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: pureId,
                            content: document.querySelector('#editContent').value
                        })
                    })
                    document.querySelector(`#co${pureId}`).innerHTML = document.querySelector('#editContent').value
                })
            }
            ))
    
            // Display all Posts
            document.querySelector('#allPosts').style.display = 'block';
    
            // If profile page does not belong to current user display follow/unfollow buttons
            if (document.querySelector('#profileLink').firstChild.innerHTML != profile[1][0].user) {
    
                // Initialize button value based on status at page loading
                if (profile[2] != false) {
                    document.querySelector('#follow').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-person-fill-dash" viewBox="0 0 16 16">
                                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                                                    </svg>`
                } else {
                    document.querySelector('#follow').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                                                    </svg>`
                }
    
                let username = profile[1][0].user
                document.querySelector('#follow').style.display = 'block'
                
                document.querySelector('#follow').onclick = () => {
                    fetch('/follow', {
                        method: 'PUT',
                        body: JSON.stringify({
                            user: username
                        })
                    })
                    .then(response => response.json())
                    .then(isFollowing => {
                        if (!isFollowing.following) {
                            document.querySelector('#follow').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                        </svg>`
                        } else {
                            document.querySelector('#follow').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-person-fill-dash" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                        </svg>`
                        }
                    })
                }
            }
        }
    )}
}
