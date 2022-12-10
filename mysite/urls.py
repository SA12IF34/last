from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="shit/dist/index.html")),
    path('skills-frontend/', TemplateView.as_view(template_name="templates/one.html")),
    path('skills-backend/', TemplateView.as_view(template_name="templates/two.html")),
    path('saifapis/', include('saifapp.urls')),
    path('apis/', include("api.urls")),
    path('apis2/', include("APIs.urls")),
    path('blog/', TemplateView.as_view(template_name="blog/dist/index.html")),
    path('ecommerce-project/', TemplateView.as_view(template_name="onichan/dist/index.html")),
    path('ecommerce-project/success/', TemplateView.as_view(template_name="onichan/dist/index.html"))

]


react_routes = getattr(settings, 'REACT_ROUTES', [])

for route in react_routes:
    urlpatterns.append(path(f'ecommerce-project/{route}/', TemplateView.as_view(template_name="onichan/dist/index.html"))) 