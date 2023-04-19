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
        document.querySelector('#postForm').style.display = 'block';
    }
    document.querySelector('#allPosts').style.display = 'block';
    document.querySelector('#header').innerHTML = 'All Posts'

    // Delete all Posts from other views
    document.querySelector('#allPosts').innerHTML = ''
    
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
                        newDiv.innerHTML = `<div class="alert alert-info">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                        <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><strong class="edit" id="ed${posts[0][post].id}">Edit</strong><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">Like</button></div>`
                        body.append(newDiv)
                    } else {
                        newDiv.innerHTML = `<div class="alert alert-info">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                        <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">Like</button></div>`
                        body.append(newDiv)
                    }
                } else {
                    // Create Post
                    newDiv.innerHTML = `<div class="alert alert-info">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                    <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><button class="btn btn-primary btn-sm likeBtn" disabled>Like</button></div>`
                    body.append(newDiv)
                }

                if (authenticated) {
                // Set like button to right value
                    for (let x = 0; x < posts[1].length; x++) {
    
                        if (posts[1][x].postId === posts[0][post].id) {
                            newDiv.firstChild.lastChild.innerHTML = 'Dislike'
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
                        button.innerHTML = 'Like'
                    } else {
                        button.innerHTML = 'Dislike'
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
                let pureId = edit.id.slice(-3)
                let test = 'ed109'
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

    if (view === 'following') {

        document.querySelector('#postForm').style.display = 'none';
        document.querySelector('#header').innerHTML = 'Following'

        fetch(`/getview/getposts/${view}/none?page=${page}`)
        .then(response => response.json())
        .then(posts => {

            for (let post = 0; post < posts[0].length; post++) {
            
                // Create Div
                let body = document.querySelector('#allPosts')
                let newDiv = document.createElement('div')

                // Create Post
                if (document.querySelector('#profileLink').firstChild.innerHTML === `${posts[0][post].user}`) {
                    newDiv.innerHTML = `<div class="alert alert-info">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                    <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><strong class="edit" id="ed${posts[0][post].id}">Edit</strong><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">Like</button></div>`
                    body.append(newDiv)
                } else {
                    newDiv.innerHTML = `<div class="alert alert-info">${posts[0][post].timestamp.slice(0, 10)} ${posts[0][post].timestamp.slice(11, -8)}<br>
                    <strong class="user">${posts[0][post].user}</strong> <span id="lk${posts[0][post].id}">${posts[0][post].likes}</span><br><p class="mt-3" id="co${posts[0][post].id}">${posts[0][post].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${posts[0][post].id}">Like</button></div>`
                    body.append(newDiv)
                }

                // Set like button to right value
                for (let x = 0; x < posts[1].length; x++) {
  
                    if (posts[1][x].postId === posts[0][post].id) {
                        newDiv.firstChild.lastChild.innerHTML = 'Dislike'
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
                        button.innerHTML = 'Like'
                    } else {
                        button.innerHTML = 'Dislike'
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
                let pureId = edit.id.slice(-2)
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
            document.querySelector('#postForm').style.display = 'none';
            document.querySelector('#allPosts').style.display = 'none';
            document.querySelector('#follow').style.display = 'none'
            document.querySelector('#profile').style.display = 'block';
            document.querySelector('#header').innerHTML = 'Profile'
    
            // Render the name and amount of people the user is following and followed by
            document.querySelector('#username').innerHTML = profile[1][0].user
            document.querySelector('#amountFollowing').innerHTML = `Amount of followers: ${profile[0].followers}`
            document.querySelector('#amountFollowers').innerHTML = `Amount of people this user is following: ${profile[0].following}`
    
            // Delete old Posts list
            document.querySelector('#allPosts').innerHTML = ''
    
            // Display Posts of user in chronological order
            for (let y = 0; y < profile[1].length; y++) {
                let body = document.querySelector('#allPosts')
                let newDiv = document.createElement('div')
    
                // Create Posts
                if (document.querySelector('#profileLink').innerHTML != profile[1][y].user) {
                    newDiv.innerHTML = `<div class="alert alert-info">${profile[1][y].timestamp.slice(0, 10)} ${profile[1][y].timestamp.slice(11, -8)}<br>
                    <strong>${profile[1][y].user}</strong> <span id="lk${profile[1][y].id}">${profile[1][y].likes}</span><br><p class="mt-3" id="co${profile[1][y].id}">${profile[1][y].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${profile[1][y].id}">Like</button></div>`
                    body.append(newDiv)
                } else {
                    newDiv.innerHTML = `<div class="alert alert-info">${profile[1][y].timestamp.slice(0, 10)} ${profile[1][y].timestamp.slice(11, -8)}<br>
                    <strong>${profile[1][y].user}</strong> <span id="lk${profile[1][y].id}">${profile[1][y].likes}</span><br><p class="mt-3">${profile[1][y].content}</p><br><button class="btn btn-primary btn-sm likeBtn" id="${profile[1][y].id}">Like</button></div>`
                    body.append(newDiv)
                }
    
                // Set like button to right value
                for (let x = 0; x < profile[3].length; x++) {
    
                    if (profile[3][x].postId === profile[1][y].id) {
                        newDiv.firstChild.lastChild.innerHTML = 'Dislike'
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
                        button.innerHTML = 'Like'
                    } else {
                        button.innerHTML = 'Dislike'
                    }
                })
            }))
            // Add EventListenert to "Edit" to create textarea
            document.querySelectorAll('.edit').forEach(edit => edit.addEventListener('click', () => {
    
                // Get content ID, old content and create textarea, then change submitted post in DB
                let pureId = edit.id.slice(-2)
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
                    document.querySelector('#follow').innerHTML = 'Unfollow'
                } else {
                    document.querySelector('#follow').innerHTML = 'Follow'
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
                            document.querySelector('#follow').innerHTML = 'Follow'
                        } else {
                            document.querySelector('#follow').innerHTML = 'Unfollow'
                        }
                    })
                }
            }
        }
    )}
}