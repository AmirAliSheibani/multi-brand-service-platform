from django.http import Http404
from django.shortcuts import render

from .brands import samsung, lg, daewoo, snowa, bosch, himalia, electrosteel, general_electric, master

BRANDS = {
    "samsung": samsung.BRAND,
    "lg": lg.BRAND,
    "daewoo": daewoo.BRAND,
    "snowa": snowa.BRAND,
    "bosch": bosch.BRAND,
    "himalia": himalia.BRAND,
    "electrosteel": electrosteel.BRAND,
    "general-electric": general_electric.BRAND,
}

def brand_page(request, brand):
    brand_data = BRANDS.get(brand)
    if not brand_data:
        raise Http404()

    return render(request, "pages/home.html", {
        "brand": brand_data
    })


def brands_index(request):
    """
    صفحه مادر: لیست برندها (کارت‌های برند -> لینک به brand_page)
    هر کارت از اطلاعات پایه‌ی برند مثل slug, name, theme.primary, hero.image استفاده می‌کند.
    """
    brands_list = []
    for slug, b in BRANDS.items():
        brands_list.append({
            "slug": slug,
            "name": b.get("name", slug.title()),
            "display_name": b.get("name", slug.title()),
            "hero_image": b.get("hero", {}).get("image", ""),
            "primary": b.get("theme", {}).get("primary", "#907dda"),
            "primary_dark": b.get("theme", {}).get("primary_dark", "#7f62c2"),
            "subtitle": b.get("hero", {}).get("subtitle", b.get("seo", {}).get("description", ""))[:150],
        })

    context = {
        "brands": brands_list,
        # برای SEO صفحه مادر (اختیاری)
        "page_meta": {
            "title": "نمایندگی‌های رسمی — فهرست برندها | نماینده مرکزی تعمیرات کد 1290",
            "description": "فهرست نمایندگی‌های رسمی: سامسونگ، ال‌جی، دوو و ... — پشتیبانی ۲۴ ساعته و اعزام فوری تعمیرکار. برای مشاهده جزئیات هر برند کلیک کنید.",
        },
        "brand": master.BRAND

    }
    return render(request, "pages/brands_list.html", context)