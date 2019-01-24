from django.db.models import Count
from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView

from articles.models import Article, Category, Tag
from articles.serializers import ArticlesSerializer, DetailSerializer, CategorySerializer, TagSerializer


# 获取文章列表视图
class ArticlesView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class=ArticlesSerializer

# 获取文章详情视图
class DetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class=DetailSerializer

# 获取类别列表视图
class CategoriesView(ListAPIView):
    # Category获取到的QuerySet将有一个名为额外属性article__count
    queryset = Category.objects.annotate(Count('article'))
    serializer_class = CategorySerializer

# 获取标签列表视图
class TagsView(ListAPIView):
    # Tag获取到的QuerySet将有一个名为额外属性article__count
    queryset = Tag.objects.annotate(Count('article'))
    serializer_class = TagSerializer