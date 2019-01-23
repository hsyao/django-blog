from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView

from articles.models import Article
from articles.serializers import ArticlesSerializer, DetailSerializer


class ArticlesView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class=ArticlesSerializer

class DetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class=DetailSerializer
