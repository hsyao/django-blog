"""


"""
from rest_framework import serializers

from articles.models import Article


class ArticlesSerializer(serializers.ModelSerializer):
    create_time=serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    class Meta:
        model=Article
        fields =['id','create_time','article_avatar','title','desc','clicks']


class DetailSerializer(serializers.ModelSerializer):
    create_time=serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    class Meta:
        model=Article
        fields =['id','create_time','title','desc','clicks','content']