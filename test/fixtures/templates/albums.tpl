{% extends "module/base.tpl" %}

{% block title %}
{{ photographer.first_name }}
{% endblock %}

{% block reference %}
link
{% endblock %}

{% block content %}
{{photographer.user_id}}
{% endblock %}
