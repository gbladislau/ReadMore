from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# URL's usadas pelo banco de dados do aplicativo
urlpatterns = [
    path('api/register/', views.signup, name="sign_up"),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/reset_password/',views.reset_password, name='reset_password'),  
    
    path('api/addbook/',views.addbook, name='addbook'),
    path('api/update_book/',views.update_pages_read, name='update_book'),
    path('api/hasbook/',views.hasbook, name='hasbook'),
    path('api/delete_book/',views.delete_book, name='delete_book'),
    path('api/get_user_books/',views.get_user_books, name='get_books')
]