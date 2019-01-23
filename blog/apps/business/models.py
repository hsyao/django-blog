from django.db import models

# Create your models here.
from blog.utils.models import BaseModel


# 友情链接(links)模型
class Link(BaseModel):
    title=models.CharField(verbose_name="标题",max_length=100)
    description=models.CharField(verbose_name="友情链接描述",max_length=200)
    callback_url=models.URLField(null=True,verbose_name="链接地址")
    index = models.IntegerField(default=999,verbose_name='排列顺序(从小到大)')

    class Meta:
        db_table="tb_links"
        verbose_name="友情链接"
        verbose_name_plural=verbose_name
        ordering=['index','id']

    def __str__(self):
        return self.title

class Ad(BaseModel):
    title=models.CharField(verbose_name="广告标题",max_length=100)
    description=models.CharField(verbose_name='广告描述',max_length=200)
    image_url=models.ImageField(upload_to="ad/%Y/%m",verbose_name="图片路径")
    callback_url=models.URLField(null=True,verbose_name="回调地址")
    index = models.IntegerField(default=999,verbose_name="排列顺序(从小到大)")

    class Meta:
        db_table="tb_ads"
        verbose_name = "广告"
        verbose_name_plural = verbose_name
        ordering=['index','id']

    def __str__(self):
        return self.title