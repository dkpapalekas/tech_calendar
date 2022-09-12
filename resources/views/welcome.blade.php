<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;600&display=swap" rel="stylesheet">
        <script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
        </script>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}" />

        <title>{{env('APP_NAME')}}</title>
    </head>
    <body>
        <div id="app">
            <router-view :key="$route.path"></router-view>
        </div>

        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
