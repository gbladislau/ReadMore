
from rest_framework import serializers
from .models import UserData, BookData


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = ["id", "email", "name", "password"]

    def create(self, validated_data):
        user = UserData.objects.create(email=validated_data['email'],
                                       name=validated_data['name']
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user

class BookSerealizer(serializers.ModelSerializer):

    class Meta:
        model = BookData
        fields = ["title", "opl_key",'status']

    def create(self, validated_data):
        
        book = BookData.objects.create(title=validated_data['title'],
                                       opl_key=validated_data['opl_key'],
                                       status=validated_data['status'])

        book.save()
        return book