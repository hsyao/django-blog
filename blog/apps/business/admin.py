from django.contrib import admin

# Register your models here.
from business.models import Link, Ad

admin.site.register(Link)
admin.site.register(Ad)
