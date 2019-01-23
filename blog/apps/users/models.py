from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
# 用户(User)模型
# 采用的继承方式扩展用户信息
class User(AbstractUser):
    # 在继承的基础上新增2个字段
    avatar = models.ImageField(verbose_name='用户头像', upload_to='avatar/%Y/%m', default='avatar/default.png', null=True)
    url = models.URLField(verbose_name='个人网页地址', null=True, max_length=100)

    class Meta:
        db_table = 'tb_users'
        verbose_name = '用户'
        # verbose_name_plural：人类可读的单复数名称，这里“用户”复数名称为“用户”
        verbose_name_plural = verbose_name

    # 对象的字符串表达式(unicode格式)
    def __str__(self):
        return self.username
