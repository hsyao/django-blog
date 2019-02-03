from django.db.models import Count
from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from articles.models import Article, Category, Tag
from articles.serializers import ArticlesSerializer, DetailSerializer, CategorySerializer, TagSerializer

# 获取文章列表视图
from blog.utils.pagination import MyPageNumberPagination


class ArticlesView(ListAPIView):
    pagination_class = MyPageNumberPagination
    queryset = Article.objects.all()
    serializer_class = ArticlesSerializer


# 获取分类文章列表视图
class CategoryArticlesView(ListAPIView):
    pagination_class = MyPageNumberPagination
    serializer_class = ArticlesSerializer

    def get_queryset(self):
        cat_id = self.request.query_params.get("id")
        return  Article.objects.filter(category_id=cat_id)


# 获取标签文章类别视图
class TagArticlesView(ListAPIView):
    pagination_class = MyPageNumberPagination
    serializer_class = ArticlesSerializer

    def get_queryset(self):
        tag_id = self.request.query_params.get("id")
        return Article.objects.filter(tag__id=tag_id)

# 获取文章详情视图
class DetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = DetailSerializer

    # 重写查询方法，新增更新点击量
    def retrieve(self, request, *args, **kwargs):
        Article.objects.update()
        instance = self.get_object()
        instance.clicks = instance.clicks+1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



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
