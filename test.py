from olclient.openlibrary import OpenLibrary

def getBook():
    op = OpenLibrary()
    
    
    value = op.Work.get('OL509183W')
    print(value)
    dict = value.json()
    
    print("\n")
    print(dict['title'])
        
if __name__ == '__main__':
    getBook()