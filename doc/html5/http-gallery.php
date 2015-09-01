<!DOCTYPE html>
<!--<html manifest="../../demo.manifest">-->
<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>HTTP-Gallery</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<!-- Place favicon.ico in the root directory -->

		<!--
			Подключаем скрипты
		-->

		<!-- vendor scripts added -->
		<script src="../../js/vendor/modernizr.js"></script>
		<script src="../../js/plugins.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script>
			window.jQuery || document.write('<script src="../../js/vendor/jquery.js"><\/script>')
		</script>

		<!-- user scripts added -->
		<script src="../../js/main.js"></script>


		<link rel="stylesheet" href="../../css/normalize.css">
		<link rel="stylesheet" href="../../css/main.css">
	</head>

<body>
	<!-- ..................................................................... Canvas-Контейнер ..  -->
	
		<main>
			<article id='httpArticle'>
				<h1>Просто картинки</h1>
					<?php

						// patterns

						$currentSlide = $_GET["currentSlide"];

						switch($currentSlide)
						{
							case 1:
								echo '<figure><h2>Delete</h2><img src="http://webexam/img/del.png"></figure>';
								break;
							case 2:
								echo '<figure><h2>Gift</h2><img src="http://webexam/img/gift.png"></figure>';
								break;
							case 3:
								echo '<figure><h2>Interesting</h2><img src="http://webexam/img/interesting.png"></figure>';
								break;
							case 4:
								echo '<figure><h2>Ok</h2><img src="http://webexam/img/ok.png"></figure>';
								break;
							default:
								echo 'Слайд не найден';
						}
					?>

					<div id="slide">Нажмите на ссылку, чтобы показать картинку.
						<a id="prev_btn" href="#">Пред</a> 
						<a id="next_btn" href="#">След</a>
					</div>


			</article>
		</main>
</body>

</html>