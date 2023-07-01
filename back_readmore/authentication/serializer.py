from rest_framework import serializers
from django.contrib.auth.models import User

class RegistrationSerializer(serializers.ModelSerializer):
    
    senha2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ['Email','Username', 'Password', 'Confirm Password']
        extra_kwargs ={'Password' : {'write_onle' : True}}
        
    def save(self):
        account = User(email = self.validate_date['Email'], 
                       username = self.validated_data['Username'],)
        senha = self.validated_data['Password']
        senha2 = self.validated_data['Confirm Password']
        
        if senha != senha2:
            raise serializers.ValidationError({'Password':'Senhas precisam ser iguais'})
        account.set_password(senha)
        account.save()
        return account
        
        