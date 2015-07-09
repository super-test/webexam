// FIXME Исправить JSLint
// TODO Подогнать размер автоматических фигур, градиентов и пр. под реальные размеры холста
// TODO Добавмть анимацию

/*
* ********************************************************* Java Script **
*/	


window.onload = function() {
	
		var mainWindow = window.parent.document;										// Документ с фреймами
		var mainIFrame = document.getElementById('contentFrame');						// Фрейм
		var codeStr = mainWindow.getElementById('codeString');							// Строка для кода
		var img = new Image();												//Создадим картинку для загрузки в Canvas
	

		
/* 
* ********************************************************* Java Script Canvas **
*/
	
	// FUTURE CANVAS START
		
	// FUTURE CANVAS IN BROWSER START && END
	
		// Если Canvas открыт в браузере ...
		// Иначе интерпретатор ругается, что не может прочитать обработчики из других фреймов
		// Поскольку все кнопки во фрейме, пока что будет работать только рисование мышкой
		if(document.location.pathname === "/doc/html5/html5-canvas.html") {
			var canvas = document.getElementById('canvasField');
		}	
	
	// FUTURE CANVAS IN FRAME START						
	
		// Если в браузере Canvas или страница с фреймами ...
		if(document.location.pathname === "/doc/html5/frameset.html"
		   || document.location.pathname === "/doc/html5/html5-canvas.html") {
			
			// Если в браузере фрейм
			if(document.location.pathname === "/doc/html5/frameset.html") {
			
				var canvas = mainIFrame.contentDocument.getElementById('canvasField');	// Обзываем canvas			
				var context = canvas.getContext('2d'); 									// Получим context
				
	// FUTURE Canvas buttons
				
				/* --------------------------------------------------------------- Запустить Canvas -- */
				
				// NOTE Почему в таком случае не работает обычный RUN??????
				
				mainWindow.getElementById('runCanvasButton').onclick = function () {
					
					// Отправляем значение из строки с кодом на выполнение
					eval(codeStr.value);
				}
		
				/* --------------------------------------------------------------- Начать новый путь -- */

				mainWindow.getElementById('beginPath').onclick = function () {
					codeStr.value += "context.beginPath();\n";
				}
		
				/* --------------------------------------------------------------- Закрыть путь -- */

				mainWindow.getElementById('closePath').onclick = function () {
					codeStr.value += "context.closePath();\n";
				}
		
				/* --------------------------------------------------------------- Очистить холст -- */

				mainWindow.getElementById('clearCanvas').onclick = function () {
					codeStr.value += "context.clearRect(0, 0, canvas.width, canvas.height);\n";
				}
		
				/* --------------------------------------------------------------- Перезагрузить холст -- */

				mainWindow.getElementById('reloadCanvas').onclick = function () {
					canvas.width = canvas.width;
				}


				/* --------------------------------------------------------------- Восстановмть холст -- */

				// FIXME Don't working (может восстанавливается не содержимое холста, а только сетка координат???)
				
				mainWindow.getElementById('restoredCanvas').onclick = function () {
					context.restore();
				}

				/* --------------------------------------------------------------- Сдвмнуть сетку -- */

				mainWindow.getElementById('moveCanvasButton').onclick = function () {
					codeStr.value += "context.translate(50,50);\n";
				}

				/* --------------------------------------------------------------- Повернуть сетку -- */

				mainWindow.getElementById('rotateCanvasButton').onclick = function () {
					codeStr.value += "context.rotate(10);\n";
				}
				
	// FUTURE Canvas Lines

				/* --------------------------------------------------------------- Начальная точка -- */

				mainWindow.getElementById('moveTo').onclick = function () {
					codeStr.value += "context.moveTo(10, 30);\n";
				}

				/* --------------------------------------------------------------- Конечная точка -- */

				mainWindow.getElementById('lineTo').onclick = function () {
					codeStr.value += "context.lineTo(100, 300);\n";
				}

				/* --------------------------------------------------------------- Ширина линии -- */

				mainWindow.getElementById('lineWidth').onclick = function () {
					codeStr.value += "context.lineWidth = 10;\n";
				}

				/* --------------------------------------------------------------- Цвет линии -- */

				mainWindow.getElementById('strokeStyle').onclick = function () {
					codeStr.value += "context.strokeStyle = 'red';\n";
				}

				/* --------------------------------------------------------------- Закруглить концы линии -- */

				mainWindow.getElementById('lineCapRound').onclick = function () {
					codeStr.value += "context.lineCap = 'round';\n";
				}

				/* --------------------------------------------------------------- Заквадратить концы линии -- */

				mainWindow.getElementById('lineCapSquare').onclick = function () {
					codeStr.value += "context.lineCap = 'square';\n";
				}

				/* --------------------------------------------------------------- Соединить концы -- */

				mainWindow.getElementById('stroke').onclick = function () {
					codeStr.value += "context.stroke();\n";
				}
				
	// FUTURE Canvas Text

				/* --------------------------------------------------------------- Canvas-Текст -- */

				mainWindow.getElementById('text').onclick = function () {
					codeStr.value += "context.textBaseline = 'top';\ncontext.font = 'bold 20px Verdana, sans-serif';\ncontext.fillStyle = 'violet';\ncontext.fillText('Hello World:)', 10, 10);\n";
				}

				/* --------------------------------------------------------------- Контур текста -- */

				mainWindow.getElementById('borderText').onclick = function () {
					codeStr.value += "context.font = 'bold 40px Verdana,sans-serif';\ncontext.lineWidth = 1;\ncontext.strokeStyle = 'red';\ncontext.strokeText('Hello World:)', 50, 50);\n";
				}
				
	// FUTURE Canvas Shapes

				/* --------------------------------------------------------------- Дуга -- */
				
				/* --------------------------------------------------------------- Canvas-Фигуры -- */

				mainWindow.getElementById('arc').onclick = function () {
					codeStr.value += "context.arc(centerX, centerY, radius, startingAngle(rad)*Math.PI, endingAngle(rad)*Math.PI);\n";
				}

				/* --------------------------------------------------------------- Кривая -- */

				mainWindow.getElementById('bezier').onclick = function () {
					codeStr.value += "context.bezierCurveTo(controlX_1, controlY_1, controlX_2, controlY_2, endPointX, endPointY);\n";
				}

				/* --------------------------------------------------------------- Закруглить вершины фигуры -- */

				mainWindow.getElementById('lineJoinRound').onclick = function () {
					codeStr.value += "context.lineJoin = 'round';\n";
				}

				/* --------------------------------------------------------------- Вершины в виде угла -- */

				mainWindow.getElementById('lineJoinBever').onclick = function () {
					codeStr.value += "context.lineJoin = 'bevel';\n";
				}
				
				/* --------------------------------------------------------------- Определить заливку -- */

				mainWindow.getElementById('fill').onclick = function () {
					codeStr.value += "context.fill();\n";
				}
				
	// FUTURE Canvas Colors

				/* --------------------------------------------------------------- Цвет заливки -- */

				mainWindow.getElementById('fillStyle').onclick = function () {
					codeStr.value += "context.fillStyle = 'yellow';\n";
				}
			
				/* --------------------------------------------------------------- Прозрачность -- */

				mainWindow.getElementById('opasity').onclick = function () {
					codeStr.value += "context.globalAlpha = 0.5;\n";
				}

	// FUTURE Canvas Ready Shapes
				
				/* --------------------------------------------------------------- Прямая линия -- */

				mainWindow.getElementById('straightLine').onclick = function () {
					codeStr.value += "context.moveTo(50, 90);\ncontext.lineTo(100, 10);\ncontext.stroke();\n";
				}

				/* --------------------------------------------------------------- Круг -- */

				mainWindow.getElementById('round').onclick = function () {
					codeStr.value += "context.arc(centerX, centerY, radius, 0, 2*Math.PI);\n";
				}

				/* --------------------------------------------------------------- Прямоугольник -- */

				mainWindow.getElementById('fillRect').onclick = function () {
					codeStr.value += "context.fillRect(100,40,100,200);\n";
				}

				/* --------------------------------------------------------------- Залить прямоугольник -- */

				mainWindow.getElementById('strokeRect').onclick = function () {
					codeStr.value += "context.strokeRect(100,40,100,200);\n";
				}

				/* --------------------------------------------------------------- Цвет тени -- */

				mainWindow.getElementById('shadowColor').onclick = function () {
					codeStr.value += "context.shadowColor = 'red';\n";
				}

				/* --------------------------------------------------------------- Размытие тени -- */

				mainWindow.getElementById('shadowBlur').onclick = function () {
					codeStr.value += "context.shadowBlur = 20;\n";
				}

				/* --------------------------------------------------------------- Расположение -- */

				mainWindow.getElementById('shadowPosition').onclick = function () {
					codeStr.value += "context.shadowOffsetX = 10;\ncontext.shadowOffsetY = 10;\n";
				}

	// FUTURE Canvas Градиенты

				/* --------------------------------------------------------------- Создать градиент -- */

				mainWindow.getElementById('createGradient').onclick = function () {
					codeStr.value = "var gradient = context.createLinearGradient(0, 0, 100, 0);\n";
				}

				/* --------------------------------------------------------------- Добавить цвет -- */

				mainWindow.getElementById('addColor').onclick = function () {
					codeStr.value += "gradient.addColorStop(0, 'magenta');\n";
				}	

				/* --------------------------------------------------------------- Залить градиентом -- */

				mainWindow.getElementById('fillGradient').onclick = function () {
					codeStr.value += "context.fillStyle = gradient;\n";
				}
				
				/* --------------------------------------------------------------- Готовые градиенты -- */

				/* --------------------------------------------------------------- Двухцветный линейный -- */

				mainWindow.getElementById('linear2').onclick = function () {
					codeStr.value += 'var gradient = context.createLinearGradient(10, 0, 100, 0);';
					codeStr.value += '\ngradient.addColorStop(0, "magenta");';
					codeStr.value += '\ngradient.addColorStop(1, "yellow");';

					codeStr.value += '\ncontext.fillStyle = gradient;';
					codeStr.value += '\ncontext.fill();';
				}		

				/* --------------------------------------------------------------- Двухцветный радиальный -- */

				mainWindow.getElementById('radial2').onclick = function () {
					
					codeStr.value 
						+= 'var gradient = gradient = context.createRadialGradient(180, 100, 10, 180, 100, 50);';
					codeStr.value 
						+= '\ngradient.addColorStop(0, "magenta");';
					codeStr.value 
						+= '\ngradient.addColorStop(1, "yellow");';

					codeStr.value += '\ncontext.fillStyle = gradient;';
					codeStr.value += '\ncontext.fill();';
				}

				/* --------------------------------------------------------------- Многоцветный линейный -- */

				mainWindow.getElementById('linearMany').onclick = function () {
					codeStr.value += 'var gradient = context.createLinearGradient(10, 0, 100, 0);';
					codeStr.value += '\ngradient.addColorStop("0","magenta");';
					codeStr.value += '\ngradient.addColorStop(".25","blue");';
					codeStr.value += '\ngradient.addColorStop(".50","green");';
					codeStr.value += '\ngradient.addColorStop(".75","yellow");';
					codeStr.value += '\ngradient.addColorStop("1.0","red");';

					codeStr.value += '\ncontext.fillStyle = gradient;';
					codeStr.value += '\ncontext.fill();';
				}

				/* --------------------------------------------------------------- Многоцветный радиальный -- */

				mainWindow.getElementById('radialMany').onclick = function () {
					codeStr.value += 'var gradient =  context.createRadialGradient(180, 250, 10, 180, 250, 50);';
					codeStr.value += '\ngradient.addColorStop("0","magenta");';
					codeStr.value += '\ngradient.addColorStop(".25","blue");';
					codeStr.value += '\ngradient.addColorStop(".50","green");';
					codeStr.value += '\ngradient.addColorStop(".75","yellow");';
					codeStr.value += '\ngradient.addColorStop("1.0","red");';

					codeStr.value += '\ncontext.fillStyle = gradient;';
					codeStr.value += '\ncontext.fill();';
				}	

	// FUTURE Canvas Images

				/* --------------------------------------------------------------- Выбрать картинку -- */
			

				// Можно URL
				var canvasImage = new Image(); 							// Картинка для экспериментов

				mainWindow.getElementById('selectPicture').onclick = function () {
					codeStr.value += "img.src='../../img/ok.png';\n";
				}

				/* --------------------------------------------------------------- Загрузить картинку -- */

				// Выбрать и загрузить отдельно, чтобы картинка успела загрузиться, после того, как она получит src

				mainWindow.getElementById('insertPicture').onclick = function () {
					codeStr.value = "context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);\n";
				}

				/* ---------------------------------------------------- Заполнить холст выбранными картинками -- */

				mainWindow.getElementById('fillCanvas').onclick = function () {

					codeStr.value = "context.drawImage(img, 250, 30);";
					codeStr.value += '\nvar pattern = context.createPattern(img, "repeat");';
					codeStr.value += "\ncontext.fillStyle = pattern;";
					codeStr.value += "\ncontext.rect(0, 0, canvas.width, canvas.height);";
					codeStr.value += "\ncontext.fill();";
				}
		
				/* --------------------------------------------------------------- Сохранить картинку как файл -- */

				mainWindow.getElementById('saveCanvas').onclick = function () {

					// Находим элемент <img>
					var imageCopy = 
						document.getElementById('contentFrame').contentDocument.getElementById('savedImageCopy');
					var imageContainer = 
						document.getElementById('contentFrame').contentDocument.getElementById('savedCopyContainer');

					// Отображаем данные холста в элементе <img>
					imageCopy.src = canvas.toDataURL();

					// Показываем элемент <div>, делая изображение видимым
					// делая изображение видимым
					imageContainer.style.display = "block";

					// FIXME Don't working
					context.save();
				}
				
	// FUTURE Canvas Random Circles
		
				/* --------------------------------------------------------------- Случайный круг -- */
		
				// TODO Добавмть прямоугольники, квадраты, треугольники ...

				// Создадим себе объект Circle для создания случайных кругов
				function Circle(x, y, radius, color) {

					this.x = x;															// Координаты
					this.y = y;															// Координаты
					this.radius = radius;
					this.color = color;
					this.isSelected = false;
				}

				// Кружки будем хранить в массиве, чтобы к ним удобно обращаться
				var circles = [];
				
				// Жмем на кнопку - создаем случайный круг
				mainWindow.getElementById('randomRound').onclick = function () {					
					
					// Вешаем события здесь, чтобы они имелм доступ к функциям
					canvas.onclick = canvasClick;
					canvas.onmousedown = canvasClick;   
					canvas.ondblclick = stopDragging;
					canvas.onmousemove = dragCircle;
			
					// Создаем объект Java Script
					
					// Генерируем произвольные числа в заданном диапазоне
					function randomFromTo(from, to) {
						return Math.floor(Math.random() * (to - from + 1) + from);
					}

					// Устанавливаем произвольный размер и позицию круга
					var radius = randomFromTo(10, 60);
					var x = randomFromTo(0, canvas.width);
					var y = randomFromTo(0, canvas.height);

					// Окрашиваем круг произвольным цветом
					var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
					var color = colors[randomFromTo(0, 8)];

					// Создаем новый круг
					var circle = new Circle(x, y, radius, color);

					// Сохраняем его в массиве
					circles.push(circle);

					// Обновляем отображение круга
					drawCircles();
					
					// Рисуем круг на холсте
					function drawCircles() {
						
						// Очистить холст
						context.clearRect(0, 0, canvas.width, canvas.height);

						// Перебираем круги в массиве
						for(var i=0; i < circles.length; i++) {
							var circle = circles[i];

							// Рисуем текущий круг
							context.globalAlpha = 0.65;
							context.beginPath();
							context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
							context.fillStyle = circle.color;
							context.strokeStyle = "black";

							// Выделяем выбранный круг рамкой (потребуется позже)
							if (circle.isSelected) {
								context.lineWidth = 5;
							}
							else {
								context.lineWidth = 1;
							}
							
							// Запоминаем цвет и рамку в контекст
							context.fill();
							context.stroke(); 
						}
					}
		
					var previousSelectedCircle;
					
					// Кликаем на кружок
					function canvasClick(e) {
						
						// FIXME Попробовать сделать Canvas резиновым (e.clientX)
						
						// Получаем координаты клика
						var clickX = e.pageX - canvas.offsetLeft;
						var clickY = e.pageY - canvas.offsetTop;

						// Проверяем, щелкнули ли no кругу
						for(var i=circles.length-1; i>=0; i--) {
							var circle = circles[i];

							// С помощью теоремы Пифагора вычисляем расстояние от 
							// точки, в которой щелкнули, до центра текущего круга
							var distanceFromCenter = 
								Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));

							// Определяем, находится ли точка, в которой щелкнули, в данном круге
							if (distanceFromCenter <= circle.radius) {
								
								// Сбрасываем предыдущий выбранный круг	
								if (previousSelectedCircle != null) {
									previousSelectedCircle.isSelected = false;
								}
								
								previousSelectedCircle = circle;

								// Устанавливаем новый выбранный круг и обновляем холст
								circle.isSelected = true;
								drawCircles();

								isDragging = true;
								// Прекращаем проверку
								return;
							}
						}
					}
			
					var isDragging = false;

					function dragCircle(e) {
						
						// Проверка возможности перетаскивания
						if (isDragging === true) {
							
							// Проверка попадания
							if (previousSelectedCircle !== null) {
								
								// Сохраняем позицию мыши
								var x = e.pageX - canvas.offsetLeft;
								var y = e.pageY - canvas.offsetTop;

								// Перемещаем круг в новую позицию
								previousSelectedCircle.x = x;
								previousSelectedCircle.y = y;

								// Обновляем холст
								drawCircles();
							}
						}
					}			
		
					function stopDragging() {
						isDragging = false;
					}
			
				}
			}
			
	// FUTURE Canvas Drawing with mouse

			// Подключим требуемые для рисования события
			canvas.onmousedown = startDrawing;
			canvas.onmouseup = stopDrawing;
			canvas.onmouseout = stopDrawing;
			canvas.onmousemove = draw;

			var isDrawing = false;

			function startDrawing(e) {

				// Без var!!!
				isDrawing = true;													
				context.beginPath();
				
				// Нажатием левой кнопки мыши помещаем "кисть" на холст
				context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
			}

			function draw(e) {

				if (isDrawing === true) {

					// Определяем текущие координаты указателя мыши относительно документа
					// clientX/clientY определило бы координаты относительно окна
					
					// FIXME Попробовать сделать Canvas резиновым (e.clientX)
					
					var x = e.pageX - canvas.offsetLeft;
					var y = e.pageY - canvas.offsetTop;

					// Рисуем линию до новой координаты
					context.lineTo(x, y);
					context.stroke();
				}
			}

			// Вызывается на onmouseup и onmousedown
			function stopDrawing() {				
				isDrawing = false;
			}

		
		} // FUTURE CANVAS IN FRAME END
	
/* 
* ********************************************************* Java Script Валидация формы для регистрации **
*/
	
	// FUTURE FORM VALIDATE START
		
		// Если формы открыты в браузере или во фрейме (интерпретатор ругает нечитаемые события)
		else if(document.location.pathname === "/doc/html5/frameset.html"
		   || document.location.pathname === "/doc/html5/html5-forms.html") {

			var registrationForm = document.querySelector('form[name="registrationForm"]'),
				name = document.querySelector('input[name="nameField"]'),		
				tel = document.querySelector('input[name="phoneField"]'),		
				email = document.querySelector('input[name="emailField"]'),
				progress = document.querySelector('progress[name="progressField"]');

			var count = 0;										// Счетчик правильных/ неправильных ответов

	// FUTURES Стилизация заполненных полей

			// Показываем некорректно заполненное поле
			function showValid(element) {		
				element.style.border = '2px dashed green';		
			};

			// Показываем корректно заполненное поле 
			function showInvalid(element) {
				element.style.border = '2px dashed red';	
			};

			// Обновляем значение progress
			function updateFormProgress(count) {
				progress.value = Math.floor((100 / 70) * count);
			}

	// FUTURES Общая функция проверки полей -- */

			/* Проверяем корректность заполнения полей */
			function checkField(element, regexp, errorMessage) {

				var value = element.value;

				/* Совпадение с регулярным выражением */
				if (regexp.test(value)) {					
					showValid(element);

					// Инкрементируем счетчик правильных ответов
					count++;			
					// Обновляем значение progres
					updateFormProgress(count);

				} else {
					showInvalid(element);
				}
			}

	// FUTURES Проверяем поля по отдельности

		/* --------------------------------------------------------------- Проверяем корректность заполнения имени */
			
			// FIXME Я не показала сообщения об ошибках
			// FIXME У меня не получилось вынести ErrorMessage, element и Regexp в отдельные переменные, 
			// чтобы проверять их в одной функции
			
			function validName() {

				var element = this,
					errMessage = 'Имя задано неверно';

				// Пропускаем только латинские или русские буквы и пробел между первым и вторым словом 
				// (если второе слово есть). Оба слова могут начинаться с большой буквы
				var regexp = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/;

				// Запускаем проверку
				checkField(element, regexp, errMessage);
			};

		/* --------------------------------------------------------------- Проверяем корректность введенного телефона */

			function validTel() {

				var element = this,
					errorMessage = 'Номер задан неправильно';

				//Пропускаем номер строго в формате (012) 345-67-89
				var regexp = /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;

				// Запускаем проверку 
				checkField(element, regexp, errorMessage);
			};

			function validEmail() {

				var element = this,
					errorMessage = 'Email задан неправильно';

				// Пропускаем до 15 символов a-z0-9_- перед собачкой, 
				// Также это может быть до 4 слов, разделенных точками. 
				// Затем собачка и имя домена (1 - 15 символов). 
				// Затем доменная зона - от 2 до 6 латинских букв
				var regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/; 		

				// Запускаем проверку 
				checkField(element, regexp, errorMessage);
			};

		/* --------------------------------------------------------------- Вешаем обработчики на проверяемые поля -- */

			/* Вешаем обработчики */
			if(name) name.onchange = validName;
			if(tel) tel.onchange = validTel;
			if(email) email.onchange = validEmail;
		} 																			// FUTURE FORM VALIDATE END
	
	/* 
	* ********************************************************* Java Script Media **
	*/
	
	// FUTURE MEDIA

		else if(document.location.pathname === "/doc/html5/frameset.html"
		   || document.location.pathname === "/doc/html5/html5-media.html") {

		/* --------------------------------------------------------------- Находим HTML5-плейер -- */

			var html5Video = document.querySelector('video');

		/* --------------------------------------------------------------- Находим HTML5-кнопки -- */

			var playButton = document.getElementById('play');
			var pauseButton = document.getElementById('pause');
			var stopButton = document.getElementById('stop');
			var muteButton = document.getElementById('mute');
			var fasterButton = document.getElementById('faster');
			var slowerButton = document.getElementById('slower');
			var nsButton = document.getElementById('normalSpeed');	
			var volumeText = document.getElementById('volumeText');

			var videoProgress = document.getElementById('videoProgress');

		/* --------------------------------------------------------------- Вешаем обработчики -- */

			playButton.addEventListener('click', play);
			pauseButton.addEventListener('click', pause);
			stopButton.addEventListener('click', stop);
			muteButton.addEventListener('click', muteOrUnmute);
			fasterButton.addEventListener('click', speedUp);
			slowerButton.addEventListener('click', slowDown);
			nsButton.addEventListener('click', normalSpeed);
			volumeCtrl.addEventListener('change', updateVolume);


			html5Video.addEventListener('timeupdate', updateVideoProgress);

		/* --------------------------------------------------------------- Определяем функции -- */

			function play() {
				html5Video.play();
			}

			function pause() {
				html5Video.pause();
			}

			function stop() {
				html5Video.pause();
				html5Video.currentTime = 0;
			}

			html5Video.volumechange = function(e) {
				// Звук вкл/ выкл
				muteButton.value = html5Video.muted ? 'Muted' : 'Unmuted';
				// Громче/ тише
				volumeCtrl.value = html5Video.volume;
			}

			function muteOrUnmute() {
				html5Video.muted = !html5Video.muted;
			}

			function updateVolume() {
				
				// FIXME Volume Text выводится с дикими 8-ю цифрами после запятой				
				html5Video.volume = volumeCtrl.value;
				volumeText.value = volumeCtrl.value;
			}

			function speedUp() {
				html5Video.play();
				html5Video.playbackRate += 0.5;
			}

			function slowDown() {
				html5Video.play();
				html5Video.playbackRate -= 0.5;
			}

			function normalSpeed() {
				html5Video.play();
				html5Video.playbackRate = 1;
			}

			function updateVideoProgress() {
				videoProgress.value = html5Video.currentTime / html5Video.duration * 100;
			}
		}
	};

	/* 
	* ********************************************************* jQuery **
	*/	

	$(document).ready(function (e) {

	// FUTURE JQUERY
		
	// FUTURES Frame Operate Buttons

		$('#runButton').click(function () {
			var code = '';
			code = window.parent.$('#codeString').val();
			eval('window.parent.' + code);
		});

		$('#reloadButton').click(function () {
			var code = $('#codeString').val();
			window.parent.location.reload();
		});

	});

/*
/* ********************************************************************************************* Polifills
*/

// Полифиллы определены внизу, чтобы успели загрузиться файлы скриптов

// FUTURES POLIFILLS

// FUTURES MODERNIZR

Modernizr.load([
	
	// FUTURES HTML5 Details/ Summary Support
	{	
		// Тестим summary в браузере
		test: Modernizr.summary,

		// Если поддержки нет, то ищем полифилл здесь
		nope : ['../../js/vendor/logifill-details-min.js']
	} 
]);