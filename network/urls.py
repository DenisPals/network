
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post", views.post, name="post"),
    path("view/<str:view>", views.allPosts, name="allPosts"),
    path('follow', views.follow, name="follow"),
    path('updatelikes/<str:id>', views.updateLikes, name="updateLikes"),
    path('edit', views.edit, name="edit"),
    path('getview/<str:action>/<str:view>/<str:user>', views.getView, name="getview"),
]