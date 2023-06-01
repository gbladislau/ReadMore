import requests as rq
import json as js
import pandas as pd
import re

class API_manager:
    
    def __init__(self, base_url=u'https://openlibrary.org') -> None:
        self.base_url = base_url
        self.session = rq.Session()
        
    def get_response_from_OPL(self, path):   
        response = self.session.get(self.base_url + path)
        response.raise_for_status()
        return response
    
    # No link abaixo temos os FIELDS retornados pelo search, podemos filtrar a exemplo fields=title,key,cover_i
    # Retorna somente o titulo a chave e o id da capa
    # https://github.com/internetarchive/openlibrary/blob/abd73aa37ea27b4e7d70f521bfd1e30b7dc1dc6e/openlibrary/plugins/worksearch/schemes/works.py#L113-L132
    def search_books(self,search_key, flags="") :
        #https://openlibrary.org/search.json?&fields=title,key,cover_i&mode=everything&q=Harry+Potter exemplo de pesquisa
        server_response = self.get_response_from_OPL('/search.json?&'+flags+'&fields=title,key,cover_i&q='+search_key.replace(' ','+').removesuffix('\n'))
        books_results = json_results_to_df(transform_to_json(server_response))
        if not books_results.empty: return books_results['docs']
        return books_results





def json_results_to_df(json_dict) -> pd.DataFrame:
    df = pd.DataFrame(json_dict)
    return pd.DataFrame(json_dict)

def transform_to_json(response:rq.Response):
    try:
        data = response.json()
    except:
        print("ERRO: trasnformação da resposta do servidor para JSON falhou")
    return data


def teste():
    api = API_manager()
    res = api.search_book("Harry Potter")
    if res.empty: exit()
    print((res['docs'].values))
    with open('readme.txt', 'w') as f:
        f.write(str(res['docs'][1]))