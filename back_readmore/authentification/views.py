from django.http import HttpResponseBadRequest, HttpRequest
from .serializers import UserSerializer, BookSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from .models import UserData, Book
import json
from django.contrib.auth.hashers import make_password



@api_view(['POST',])
def signup(request: HttpRequest):
    """View para criar novo usuário

    Args:
        request (HttpRequest): Request HTTP do frontend

    Returns:
        Respose: Reposta HTTP
    """
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
    """Faz a adição de um novo livro ao banco de dados

    Args:
        request (HttpRequest): Requisição HTTP

    Returns:
        Response: Resposta HTTP
    """

    if request.method == 'POST':
        serializer = BookSerializer
        json_data = json.loads(request.body)
        access_token = AccessToken(request.META.get('HTTP_AUTHORIZATION', '').split('Bearer ')[1])
        user_id = access_token['user_id']
        user = UserData.objects.get(id=user_id)
        
        data = {
            'title': json_data['title'],
            'opl_key': json_data['opl_key'],
            'author_name': json_data['author_name'],
            'cover_i': json_data['cover_i'],
            'status': json_data['status'],
        }

        
        book = serializer.create(BookSerializer(),validated_data=data,user=user)
            
        return Response(data="Book Criado e adicionado à shelf de um usuário")
       

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST',])
def hasbook(request: HttpRequest):
    """View para perguntar se aquele livro está ou não já adicionado

    Args:
        request (HttpRequest): Request contendo opl key do livro

    Returns:
        Response: Resposta HTTP
    """

    if request.method == 'POST':
        json_data = json.loads(request.body)

        access_token = AccessToken(request.META.get('HTTP_AUTHORIZATION', '').split('Bearer ')[1])
        user_id = access_token['user_id']
        user = UserData.objects.get(id=user_id)

        opl_key = json_data['opl_key']
        
        has_book = user.books_list.filter(opl_key=opl_key).exists()
        pages_read = 0
        if has_book:
            book = user.books_list.filter(opl_key=opl_key).first()
            pages_read = book.pages_read
        return Response(data={'hasBook': has_book,'pages_read':pages_read})

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_pages_read(request):
    """View para dar update nas paginas lidas de um Livro

    Args:
        request (HttpRequest): Requisição HTTP

    Returns:
        Resposta: HTTP resposta
    """
    
    json_data = json.loads(request.body)
    book_id = json_data['opl_key']
    pages_read = json_data['pages_read']

    try:
        book = Book.objects.get(opl_key=book_id)
        book.pages_read = pages_read
        book.save()
        serializer = BookSerializer(book)
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=400)
    
     
@api_view(['POST'])
def delete_book(request:HttpRequest):
    """View para deletar um livro

    Args:
        request (HttpRequest): requisição http

    Returns:
        Reponse: Resposta HTTP
    """
    book_id = request.data.get('opl_key')

    try:
        book = Book.objects.get(opl_key=book_id)
        book.delete()
        return Response(data="Livro removido com sucesso")
    except Book.DoesNotExist:
        return Response({'error': 'Livro não encontrado'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reset_password(request):
    """View para fazer reset na password de um user

    Args:
        request (HTTPResquest): Request http

    Returns:
         Reponse: Resposta HTTP
    """
    email = request.data.get('email')
    username = request.data.get('username')
    new_password = request.data.get('new_password')

    try:
        user = UserData.objects.get(email=email, name=username)
        user.password = make_password(new_password)
        user.save()
        return Response(data='Senha redefinida com sucesso')
    except UserData.DoesNotExist:
        return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_user_books(request):
    
    try:
        access_token = AccessToken(request.META.get('HTTP_AUTHORIZATION', '').split('Bearer ')[1])
        user_id = access_token['user_id']
        user = UserData.objects.get(id=user_id)
        user = request.user
        books = Book.objects.filter(user=user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    except: return Response(status=status.HTTP_400_BAD_REQUEST)