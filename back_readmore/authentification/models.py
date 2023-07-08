from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class BookManager(models.Manager):
    use_in_migration = True

    def create_book(self, title, opl_key, author_name, cover_i, status):
        book = self.create(title=title, opl_key=opl_key,
                           author_name=author_name, cover_i=cover_i,
                           status=status, pages_read=0)
        # do something with the book
        return book


class BookData(models.Model):
    opl_key = models.CharField(unique=True)
    title = models.CharField()
    cover_i = models.CharField()
    author_name = models.CharField()

    status = models.CharField(max_length=200)
    pages_read = models.IntegerField()

    def __str__(self):
        return self.title


class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)


class UserData(AbstractBaseUser):

    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    books_list = []

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name
