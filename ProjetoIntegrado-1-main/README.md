# 📚ReadMore

![1689337905118](image/README/1689337905118.png)

## 📝Descrição

O aplicativo ReadMore incentiva a leitura e a criação do hábito de leitura por meio da organização de seus livros. Com recursos de ntrole de progresso, o aplicativo funciona como um marcador de páginas digital. Além disso, você pode adicionar livros já lidos, em leitura e livros que deseja ler à sua estante digital. Utilize a função de marcador de página para ter controle do progresso de cada livro.

## 🔨 Ferramentas Utilizadas

Essas são algumas das linguagens, ferramentas, frameworks e bibliotecas que utilizamos no desenvolvimento dessa aplicação:

* Django (python)
* Django Rest Framework with JWT authentication
* React Native
* Expo
* Pipenv
* Node js
* Docker (python e node images)
* Figma ([protótipo](https://www.figma.com/file/JGgpaNX9gTQCJINLfPrxoR/ReadMore?type=design&node-id=352%3A138&mode=design&t=3PswqImuN1bMPGQe-1))
* Open Library [Web API](https://openlibrary.org/developers/api)

## 📱 Uso Geral

Como builds para IOS não são nossa prioridade, é possivel ver nas [Releases ](https://github.com/gbladislau/ProjetoIntegrado-1/releases)o APK do ReadMore para Android, com ele é possível utilizar o aplicativo com o banco de dados hospedado em: [https://readmore.onrender.com](https://readmore.onrender.com)

Na Tela inicial vemos duas opções, caso já tenha cadastro pode seguir para tela de Login.

Caso faça um cadastro é necessário um nome de usuario, email e senha.

### ⚠ DISCLAIMER

* Não use senhas que já utiliza normalmente, pois nosso aplicativo não possui verificação de email e SSL para segurança de comunicação.
* Não perca nem compartilhe seu nome de usuário e email, ele é usado para criar uma nova senha.

Após o cadastro/login a tela principal sera mostrada com seus livros salvos caso tenha.

Para adicionar novos livros navegue (clicando nas 3 barras horizontais na lateral esquerda) e clique em explorar, onde voce pode buscar novos livros.

Resultados para as pesquisas serão sempre em inglês por conta da API Open Library utilizada.

## 🔧 Requisitos do Sistema Para Dev Server

Para conseguir usar o development server do ReadMore é somente necessário o Docker Compose e Node. Sendo possível rodar ele em qualquer sistema operacional com estes dois programas.

Versões:

* Node v18.16
* Docker v23.0
* Python v3.10 (opcional)

## 💽Rodando o dev server

Primeiro faça o git clone do repositório e entre nele:

```bash
git clone git@github.com:gbladislau/ProjetoIntegrado-1.git
cd ./ProjetoIntegrado-1
```

Depois você pode optar tanto por baixar as dependencias na mão ou rodar os containers docker (recomendado).

###### 🛑 Antes de Rodar mude em ./back_readmore/backend/settings.py:

```python
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ["SECRET_KEY"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = FalseDEBUG = False
```

para

```python
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "<qualquercoisa>"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = FalseDEBUG = FalseDEBUG = True
```

---

### Docker Linux (bash)

Para começar os servidores rode na raiz do repositório:

```bash
bash run.sh
```

Os dois servidores de desenvolvimento (tanto o back quanto front) devem rodar apartir desse comando. Cerca de 3 Gb de imagens do Docker (python e nodejs) serão baixadas.

---

### Docker Windows (Power Shell)

Para rodar o dev server no Windows rode o seguinte comando na raiz do reposítório:

```powershell
cd ./front-readmore

node updateEnv.js

cd ..

docker compose -f "docker-compose.yaml" up --build
```

---

### Sem Docker

Instale as dependencias:

```bash
cd ./front-readmore
npm install
```

```bash
cd ../back_readmore
pip install pipenv
pipenv install
```

Abra dois terminais e rode os servidores separadamente:

```bash
cd ../back_readmore
pipenv run python3 manage.py runserver
```

Para o front é necessário rodar também o script envUpdate.js:

```bash
cd ./front-readmore
node updateEnv.js
npx expo start
```

---

### Último Passo

Após os servidores estarem rodando é necessário abrir o [Expo Go](https://expo.dev/client) no celular Android ou IOS, colocando o Ip do seu computador na barra de URL para abrir o aplicativo.

## 🔐 Licença

Este projeto é licenciado sob a Licença [GPL-3.0 license](https://github.com/gbladislau/ProjetoIntegrado-1/blob/main/LICENSE).

## 🌟Créditos

Repositório para desenvolvimento do projeto da disciplina de Projeto Integrado 1 - [UFES](ufes.br).
Desenvolvido por [Gabriel Braga Ladislau](https://github.com/gbladislau) e [Marcus Louriçal](https://github.com/MarcusLNF).
