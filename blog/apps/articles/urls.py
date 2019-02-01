"""


"""
from django.conf.urls import url

from articles import views

urlpatterns=[
    url(r'^articles/$',views.ArticlesView.as_view()),
    url(r'^detail/(?P<pk>\d+)/$',views.DetailView.as_view()),
    url(r'^categories/$',views.CategoriesView.as_view()),
    url(r'^tags/$',views.TagsView.as_view()),  # 获取标签路由
    url(r'^cat_articles/$',views.CategoryArticlesView.as_view()),  # 获取具体类别文章路由
    url(r'^tag_articles/$',views.TagArticlesView.as_view()),  # 获取具体标签文章路由
]