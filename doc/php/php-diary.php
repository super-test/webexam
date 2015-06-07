<!doctype html>
<html class="no-js" lang="ru">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>PHP Diary</title>
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
	<article>
		<?php
//			ini_set('display_errors',1);
//			error_reporting(E_ALL);

			/* ****************************************************************** Model */
			
			/* --------------------------------------------------------- class for one separate note */

			class Note {
				public $textNote; // Текст записки
				public $category; // Категория записки

				function __construct($text="Default Note", $category = "Default category") {
					// Конструктор, который инициализирует все свойства класса
					$this->textNote=$text;
					$this->category=$category;
				}
			};
			
			/* --------------------------------------------------------- operate items */

			class Organizer {
				
				public $notes;
				
				function __construct() {
					// Конструктор, который инициализирует все свойства класса
					$this->notes=array();
				}
				
				public function addNote(Note $note) {
					$this->notes[] = $note;					
				}
			};
			
			/* ****************************************************************** Data */
				$textData = new Note();

				$index=0;
					
				$nameNote = "nameNote".$index;
				$nameCategory = "nameCategory".$index;
			
			/* ****************************************************************** Template */
			
			$note_tmpl =
				"<label>Input Note</label>
					<input type=\"text\" name=\"{$nameNote}\" value=\"{$textData->textNote}\"><br />

					<label>Input Cathegory</label>
						<input type=\"text\" name=\"{$nameCategory}\" value=\"{$textData->category}\"><br />";
			$form_tmpl = 
				"<form action=\"#\" method=get\">
					
					{$note_tmpl}
					<input type=\"submit\" value=\"Add Note\" name=\"send\" />
				</form>";		

			/* ****************************************************************** Controller */
			echo $form_tmpl;				

				
			if($_GET["send"]) {

				for ($index=0; $index<count($_GET); $index++) {
					
					$nameNote = "nameNote".$index;
					$nameCategory = "nameCategory".$index;
					
					$textData->textNote = $_GET[$nameNote.$index];
					$textData->category = $_GET[$nameCategory.$index];
					echo $note_tmpl;
					echo "Thank";
					echo $form_tmpl;
				}
			}

			
		?>
	</article>
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