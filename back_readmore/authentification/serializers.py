
from rest_framework import serializers
from .models import UserData, Book


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


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ["title", "opl_key", 'status','author_name','cover_i']

    def create(self, validated_data,user):
        book = Book.objects.create(
            title=validated_data['title'],
            opl_key=validated_data['opl_key'],
            author_name=validated_data['author_name'],
            cover_i=validated_data['cover_i'],
            status=validated_data['status'],
            user = user,
            pages_read=0,)

        book.save()
        return book
