from django.http import HttpResponseBadRequest, HttpRequest
from .serializers import UserSerializer, BookSerealizer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
import json


# view for registering users
@api_view(['POST',])
def signup(request: HttpRequest):

    if request.method == 'POST':
        serializer = UserSerializer

        json_data = json.loads(str(request.body, encoding='utf-8'))

        data = {
            'name': json_data['username'],
            'email': json_data['email'],
            'password': json_data['password']
        }

        user = serializer.create(UserSerializer(), validated_data=data)

        return Response(data="Usuario Criado")

    else:
        return HttpResponseBadRequest()


@api_view(['POST',])
def addbook(request: HttpRequest):

    if request.method == 'POST':

        serializer = BookSerealizer()

        json_data = json.loads(str(request.body, encoding='utf-8'))

        access_token_obj = AccessToken(request.headers.Authorization)
        user_id = access_token_obj['user_id']
        user = User.objects.get(id=user_id)

        data = {
            'title': json_data['title'],
            'opl_key': json_data['opl_key'],
            'status': json_data['status'],
            'cover_i': json_data['cover_i'],
            'author_name': json_data['author_name']
        }

        book = serializer.create(validated_data=data)

        user.books_list = user.books_list.append(book)
        user.save(update_fields=['books_list'])

        return Response(data="Book Criado e adicionado a shelf de um user")

    else:
        return HttpResponseBadRequest()


@api_view(['POST',])
def hasbook(request: HttpRequest):

    if request.method == 'POST':

        serializer = BookSerealizer()

        json_data = json.loads(str(request.body, encoding='utf-8'))

        access_token_obj = AccessToken(request.headers.Authorization)
        user_id = access_token_obj['user_id']
        user = User.objects.get(id=user_id)

        opl_key = json_data['opl_key']
        
        for book in user.books_list:
            if book.opl_key == opl_key:
                return Response(data={'hasBook':True})
            
        return Response(data={'hasBook':False})


    else:
        return HttpResponseBadRequest()
