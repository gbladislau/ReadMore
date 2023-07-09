from django.urls import path
from .views import signup, addbook, hasbook
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/register/', signup, name="sign_up"),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/addbook/',addbook, name='addbook'),
    path('api/hasbook/',hasbook, name='hasbook'),
]