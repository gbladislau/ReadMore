

class Usuario:
    
    nome_do_usuario = str
    login = str
    estante = list
    estatisticas = list
    meta_diaria = int
    
    def __init__(self,login,nome) -> None:
        self.login = login
        self.nome_do_usuario = nome
        

    
    