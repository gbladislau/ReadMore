

import backoff
import requests
def getBook():
    op = OpenLibrary()
    
    key = input()
    value = op.Author.search(key)
    print(value)
    
    
        
if __name__ == '__main__':
    getBook()