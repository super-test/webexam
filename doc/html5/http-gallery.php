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
				<h2>Просто картинки</h2>
					<?php

						// patterns

						$currentSlide = $_GET["currentSlide"];

						switch($currentSlide)
						{
							case 1:
								echo '<figure><h2>Delete</h2><img src='.@$_COOKIE['Delete'].'></figure>';
								break;
							case 2:
								echo '<figure><h2>Gift</h2><img src='.@$_COOKIE['Gift'].'></figure>';
								break;
							case 3:
								echo '<figure><h2>Interesting</h2><img src='.@$_COOKIE['Interesting'].'></figure>';
								break;
							case 4:
								echo '<figure><h2>Ok</h2><img src='.@$_COOKIE['Ok'].'></figure>';
								break;
							default:
								echo 'Слайд не найден';
						}
					?>

					<div id="slide">Нажмите на ссылку, чтобы показать картинку.
						<br/><a id="prev_btn" href="#">Пред</a> 
						<a id="next_btn" href="#">След</a>
						<br/>
							<?php 
								if(@$_COOKIE['cookieCounter'] == 0)
									echo "Вы посмотрели ".@$_COOKIE['cookieCounter']." картинок";

								else if(@$_COOKIE['cookieCounter'] == 1)
									echo "Вы посмотрели ".@$_COOKIE['cookieCounter']." картинку";

								else if(@$_COOKIE['cookieCounter'] >=2 && @$_COOKIE['cookieCounter'] <= 4)
									echo "Вы посмотрели ".@$_COOKIE['cookieCounter']." картинки";
								
								else if(@$_COOKIE['cookieCounter'] == 5)
									echo "Чтобы посмотреть остальные - отправьте смс на короткий номер";
							 ?>
					</div>


			</article>
		</main>
</body>

</html>