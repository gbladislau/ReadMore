from enum import Enum
import json
from olclient.openlibrary import OpenLibrary
from requests import Response

class User_reference(Enum):
    nenhuma = 0
    quero_ler = 1
    lido = 2

class Livro:
    json_opl = json
    codigo_olid = str
    referencia = User_reference
    
    def __init__(self, codigo_opl:str , referencia:User_reference= User_reference.nenhuma) -> None:
        self.codigo_olid = codigo_opl
        
        try:
            self.json_opl = OpenLibrary.Work(codigo_opl)
        except:
            print('ERRO: busca pelo livro não retornou resultados')
        
        self.referencia = referencia

if __name__ == '__main__':
    r = OpenLibrary.get_ol_response(self=OpenLibrary(),path='/search.json?q='+input().replace(' ','+').removesuffix('\n'))
    print(r.json())
    try:
        data = r.json()
        olid = OpenLibrary._extract_olid_from_url(
            data.pop('key', ''), url_type='works'
        )
    except:
        raise Exception(f"Unable to get Author with olid: {olid}")
    
    book = Livro()