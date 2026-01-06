from django.urls import path
from . import views
app_name = "main"
urlpatterns = [
    path("<slug:brand>/", views.brand_page, name="brand-page"),
    path('', views.brands_index, name='brands_index'),
]