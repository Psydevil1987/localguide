#Exception,die geworfen wird, wenn aus der db nichts kommt
class NotFoundException(Exception):

#init 
 def __init__(self, message):
       #message
        self.message = message
        #message weitergeben
        super().__init__(self.message)