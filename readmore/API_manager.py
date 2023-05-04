import requests as rq
import json as js
class API_man:
    
    def __init__(self, base_url=u'https://openlibrary.org') -> None:
        self.base_url = base_url
        self.session = rq.Session()
        
    def get_response_from_OPL(self,path):   
        response = self.session.get(self.base_url + path)
        response.raise_for_status()
        return response
    
    def search_book(self,search_key, flags):
        server_response = self.get_response_from_OPL()
        return 
    
    def transform_to_json(self,response:rq.Response):
        try:
            data = response.json()
        except:
            print("ERRO: trasnformação da resposta do servidor para JSON falhou")
        return data
