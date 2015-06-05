<!doctype html>

<!--

-->


<html class="no-js" hreflang="ru">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>PHP Shop</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="apple-touch-icon" href="apple-touch-icon.png">
	<!-- Place favicon.ico in the root directory -->

	<link rel="stylesheet" href="../../css/normalize.css">
	<link rel="stylesheet" href="../../css/main.css">
	<script src="../../js/vendor/modernizr-2.8.3.min.js"></script>

	<!-- html5-support (details/summary) supported -->
	<script src="../../js/vendor/logifill-details-min.js"></script>
	
	<!-- user scripts added -->
	<script src="../../js/main.js"></script>
</head>

<body>
	<!--[if lt IE 8]>
		<p class="browserupgrade">
			You are using an <strong>outdated</strong> browser. 
			Please <a href="http://browsehappy.com/">upgrade your browser</a> 
			to improve your experience.
		</p>
	<![endif]-->

	<!-- Add your site or application content here -->
	<main role="main">
		<article>
				
		<!-- ************************************************************** Класс товаров -->
		
		<?php
			class Template {
				public $name;					// Название шаблона
				public $category; 				// Категория шаблона
				public $price; 					// Цена шаблона
				public $availability; 			// Наличие на складе
				
				function __construct($name, $category, $price=null, $availability=false) {
					//конструктор, который инициализирует все свойства класса
					echo "запущен конструктор...<br />";
					$this->name=$name;
					$this->category=$category;
					$this->price=$price;
					$this->availability =$availability;
				}

				// деструктор	
				function __destruct() { 
					echo "запущен деструктор...<br />";
				}

				//метод, позволяющий получить информацию о цене.		
				function getPrice() { 
					return(is_null($this->price)?‘N/A’:$this->price);
				}

				//метод, изменяющий значение свойства с ценой на новое.	
				function setPrice($new_price) { 
					$this->price=$new_price;
				}
			}
		?>
		
		<!-- ************************************************************** Простейшая форма заказа -->
		
			<?php
				if(!$_GET["total"]) {
					echo 
						"<form action=\"#\" method=get name=\"miniShop\">
							<label>Item 1</label> <label>57.15</label>
							<input type=\"number\" name=\"numberItems1\"><br />

							<label>Item 2</label> <label>34.67</label>
							<input type=\"number\" name=\"numberItems2\"><br />

							<label>Item 3</label> <label>07.17</label>
							<input type=\"number\" name=\"numberItems3\"><br />

							<label>Item 4</label> <label>45.89</label>
							<input type=\"number\" name=\"numberItems4\"><br />

							<label>Item 5</label> <label>23.15</label>
							<input type=\"number\" name=\"numberItems5\"><br />

							<label>Item 6</label> <label>51.50</label>
							<input type=\"number\" name=\"numberItems6\"><br />

							<input type=\"submit\" value=\"Посчитать\" name=\"total\" />
						</form>";

				}
				else {
					$countItems = 0;

					$price = $_GET["numberItems1"] * 57.15 + 
							$_GET["numberItems2"] * 34.67 + 
							$_GET["numberItems3"] * 07.17 + 
							$_GET["numberItems4"] * 45.89 + 
							$_GET["numberItems5"] * 23.15 + 
							$_GET["numberItems6"] * 51.50;

					for($i = 0; $i < count($_GET); $i++) {

						if($_GET["numberItems".$i]) {
							$countItems++;
							$totalCount += $_GET["numberItems".$i];
						}
					}

					echo "Спасибо! Вы приобрели ".$totalCount." товаров 
						(".$countItems. " артикулов) 
						на cумму ".$price; 
					echo "<br /><a href=\"javascript:javascript:history.go(-1)\">Назад</a>";
					echo "<br /><a href=\"$_SERVER[HTTP_REFERER]\">Вернуться</a>";
				}
			?>
		</article>	
	</main>
	<footer>
		<div class="license"> Все права защищены &copy; </div>
	</footer>

	
	
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