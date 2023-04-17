from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.core.paginator import Paginator
import json


from .models import *


def index(request):

    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def post(request):
    if request.method == "POST":

        # Get the content of post
        content = json.loads(request.body)

        # Get user
        user = User.objects.get(username=request.user)

        # Save post
        newPost = Posts(user=user, content=content["content"])
        newPost.save() 

        return HttpResponse(status=200)
    
    if request.method == "PUT":

        # Get id
        id = json.loads(request.body)

        # Fetch Post from database
        post = Posts.objects.get(id=id["id"])

         # Check if the post is currently liked by user
        liked = LikedBy.objects.filter(user=User.objects.get(username=str(request.user)), post=post)

        # If Post has been liked, dislike post or vise versa. Update or delete from database accordingly
        if len(liked) != 0:
            liked[0].delete()
            post.likes = post.likes - 1
        else:
            newLike = LikedBy(user=User.objects.get(username=str(request.user)), post=post)
            newLike.save()
            post.likes = post.likes + 1

        post.save()

        # Fetch new amount of likes from DB
        post = Posts.objects.get(id=id["id"])
        # Serialize id
        postLikes = {
            "likes": post.likes,
            "liked": len(liked)
        }

        return JsonResponse(postLikes, safe=False)


def updateLikes(request, id):

    # Fetch new amount of likes from DB
    post = Posts.objects.get(id=id)

    # Serialize id
    postLikes = {"likes": post.likes}

    return JsonResponse(postLikes, safe=False)

def allPosts(request, view):

    # Get all posts the user liked
    liked = LikedBy.objects.filter(user=User.objects.get(username=str(request.user)))

    # Sort posts after timestamp
    def sortList(p):
        return p["timestamp"]


    if view == 'allposts':
        
        # Get Posts
        allposts = reversed(Posts.objects.all())

        # Serialize data and append to list
        posts = []
        for post in allposts:
            posts.append(post.serialize())

        posts.sort(key=sortList, reverse=True)


        # Return JsonResponse with serialized data
        return JsonResponse([posts, [likedpost.serialize() for likedpost in liked]], safe=False)
    
    if view == 'following':

        # Get users the current user is following
        currentUser = User.objects.get(username=str(request.user))
        followingUsers = Followers.objects.filter(user=currentUser)
        
        if len(followingUsers) != 0:
            posts = []

            # Iterate through users the current user follows and append his posts to list
            for user in followingUsers:
                userPosts = Posts.objects.filter(user=user.following)
                for post in userPosts:
                    posts.append(post.serialize())

            posts.sort(key=sortList, reverse=True)

            return JsonResponse([posts, [likedpost.serialize() for likedpost in liked]], safe=False)


def follow(request):
    
    # Get current and selected user
    user = User.objects.get(username=str(request.user))
    selectedUser = json.loads(request.body)
    selectedUser = User.objects.get(username=selectedUser["user"])

    # Initialize Json response object
    following = {"following": False}

    # Check if follow status between current and selected user
    query = Followers.objects.filter(user=user, following=selectedUser)

    # If user is following already, then delete object thereby unfollowing the selected user, else vise versa
    if len(query) != 0:
        print(f'Delete {selectedUser.username}')
        query.delete()
        return JsonResponse(following, safe=False)
    elif len(query) == 0:
        print(f'Add {selectedUser.username}')
        new = Followers(user=user, following=selectedUser)
        new.save()
        following["following"] = True
        return JsonResponse(following, safe=False)

def edit(request):

    # Get ID and new content
    data = json.loads(request.body)

    # Fetch Post from db, change content and save 
    post = Posts.objects.get(id=int(data["id"]))
    post.content = data["content"]
    post.save()

    return HttpResponse(status=200) 


def getView(request, action, view, user):

    # Bool for user authentication
    not_logged_in = False

    if len(request.user.username) != 0:
        # Get all posts the user liked
        liked = LikedBy.objects.filter(user=User.objects.get(username=str(request.user)))
    else:
        not_logged_in = True

    # Sort posts after timestamp
    def sortList(p):
        return p["timestamp"]


    if action == 'pagecount':
        """Get Page count for requested view"""

        if view == 'allposts':
        
            posts = Posts.objects.all()
            paginator = Paginator(posts, 10)
            page_obj = paginator.get_page(1)
            amountOfPages = page_obj.paginator.num_pages

            return(JsonResponse(amountOfPages, safe=False))

        if view == 'following':

            # Get all posts from people the user is following
            currentUser = User.objects.get(username=str(request.user))
            followingUsers = Followers.objects.filter(user=currentUser)

            posts = []

            # Iterate over each user the current user follows and append his posts to post list
            for user in followingUsers:
                userPosts = Posts.objects.filter(user=user.following)
                for post in userPosts:
                    posts.append(post)
            
            paginator = Paginator(posts, 10)
            page_obj = paginator.get_page(1)
            amountOfPages = page_obj.paginator.num_pages

            return(JsonResponse(amountOfPages, safe=False))

        if view == 'profile':

            user = User.objects.get(username=user)

            # Get Posts
            posts = Posts.objects.filter(user=user)

            paginator = Paginator(posts, 10) # Show 10 posts per page

            page_obj = paginator.get_page(1)
            amountOfPages = page_obj.paginator.num_pages

            return(JsonResponse(amountOfPages, safe=False))
            

    if action == 'getposts':
        """Get Posts for requested view"""

        if view == 'allposts':

            # Fetch posts and create paginator
            posts = Posts.objects.all()
            posts = [post.serialize() for post in posts]
            posts.sort(key=sortList, reverse=True)
            paginator = Paginator(posts, 10) # Show 10 posts per page

            # Get request from page for specific page
            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)

            json_page_obj = []

            page_obj = paginator.get_page(page_number)
            for value in page_obj:
                json_page_obj.append(value)

            # Set liked to empty list if user is not authenticated
            if not_logged_in:
                liked = []

            return JsonResponse([json_page_obj, [likedpost.serialize() for likedpost in liked]], safe=False)

        if view == 'following':

            # Get users the current user is following
            currentUser = User.objects.get(username=str(request.user))
            followingUsers = Followers.objects.filter(user=currentUser)
            
            if len(followingUsers) != 0:
                posts = []

                # Iterate through users the current user follows and append his posts to list
                for user in followingUsers:
                    userPosts = Posts.objects.filter(user=user.following)
                    for post in userPosts:
                        posts.append(post.serialize())

                posts.sort(key=sortList, reverse=True)

                paginator = Paginator(posts, 10) # Show 10 posts per page

                # Get request from page for specific page
                page_number = request.GET.get('page')
                page_obj = paginator.get_page(page_number)

                json_page_obj = []

                for value in page_obj:
                    json_page_obj.append(value)

                return JsonResponse([json_page_obj, [likedpost.serialize() for likedpost in liked]], safe=False)

        if view == 'profile':

            # Get user from DB
            user = User.objects.get(username=user)

            # Get amount of people the user is following and amount of his followers 
            followStats = {
                "following": len(Followers.objects.filter(user=user)),
                "followers": len(Followers.objects.filter(following=user))
            }

            # Get Posts
            allposts = Posts.objects.filter(user=user)

            # Serialize data and append to list
            posts = []
            for post in allposts:
                posts.append(post.serialize())

            # Sort posts 
            posts.sort(key=sortList, reverse=True)

            # Find out if user follows the selected profile
            isFollowing = False
            if str(request.user) != user.username:

                currentUser = User.objects.get(username=str(request.user))
                check = Followers.objects.filter(user=currentUser, following=user)
                if len(check) != 0:
                    isFollowing = True
            
            paginator = Paginator(posts, 10) # Show 10 posts per page

            # Get request from page for specific page
            page_number = request.GET.get('page')
            page_obj = paginator.get_page(page_number)

            json_page_obj = []

            for value in page_obj:
                json_page_obj.append(value)


            return JsonResponse([followStats, json_page_obj, isFollowing, [likedpost.serialize() for likedpost in liked]], safe=False)


