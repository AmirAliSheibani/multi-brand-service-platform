# Multi-Brand Service Platform

A configurable full-stack web application built with Django for creating SEO-optimized service websites for multiple appliance brands from a single reusable codebase.

Instead of building separate projects for every company, this platform dynamically renders complete brand-specific websites using configuration files while sharing the same backend, templates, and frontend components.

---

## ✨ Features

- Configuration-driven architecture
- Dynamic brand rendering
- Shared reusable templates
- Brand-specific themes and colors
- SEO metadata for every brand
- Responsive design
- Dynamic navigation menus
- Dynamic contact information
- Dynamic services and products
- Lightweight architecture (No database required)
- Easy onboarding of new brands
- Scalable codebase

---

## 🚀 Tech Stack

- Python
- Django
- HTML5
- CSS3
- JavaScript
- Tailwind

---

## 🏗 Architecture

The application follows a configuration-driven architecture.

Instead of creating a separate project for every client, each brand is defined inside its own configuration file.

```
Brand Configuration
        │
        ▼
    URL Routing
        │
        ▼
 Shared Django View
        │
        ▼
 Shared Templates
        │
        ▼
 Dynamic Website
```

Adding a new brand only requires:

1. Creating a new configuration file
2. Registering it inside the `BRANDS` dictionary

No template duplication is required.

---

## 📂 Project Structure

```
project/

├── brands/
│   ├── samsung.py
│   ├── lg.py
│   ├── bosch.py
│   ├── daewoo.py
│   ├── snowa.py
│   ├── himalia.py
│   └── ...
│
├── templates/
│
├── static/
│
├── views.py
│
└── urls.py
```

---

## ⚙ Brand Configuration

Each brand contains its own configuration object including:

- SEO metadata
- Theme colors
- Navigation
- Hero section
- Products
- Services
- Contact information
- Footer
- Testimonials
- Images

Example:

```python
BRANDS = {
    "samsung": samsung.BRAND,
    "lg": lg.BRAND,
    "bosch": bosch.BRAND,
}
```

This makes the project easy to extend without modifying the application logic.

---

## 🌐 Dynamic Content

Each website is rendered dynamically from its configuration.

Every brand can have its own:

- Primary color
- Gradient
- Logo
- Hero image
- SEO title
- SEO description
- Keywords
- Products
- Services
- Contact information
- Navigation menu
- Footer

while using the exact same Django templates.

---

## 📈 SEO Optimization

Every brand has its own SEO configuration including:

- Meta Title
- Meta Description
- Meta Keywords

This allows each generated website to be independently optimized for search engines.

---

## 💡 Why This Project?

Most service websites are built by duplicating the same templates over and over.

This project solves that problem by introducing a reusable configuration-based architecture where a single codebase can generate multiple fully customized websites.

Benefits include:

- Reduced maintenance cost
- Cleaner architecture
- Faster deployment
- Better scalability
- Easier customization
- Reusable components

---

## 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/AmirAliSheibani/multi-brand-service-platform.git
```

Navigate into the project

```bash
cd multi-brand-service-platform
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the server

```bash
python manage.py runserver
```

---

## ➕ Adding a New Brand

Creating a new website only requires:

1. Create a new configuration file

```
brands/new_brand.py
```

2. Define the brand configuration

3. Register it

```python
BRANDS["new-brand"] = new_brand.BRAND
```

Done.

No HTML duplication.

No new views.

No new templates.

---

## 🔮 Future Improvements

- Django Admin Panel
- CMS Support
- REST API
- Docker Support
- Redis Caching
- PostgreSQL Support
- Analytics Dashboard
- Multi-language Support

---

## 👨‍💻 Author

Developed by **Amir Ali Sheibani**

GitHub:
https://github.com/AmirAliSheibani

---
