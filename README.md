# 📚ReadMore

## 📝Descrição

O aplicativo ReadMore incentiva a leitura e a criação do hábito de leitura por meio da organização de seus livros. Com recursos de controle de progresso, o aplicativo funciona como um marcador de páginas digital. Além disso, você pode adicionar livros já lidos, em leitura e livros que deseja ler à sua estante digital. Utilize a função de marcador de página para ter controle do progresso de cada livro.

## 🔨 Ferramentas Utilizadas

Essas são algumas das linguagens, ferramentas, frameworks e bibliotecas que utilizamos no desenvolvimento dessa aplicação:

* Django (python)
* React Native (javascript)
* Expo
* Pipenv
* Node js
* Docker
* Figma ([protótipo](https://www.figma.com/file/JGgpaNX9gTQCJINLfPrxoR/ReadMore?type=design&node-id=352%3A138&mode=design&t=3PswqImuN1bMPGQe-1))

## 📱 Uso Geral

Como builds para IOS não são nossa prioridade, é possivel ver nas [Releases ](https://github.com/gbladislau/ProjetoIntegrado-1/releases)o APK do ReadMore para Android, com ele é possível utilizar o aplicativo com o banco de dados hospedado em: xyz.com

Na Tela inicial vemos duas opções, caso já tenha cadastro pode seguir para tela de Login.

Caso faça um cadastro é necessário um nome de usuario, email e senha.

### ⚠ DISCLAIMER

* Não use senhas que já utiliza normalmente, pois nosso aplicativo não possui SSL para segurança de comunicação.
* Não perca nem compartilhe seu nome de usuário e email, ele é usado para criar uma nova senha.

## 🔧 Requisitos do Sistema Para Dev Server

Para conseguir usar o development server do ReadMore é somente necessário o Docker Compose e Node. Sendo possível rodar ele em qualquer sistema operacional com estes dois programas.

Versões:

* Node v18.16
* Docker v23.0
* Python v3.10 (opcional)

### Linux (bash)

Para começar os servidores rode na raiz do repositório:

```bash
bash run.sh
```

Os dois servidores de desenvolvimento (tanto o back quanto front) devem rodar apartir desse comando. Cerca de 3 Gb de imagens do Docker (python e nodejs) serão baixadas.

---

### Windows (Power Shell)

Para rodar o dev server no Windows rode o seguinte comando na raiz do reposítório:

```powershell
cd ./front-readmore

node updateEnv.js

cd ..

docker compose -f "docker-compose.yaml" up --build
```

### Ultimo Passo

Após os servidores terem sido começados é necessário abrir o [Expo Go](https://expo.dev/client) no celular Android ou IOS, colocando o Ip do seu computador na barra de URL para abrir o aplicativo.

## 🔐 Licença

Este projeto é licenciado sob a Licença [GPL-3.0 license](https://github.com/gbladislau/ProjetoIntegrado-1/blob/main/LICENSE).

### 🌟Créditos

Repositório para desenvolvimento do projeto da disciplina de Projeto Integrado 1 - [UFES](ufes.br).
Desenvolvido por [Gabriel Braga Ladislau](https://github.com/gbladislau) e [Marcus Louriçal](https://github.com/MarcusLNF).
