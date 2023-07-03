from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response


# view for registering users
class RegisterView(APIView):
    def post(self, request):
        if request.method == 'POST':
            serializer = UserSerializer(data=request.body)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)