# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-12-25 14:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0005_auto_20181225_2206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='clicks',
            field=models.IntegerField(null=True, verbose_name='点击量'),
        ),
    ]