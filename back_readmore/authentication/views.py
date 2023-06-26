from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse 

# Create your views here.

#   Adicionar o retorno de cada função adequadamente com o path da página
def home(request):
    return render(request, "")

@csrf_exempt
def signup(request):
    
    if request.method == "POST":
        try:
            request_body_dict = (request.body).decode()
        
            username = request_body_dict['username'] # login do usuário
            email = request_body_dict['email'] # email do usuário
            senha = request_body_dict['password'] # senha do usuário
            senha2 = request_body_dict['confirmPassword'] # confirmação da senha
            
            
            if senha == senha2:
                myuser = User.objects.create_user(username, email, senha)
                myuser.save()
                messages.success(request, "Conta criada.")
                return HttpResponse("Usuário criado com sucesso!")
                
        except:
            messages.error(request,"ERRO NOS CAMPOS DO REQUEST!")
    
    messages.error(request, "metodo não aceito.")
    return HttpResponse("Erro na criação, método não aceito ou campos faltando")

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