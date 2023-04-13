from olclient.openlibrary import OpenLibrary

def getBook():
    op = OpenLibrary()
    
    key = input()
    value = op.Author.search(key)
    print(value[0]['key'])
    author = op.Author(olid=value[0]['key'])
    print(author)
    
        
if __name__ == '__main__':
    getBook()