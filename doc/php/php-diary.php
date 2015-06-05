<!doctype html>
<html class="no-js" lang="ru">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>Карта сайта</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="apple-touch-icon" href="apple-touch-icon.png">
	<!-- Place favicon.ico in the root directory -->

	<link rel="stylesheet" href="/css/normalize.css">
	<link rel="stylesheet" href="/css/main.css">
	
</head>

<body>
	<!--[if lt IE 8]>
    	<p class="browserupgrade">
            You are using an <strong>outdated</strong> browser. Please 
            <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
        </p>
    <![endif]-->

	<!-- Add your site or application content here -->
	<nav>
		<h3>Учебные материалы</h3>
		<ol>
			<li>HTML5
				<ol>
					<li><a href="/doc/html5/html5-history.html">История HTML</a></li>
					<li><a href="/doc/html5/html5-tags.html">HTML5 Tags</a></li>
					<li><a href="/doc/html5/html5-forms.html">Формы HTML5</a></li>
				</ol>
			</li>
			<li>PHP
				<ol>
					<li><a href="/doc/php/php-shop.php">PHP-Shop</a></li>
				</ol>
			</li>
		</ol>
	</nav>
	<hr>
	<nav>
		<h3>Примеры</h3>
		<ul>
			<li>HTML5
				<ul>
					<li><a href="/doc/html5/html5-history.html">HTML5 Текст</a></li>
					<li><a href="/doc/html5/html5-tags.html">HTML5 Таблица</a></li>
					<li><a href="/doc/html5/html5-tags.html">HTML5 Details</a></li>
					<li><a href="/doc/html5/html5-forms.html">Формы HTML5</a></li>
				</ul>
			</li>
			<li>CSS3
				<ul>
					<li></li>
				</ul>
			</li>
		</ul>
	</nav>
	
	<!--
		Подключаем скрипты
	-->
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script>
		window.jQuery || document.write('<script src="../../js/vendor/jquery.js"><\/script>')
	</script>
	<script src="../../js/plugins.js"></script>
	<script src="../../js/main.js"></script>
	<script src="../../js/vendor/modernizr.js"></script>
	
	<!-- user scripts added -->
	<script src="../../js/main.js"></script>

	
	
	<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
	<script>
		(function (b, o, i, l, e, r) {
			b.GoogleAnalyticsObject = l;
			b[l] || (b[l] =
				function () {
					(b[l].q = b[l].q || []).push(arguments)
				});
			b[l].l = +new Date;
			e = o.createElement(i);
			r = o.getElementsByTagName(i)[0];
			e.src = 'https://www.google-analytics.com/analytics.js';
			r.parentNode.insertBefore(e, r)
		}(window, document, 'script', 'ga'));
		ga('create', 'UA-XXXXX-X', 'auto');
		ga('send', 'pageview');
	</script>
</body>

</html>