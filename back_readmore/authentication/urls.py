from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', views.home, name="home"),
    path('singup', views.signup, name="singup"),
    path('singin', views.singin, name="singin"),
    path('singout', views.singout, name="singout")
]
