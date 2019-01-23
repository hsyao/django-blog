"""


"""
from django.conf.urls import url

from articles import views

urlpatterns=[
    url(r'^articles/$',views.ArticlesView.as_view()),
    url(r'^detail/(?P<pk>\d+)/$',views.DetailView.as_view()),
]