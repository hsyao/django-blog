# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-12-25 14:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_auto_20181225_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='author',
            field=models.CharField(default='abc', max_length=30, verbose_name='作者'),
        ),
    ]
