from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models

# Create your models here.
from blog.utils.models import BaseModel


# 分类(category)模型
from users.models import User


class Category(BaseModel):
    name = models.CharField(verbose_name='分类名称',max_length=30)
    index = models.IntegerField(default=999,verbose_name='分类的排序')
    class Meta:
        db_table = 'tb_categories'
        verbose_name='分类'
        verbose_name_plural=verbose_name

        ordering = ['index', 'id']

    def __str__(self):
        return self.name


# 标签(tag)模型
class Tag(BaseModel):
    name = models.CharField(max_length=30,verbose_name='标签名称')

    class Meta:
        db_table="tb_tags"
        verbose_name='标签'
        verbose_name_plural=verbose_name

    def __str__(self):
        return self.name

# 文章(aticle)模型
class Article(BaseModel):
    author = models.CharField(verbose_name="作者", max_length=30)
    title=models.CharField(verbose_name='标题',max_length=100)
    desc = models.CharField(verbose_name="文章描述",max_length=200)
    category = models.ForeignKey(Category, verbose_name='分类')

    tag = models.ManyToManyField(Tag, verbose_name='标签', blank=True)

    # 文章标题图片
    article_avatar = models.ImageField(verbose_name='文章题图', upload_to='article/%Y/%m', default='article/python.jpg', null=True)

    # content = RichTextField(verbose_name="文章内容")
    content = RichTextUploadingField(verbose_name="文章内容")
    clicks=models.IntegerField(verbose_name='点击量',blank=True,null=True,default=0)

    class Meta:
        db_table='tb_articles'
        verbose_name='文章'
        verbose_name_plural=verbose_name
        ordering=['-create_time']

    def __str__(self):
        return self.title


# 评论(comment)模型
class Comment(BaseModel):

    content=models.CharField(verbose_name='标签名称',max_length=50)
    username=models.CharField(verbose_name='用户名',max_length=30)
    email=models.CharField(verbose_name='邮箱',max_length=50)
    url=models.URLField(verbose_name='个人网站地址',blank=True,null=True)
    parent = models.ForeignKey('self',blank=True,null=True,verbose_name='父级评论')
    article = models.ForeignKey(Article,verbose_name='文章')

    class Meta:
        db_table='tb_comments'
        verbose_name='评论'
        verbose_name_plural=verbose_name

    def __str__(self):
        return str(self.id)