from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Create your views here.

#   Adicionar o retorno de cada função adequadamente com o path da página
def home(request):
    return render(request, "")

def singup(request):
    
    if request.method == "POST":
        username = request.POST['username'] # login do usuário
        # nome = request.POST['nome'] # nome do usuário
        # sobrenome = request.POST['sobrenome'] # sobrenome do usuário
        email = request.POST['email'] # email do usuário
        senha = request.POST['password'] # senha do usuário
        senha2 = request.POST['senha2'] # confirmação da senha
        
        myuser = User.objects.create_user(username, email, senha)
        # myuser.firt_name = nome
        # myuser.last_name = sobrenome
        
        myuser.save()
        
        messages.success(request, "Conta criada.")
        return redirect('')
    
    return render(request, "")

def singin(request):
    
    if request.method == 'POST':
        username = request.POST['username'] # login
        senha = request.POST['password'] # senha
        
        user = authenticate(username=username, password=senha)
        
        if user is not None:
            login(request, user)
            return redirect(request, "")
            
        else:
            messages.error(request, "login ou senha incorretos")
            return redirect('home')
            
    
    return render(request, "")

def singout(request):
    logout(request)
    messages.success(request, "sessão finalizada")
    
    return redirect('home')