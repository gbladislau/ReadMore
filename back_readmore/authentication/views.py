from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse 


from authentication.serializer import RegistrationSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token


# Create your views here.

#   Adicionar o retorno de cada função adequadamente com o path da página
def home(request):
    return render(request, "")

@api_view(['POST',])
def signup(request):
    
    if request.method == 'POST':
        serializer = RegistrationSerializer
        data ={}
        if serializer.save():
            conta = serializer.save()
            data['Response'] = "Usuário criado com sucesso!"
            data['Email'] = conta.email
            data['Username'] = conta.username
            data['Password'] = conta.password
            token = Token.objects.get(user=conta).key
            data['Token'] = token
        else:
            data = serializer.errors
        return Response(data)

@csrf_exempt
def signin(request):
    
    if request.method == 'POST':
        request_body_dict = (request.body).decode()
        
        username = request_body_dict['username'] # login
        senha = request_body_dict['password'] # senha
        
        user = authenticate(username=username, password=senha)
        
        if user is not None:
            login(request, user)
            return HttpResponse("SUCESSO")
            
        else:
            messages.error(request, "login ou senha incorretos")
            
            
    
    return HttpResponse("ERRO NO MÉTODO ou Login Invalido")

@csrf_exempt
def signout(request):
    logout(request)
    messages.success(request, "sessão finalizada")
    
    return redirect('home')