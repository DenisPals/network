from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Posts(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Posts")
    content = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "content": self.content,
            "timestamp": self.timestamp,
            "likes": self.likes
        }

class Followers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Followers")
    following = models.ForeignKey(User, on_delete=models.CASCADE)  

    def __str__(self):
        return f"{self.user} is following {self.following}"

class LikedBy(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def serialize(self):
        return {
            "postId": self.post.id,
            "user": self.user.username
        }