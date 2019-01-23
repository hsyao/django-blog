from django.contrib import admin

# Register your models here.
from django.contrib.admin import ModelAdmin

from articles.models import Article, Comment, Category, Tag

admin.site.site_header = "博客后台管理系统"
admin.site.site_title = "BMS"
admin.site.index_title = '欢迎使用BMS'

class ArticleInfoAdmnin(ModelAdmin):
    list_per_page = 10
    fields = ['author','title','desc','category','tag','article_avatar','content']
    # 调整列表显示字段
    list_display = ['id','title','category','clicks','create_time','update_time']


admin.site.register(Article,ArticleInfoAdmnin)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Comment)