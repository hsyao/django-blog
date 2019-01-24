"""


"""
from rest_framework import serializers

from articles.models import Article, Category, Tag


# 文章分类序列化器
class CategorySerializer(serializers.ModelSerializer):
    article__count=serializers.IntegerField(read_only=True)
    article_set=serializers.PrimaryKeyRelatedField(read_only=True,many=True)
    class Meta:
        model = Category
        fields = ['id', 'name','article__count','article_set']
        # fields = '__all__'

# 标签序列化器
class TagSerializer(serializers.ModelSerializer):
    article__count = serializers.IntegerField(read_only=True)
    article_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model=Tag
        fields =['id','name','article__count','article_set']


# 文章列表序列化器
class ArticlesSerializer(serializers.ModelSerializer):
    # 调整生成时间输出格式
    create_time=serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    category=CategorySerializer()
    class Meta:
        model=Article
        fields =['id','create_time','article_avatar','title','desc','clicks','category']

# 文章内容序列化器
class DetailSerializer(serializers.ModelSerializer):
    create_time=serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    class Meta:
        model=Article
        fields =['id','create_time','title','desc','clicks','content']


