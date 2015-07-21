// FIXME Исправить JSLint
// TODO Подогнать размер автоматических фигур, градиентов и пр. под реальные размеры холста

/* 
* ********************************************************************************************************
* ***************************************************************************************** JAVA SCRIPT **
* ********************************************************************************************************
*/	

window.onload = function() {
	
	var mainWindow = window.parent.document;							// Документ с фреймами
	var mainIFrame = mainWindow.getElementById('contentFrame');			// Фрейм
	var codeStr = mainWindow.getElementById('codeString');				// Строка для кода
	var img = new Image();												// Картинка для загрузки в Canvas	
	var timeOutId;
/* 
* ********************************************************* Java Script Canvas **
*/
	
	// FUTURE CANVAS START
		
	// FUTURE CANVAS IN BROWSER START && END
	
	// FIXME Зараза-браузер не понимает разницу между окном во фрейме и окном в браузере
	// Если Canvas открыт в браузере ...
	// Иначе интерпретатор ругается, что не может прочитать обработчики из других фреймов
	// Поскольку все кнопки во фрейме, пока что будет работать только рисование мышкой
	if(window.parent.location.pathname !== '/doc/html5/frameset.html' 
	   && window.location.pathname === '/doc/html5/html5-canvas.html') {
			
		var canvas = document.getElementById('canvasField');					// Найдем Canvas		
		var context = canvas.getContext('2d'); 									// Получим context
			
		// Устанавливаем интервал для анимированных кругов ГЛОБАЛЬНО
		setTimeout(drawSquare, 20);
			
		// Устанавливаем начальную позицию квадрата
		var squarePositionX = 300;
		var squarePositionY = 10;
			
		function drawSquare() {
				
			// Очищаем холст
			context.clearRect(0, 0, canvas.width, canvas.height);
				
			// Начинаем новый путь, чтобы сбросить предыдущие настройки
			context.beginPath();
				
			// Рисуем квадрат в текущей позиции
			context.rect(squarePositionX, squarePositionY, 100, 100);
			context.lineStyle = "#10cffc";
			context.lineWidth = 1;
			context.stroke();
			
			// Перемещаем квадрат вниз, чтобы перерисовать его в следующем кадре
			squarePositionY += 1;
				
			// Рисуем следующий кадр через 20мс до тех пор, 
			// пока мячмк не уплывет за пределы холста
			if(squarePositionY < canvas.height + 5) {
				setTimeout(drawSquare, 20);
			}
		}											// DrawSquare END
			
	}
	
/* 
* ********************************************************* Java Script Storage **
*/
	
	// FUTURE HTML5-STORAGE START
	
		if(window.parent.location.pathname !== '/doc/html5/frameset.html' 
			&& window.location.pathname === '/doc/html5/html5-storage.html') {
			
			// Получаем инпуты для ключей и значений
			var keyLocal = document.getElementById('keyLocalData');
			var dataLocal = document.getElementById('inputLocalData');
			var keySession = document.getElementById('keySessionData');
			var dataSession = document.getElementById('inputSessionData');
			
			// Получаем кнопки для сохранения
			var saveInLocal = document.getElementById('saveInLocalStorage');
			var saveInSession = document.getElementById('saveInSessionStorage');
			var saveObject = document.getElementById('saveObjectInLocal');
			
			var showLocal = document.getElementById('showLocalStorage');
			var showSession = document.getElementById('showSessionStorage');
			
			// Получаем табличку
			var localList = document.getElementById('localItemsList');
			var sessionList = document.getElementById('sessionItemsList');
			var clearLocal = document.getElementById('clearLocalStorage');
			var clearSession = document.getElementById('clearSessionStorage');
			
			var birthdayBook = document.getElementById('enterBirthday');
			birthdayBook.style.float = 'right';
			var nameField = document.getElementById('inputName');
			var birthField = document.getElementById('inputBirthDay');
			var saveBirthButton = document.getElementById('saveBirthData');
			
			var searchButton = document.getElementById('localSearchButton');
			var inputFile = document.getElementById('fileInput');
			
	// ----------------------------------------------------------------- Сохраняем данные --
			
			// Сохраняем данные в локальном хранилище
			function saveLocalData() {
				
				// Сохраняем ключ и значение в локальном хранилище
				localStorage.setItem(keyLocal.value, dataLocal.value);
			}
			
			// Сохраняем данные в сессионном хранилище
			function saveSessionData() {

				// Сохраняем ключ и значение в локальном хранилище
				sessionStorage.setItem(keySession.value, dataSession.value);
			}
	
	// ----------------------------------------------------------------- Сохраняем Дату Рождения --
			

			function showBirthday(person) {

				// Создаем div для вывода оставшейся до дня рождения даты
				var dateDiv = document.createElement('span');
				
				// Вставляем его в DOM
				birthdayBook.appendChild(dateDiv);
				
				// Опять преобразуем в объект и передадим в showPerson
				var restoredPerson = JSON.parse(localStorage.getItem(person.name));
				
				// Показываем сегодняшнюю дату
				var todayDate = new Date();
				var personDate = new Date(restoredPerson.dateOfBirth);
				
				// Создаем какую-то хрень для преобразования дат ??????
				var todayString = new Intl.DateTimeFormat("ru", {
					weekday: "long",
					year: "numeric", 
					month: "long", 
					day: "numeric"}).format(todayDate);
				
				// Преобразовываем в дату день рождения объекта
				var birthDate = new Date(personDate);
				
				// Еще раз создаем какую-то хрень для преобразования дат
				birthDate = new Intl.DateTimeFormat("ru", {
					weekday: "long",
					year: "numeric", 
					month: "long", 
					day: "numeric"}).format(birthDate);
				
				// Считаем разницу в формате Date
				var difference = personDate - todayDate;
				difference = Math.round(difference / 1000 / 60 / 60/ 24);
				
				if(difference === 0 || difference === -1) {
					var gift = document.createElement('img');
					gift.src = '../../img/gift.png';
					dateDiv.appendChild(gift);
					var textGift = document.createElement('span');
					textGift.className = 'dinamic';
					textGift.innerHTML = 'marry Christmas<br />';
					dateDiv.appendChild(textGift);
				} else {
					dateDiv.className = 'dinamic';
					// Смотрим, что получилось ...
					dateDiv.innerHTML = 
						'Сегодня ' + todayString + '<br />' + 
						'День рождения ' + restoredPerson.name + ' ' + birthDate + '<br />' +
						'Будем праздновать через ' + difference + ' дн.<br />';
				}
			}
			
			function saveBirthday() {
				
				// Создаём объект
				var person = {
					'name': 'Имя',
					'dateOfBirth': "Дата рождения"
				};
				
				// Внесем в него пользовательские данные, преобразуем в JSON и сохраним в localStorage
				person.name = nameField.value;
				person.dateOfBirth = birthField.value;
				localStorage.setItem(person.name, JSON.stringify(person));
				
				// Вызовем функцию для показа сообщения
				showBirthday(person);
			}
			
	// ----------------------------------------------------------------- Показываем данные --
			
		// Показываем данные локального хранилища			
		function showLocalItems() {
				
			// Очищаем табличку
			localList.innerHTML = "";
				
			if(localStorage.length === 0) {
				var noneItem = document.createElement('tr');
				var noneTd = document.createElement('td');
					
				noneTd.innerHTML = "You have no items in your list!";
					
				noneItem.appendChild(noneTd);
				localList.appendChild(noneItem);
			}
				
			if(localStorage.length > 0) {
				// Перебираем хранилище
				for (var i = 0; i < localStorage.length; i++) {
					
					// Присваиваем значения во временные переменные
					var key = localStorage.key(i);
					var data = localStorage.getItem(localStorage.key(i));
					
					// Создаем элементы таблички
					var newItem = document.createElement('tr');
					var tdKey = document.createElement('td');
					var tdValue = document.createElement('td');
					
					// Создаем ячейку с кнопкой для удаления
					var tdDel = document.createElement('td');					
					var del = document.createElement('input');
					del.type = 'button';
					del.value = 'Delete';
					del.style.backgroundRepeat = 'no-repeat';
					del.style.backgroundSize = 'contain';
					
					// Чуть украсим - через стили не работает
					document.getElementById('storageData').style.backgroundImage 
						= "url('http://www.subtlepatterns.com/patterns/white_leather.png')";
					del.style.backgroundImage	 
						= "url('../../img/del.png')";
					del.style.backgroundColor = 'white';
					
					// Заполняем табличку
					tdKey.innerHTML = key;
					tdValue.innerHTML = data;					
					
					// Вставляем заполненные данные в DOM
					localList.appendChild(newItem);
					newItem.appendChild(tdKey);
					newItem.appendChild(tdValue);
					tdDel.appendChild(del);
					newItem.appendChild(tdDel);	
					
					// Передаем key в обработчик (иначе - не доступен)
					del.key = key;
					// Вешаем динамический обработчик
					del.onclick = new Function('localStorage.removeItem(this.key)'); 
					
				} 		// FOR END
					
			} // IF END
				
		} // SHOW LOCAL ITEMS END
			
		// Показываем данные сессионного хранилища			
		function showSessionItems() {
			
				// Очищаем табличку
				sessionList.innerHTML = "";

				if(sessionStorage.length === 0) {
					var noneItem = document.createElement('tr');
					var noneTd = document.createElement('td');

					noneTd.innerHTML = "You have no items in temporary list!";

					noneItem.appendChild(noneTd);
					sessionList.appendChild(noneItem);
				}

				if(sessionStorage.length > 0) {
					// Перебираем хранилище
					for (var i = 0; i < sessionStorage.length; i++) {

						// Присваиваем значения во временные переменные
						var key = sessionStorage.key(i);
						var data = sessionStorage.getItem(sessionStorage.key(i));

						// Создаем элементы таблички
						var newItem = document.createElement('tr');
						var tdKey = document.createElement('td');
						var tdValue = document.createElement('td');

						// Создаем ячейку с кнопкой для удаления
						var tdDel = document.createElement('td');					
						var del = document.createElement('input');
						del.type = 'button';
						del.value = 'Delete';
						del.style.backgroundRepeat = 'no-repeat';
						del.style.backgroundSize = 'contain';

						// Чуть украсим - через стили не работает
						document.getElementById('storageData').style.backgroundImage 
							= "url('http://www.subtlepatterns.com/patterns/white_leather.png')";
						del.style.backgroundImage	 
							= "url('../../img/del.png')";
						del.style.backgroundColor = 'white';


						// Заполняем табличку
						tdKey.innerHTML = key;
						tdValue.innerHTML = data;


						// Вставляем заполненные данные в DOM
						sessionList.appendChild(newItem);
						newItem.appendChild(tdKey);
						newItem.appendChild(tdValue);
						tdDel.appendChild(del);
						newItem.appendChild(tdDel);	

						// Передаем key в обработчик (иначе - не доступен)
						del.key = key;
						// Вешаем динамический обработчик
						del.onclick = new Function('sessionStorage.removeItem(this.key)'); 
						
					} // FOR END
					
				} 							// IF END
			
		} 								// SHOW SESSION ITEMS() END
			
		// Очистить локальное хранилище
			
		function clearLocalStorage() {
				localStorage.clear();
			}
			
		// Очистить сессионное хранилище
			
		function clearSessionStorage() {
				sessionStorage.clear();
			}
			
		// Сработает только если сразу после события открыть другую страницу того же сайта!!!!!!!!
		// В качестве измененного ключа видит Modernizer))))
		// Сплошной глюк ...
		function storageChanged(event) {
				alert('URL: ' + event.url + '\n' +
					  'KEY: ' + event.key + '\n' + 
					  'OLD VALUE: ' + event.oldValue + '\n' + 
					  'NEW VALUE: ' + event.newValue + '\n' +
					  'STORAGE AREA: ' + event.storageArea + '\n');
			}
			
		// Функция поиска
		function searchData() {
				
				// Переменные для хранилища, поиска и результата
				var searchField;
				var searchResult;
				var searchKey;
				
				// Если в локальном хранилище что-то есть ...
				if(keyLocal.value !== '') { 
					
					// Объявляем локальное хранилище
					searchField = window.localStorage; 
					// Переменную для искомую строку
					searchKey = keyLocal.value;
					// Переменную для результата
					searchResult = dataLocal;
					console.log(searchField + ' ' + searchKey);
				}
				
				// Если в сессионном хранилище что-то есть ...
				if(keySession.value !== '') { 
					
					// Объявляем сессионное хранилище
					searchField = window.sessionStorage; 
					searchKey = keySession.value;
					searchResult = dataSession;
					console.log(searchField + ' ' + searchKey);
				}
				
				// Перебираем локальное или сессионное хранилище
				for(var i = 0; i < searchField.length; i++) {
					
					// Если значение найдено
					if(searchField.key(i) === searchKey) {
						
						// Если найден JSON объект
						if(searchField.getItem(searchKey).substr(0,1) == '{') {
							
							// Очищаем поле
							keyLocal.value = '';							
							// То ключ заносим в инпут для имени
							nameField.value = searchKey;
							
							// Преобразуем найденное значение в JSON,
							// чтобы выцепить оттуда строчку с датой 
							// (регуляркой - очень лень)
							var obj = JSON.parse(searchField.getItem(nameField.value));
							// Выковыриваем дату из JSON-объекта
							var d = new Date(JSON.stringify(obj.dateOfBirth));
							
							// Приводим ее к формату, который переварит input type='date'
							var year = d.getFullYear();
							var month = d.getMonth();
							month = parseInt(month);
							month++;
							// type='date' не понимает день и месяц без нолика
							if(month <= 9) { month = '0' + month; }
							var day = d.getDate();
							if(day <= 9) { day = '0' + day; }
							// Склеиваем в кучу полученные значения и показываем их
							birthField.value = year + '-' + month + '-' + day;
						}
						// Для не JSON-объектов все намного проще
						else {
							searchResult.value = searchField.getItem(searchKey);
						}
					} 							// IF END
					
				} 																			// FOR END
			} 									// SEARCH DATA() END
			

/* 
* ********************************************************* Java Script FileAPI **
*/
		var dropBox = document.getElementById('dropBox');
		
		function ignoreDrag(e) {
				
			// Обеспечиваем, чтобы никто другой не получил это событие, 
			// т.к. мы выполняем операцию перетаскивания
			e.stopPropagation();
			e.preventDefault();
		}
			
		function drop(e) {
			
			// Аннулируем это событие для всех других
			e.stopPropagation();
			e.preventDefault();

			// Получаем перемещенные файлы
			var data = e.dataTransfer;
			var files = data.files;

			// Передаем полученный файл функции для обработки файлов
			processFiles(files);
			
		}
			
		function processFiles(files) {
			var file = files[0];

			var reader = new FileReader();

			reader.onload = function (e) {
				// Используем URL изображения для заполнения фона
				dropBox.style.backgroundImage = "url('" + e.target.result + "')";
			};

			// Начинаем считывать изображение
			reader.readAsDataURL(file);
			
		}
			
		// Вешаем обработчики
		window.onstorage = storageChanged;
		saveInLocal.onclick = saveLocalData;
		saveInSession.onclick = saveSessionData;
		showLocal.onclick = showLocalItems;
		showSession.onclick = showSessionItems;
		clearLocal.onclick = clearLocalStorage;
		clearSession.onclick = clearSessionStorage;
		saveBirthButton.onclick = saveBirthday;
		searchButton.onclick = searchData;
		inputFile.onchange =  processFiles;
		dropBox.ondragenter = ignoreDrag;
		dropBox.ondragover = ignoreDrag;
		dropBox.ondrop = drop;
			
	} // Canvas no Frame END
	
	// FUTURE CANVAS IN BROWSER START && END
	// FUTURE CANVAS IN FRAME START						
		
		if(window.parent.location.pathname === '/doc/html5/frameset.html' 
		   && window.location.pathname === '/doc/html5/html5-canvas.html') {
			
			// Если в браузере фрейм
			if(window.parent.location.pathname === '/doc/html5/frameset.html') {
			
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
					var imageCopy = mainIFrame.contentDocument.getElementById('savedImageCopy');
					
					// Отображаем данные холста в элементе <img>
					imageCopy.src = canvas.toDataURL();
					
					var imageContainer = mainIFrame.contentDocument.getElementById('savedCopyContainer');

					// Показываем элемент <div>, делая изображение видимым
					// делая изображение видимым
					imageCopy.style.display = 'inline-block';
					imageContainer.style.display = 'block';

					// FIXME Don't working
					context.save();
				}						// saveCanvas																		
				
	// FUTURE Canvas Random Circles
		
				/* --------------------------------------------------------------- Случайный круг -- */
		
				// TODO Добавмть прямоугольники, квадраты, треугольники ...

				// Создадим себе объект Circle для создания случайных кругов
				function Circle(x, y, dx, dy, radius, color, borderColor) {

					this.x = x;															// Координаты
					this.y = y;															// Координаты
					this.dx = dx;										// Скорость изменения абсциссы
					this.dy = dy;										// Скорость изменения ординаты
					this.radius = radius;
					this.color = color;
					this.borderColor = borderColor;
					this.isSelected = false;
				} 																							// Circle()

				// Кружки будем хранить в массиве, чтобы к ним удобно обращаться
				var circles = [];
				
				// Жмем на кнопку - создаем случайный круг
				mainWindow.getElementById('randomRound').onclick = function () { 							// Случайный круг
					
					// Вешаем события здесь, чтобы они имелм доступ к функциям
					canvas.onmouseclick = canvasClick;
					canvas.onmouseup = canvasClick;
					canvas.onmousedown = stopDragging;
					canvas.onmousemove = dragCircle;
					
					// Генерируем произвольные числа в заданном диапазоне
					function randomFromTo(from, to) {
						return Math.floor(Math.random() * (to - from + 1) + from);
					}

					// Устанавливаем произвольный размер и позицию круга
					var randomRadius = randomFromTo(10, 60);
					var inputValue = parseFloat(mainWindow.getElementById('ballSize').value);
					var radius = (inputValue === 15)
						? randomRadius
						: inputValue;
					var x = randomFromTo(0, canvas.width);
					var y = randomFromTo(0, canvas.height);
					var dx = randomFromTo(0.1, 0.9);
					var dy = randomFromTo(0.1, 0.9);
					
					// Окрашиваем круг произвольным цветом
					var colors = [
						'red', 'green', 'blue', 'yellow', 'orange', 'rosybrown', 'magenta', 'brown', 'purple', 'pink', 
						'coral', 'indianred', 'lime', 'seagreen', 'teal', 'cadetblue', 'steelblue', 'slategray', 
						'blueviolet', 'crimson'					
					];
					
					var color = colors[randomFromTo(0, 20)];
					var borderColor = colors[randomFromTo(0, 20)];

					// Создаем новый круг
					var circle = new Circle(x, y, dx, dy, radius, color, borderColor);

					// Сохраняем его в массиве
					circles.push(circle);

					// Обновляем отображение круга
					drawCircles();
					
					// Рисуем круг на холсте
					function drawCircles() {
						
						// Очистить холст
						context.clearRect(0, 0, canvas.width, canvas.height);

						// Перебираем круги в массиве
						for(var i = 0; i < circles.length; i++) {
							
							var circle = circles[i];

							// Рисуем текущий круг
							context.globalAlpha = 0.65;
							context.beginPath();
							context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
							context.fillStyle = circle.color;
							context.strokeStyle = circle.borderColor;

							// Выделяем выбранный круг рамкой, чтобы показать выделение
							if (circle.isSelected) {
								context.lineWidth = 7;
							}
							else {
								context.lineWidth = 3;
							}
							
							// Запоминаем цвет и рамку в контекст
							context.fill();
							context.stroke(); 
						} 																					// for
					}																						// drawCircles
					
					var previousSelectedCircle;
					
					// Добавляем звук на клик
					var clickSound = new Audio('../../media/popup.mp3');

					// Кликаем на кружок
					function canvasClick(e) {

						// FIXME Попробовать сделать Canvas резиновым (e.clientX)
						
						// Получаем координаты клика
						var clickX = e.pageX - canvas.offsetLeft;
						var clickY = e.pageY - canvas.offsetTop;

						// Проверяем, щелкнули ли no кругу
						for(var i = circles.length - 1; i >= 0; i--) {
							var circle = circles[i];

							// С помощью теоремы Пифагора вычисляем расстояние от 
							// точки, в которой щелкнули, до центра текущего круга
							var distanceFromCenter = 
								Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));

							// Определяем, находится ли точка, в которой щелкнули, в данном круге
							if (distanceFromCenter <= circle.radius) {
								
								// Сбрасываем предыдущий выбранный круг	и останавливаем анимацию
								if (previousSelectedCircle != null) {
									previousSelectedCircle.isSelected = false;
									clearTimeout(timeOutId);
								}
								
								previousSelectedCircle = circle;

								// Устанавливаем новый выбранный круг и обновляем холст
								circle.isSelected = true;
								drawCircles();

								isDragging = true;
								
								clickSound.play();
								// Прекращаем анимацию
								clearTimeout(timeOutId);
							}
						} 																					// if
					} 																						// canvasClick(e)
			
					var isDragging = false;

					function dragCircle(e) {
						
						// Проверка возможности перетаскивания
						if (isDragging === true) {
							
							// Прекращаем анимацию
							clearTimeout(timeOutId);
							
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
					} 																						// dragCircle()	
		
					function stopDragging() {
						isDragging = false;
					}			
				}																							// randomRound	
				
	// FUTURE Canvas Animate Round
				
				mainWindow.getElementById('animateRound').onclick = function fallBalls () {

					// Очистить холст
					context.clearRect(0, 0, canvas.width, canvas.height);					
					
					// Перебираем все мячики
					for(var i = 0; i < circles.length; i++) {						

						// Перемещаем каждый мячик в его новую позицию
						var circle = circles[i];
						circle.x += circle.dx;
						circle.y += circle.dy;

						// Добавляем эффект "гравитации", который ускоряет падение мячика
						if ((circle.y) < canvas.height) circle.dy += 0.22;

						// Добавляем эффект "трения", который замедляет движение мячика
						circle.dx = circle.dx * 0.998;

						// Если мячик натолкнулся на край холста, отбиваем его
						if ((circle.x + circle.radius > canvas.width) || (circle.x - circle.radius < 0)) {
							circle.dx = -circle.dx;
						}

						// Если мячик упал вниз, отбиваем его, но слегка уменьшаем скорость
						if ((circle.y + circle.radius > canvas.height) || (circle.y - circle.radius < 0)) { 
							circle.dy = -circle.dy * 0.6; 
						}
						
						// Рисуем текущий круг
						context.globalAlpha = 0.65;
						context.beginPath();
						context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
						context.fillStyle = circle.color;
						context.strokeStyle = circle.borderColor;
						
						// Выделяем выбранный круг рамкой
						if (circle.isSelected) {
							context.lineWidth = 7;
						}
						else {
							context.lineWidth = 3;
						}
							
						// Запоминаем цвет и рамку в контекст
						context.fill();
						context.stroke(); 
					}
					
					// Снова запускаем анимацию
					timeOutId = setTimeout(fallBalls, 20);					
				}
				
				/* --------------------------------------------------------------- Очистить холст -- */

				mainWindow.getElementById('clearCanvas').onclick = function () {
					
					// Все-все чистим
					clearTimeout(timeOutId);
					circles = [];
					codeStr.value += "context.clearRect(0, 0, canvas.width, canvas.height);\n";
					
					// События для рисования куда-то делись - подключаем их еще раз
					canvas.ondblclick = startDrawing;
					canvas.onmouseup = stopDrawing;
					canvas.onmousemove = draw;			
				}

				
			} 																						// Если в браузере фрейм
			
	// FUTURE Canvas Drawing with mouse
			
			var isDrawing = false;
			
			function startDrawing(e) {

				// Без var!!!
				isDrawing = true;													
				context.beginPath();

				// Нажатием левой кнопки мыши помещаем "кисть" на холст
				context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
			} 																							// StartDrawing end
			
			// Собственно рисование				
			function draw(e) {
				
				if (isDrawing === true) {

					// FIXME Попробовать сделать Canvas резиновым (e.clientX)
						
					// Определяем текущие координаты указателя мыши относительно документа
					// clientX/clientY определило бы координаты относительно окна???????????
					var x = e.pageX - canvas.offsetLeft;
					var y = e.pageY - canvas.offsetTop;

					// Рисуем линию до новой координаты
					context.lineTo(x, y);
					context.stroke();
				}
			} 																									// Draw end

			// Вызывается на onmouseup и onmousedown
			function stopDrawing() {				
				isDrawing = false;
			} 																								// stopDrawing()

			// Подключим требуемые для рисования события
			canvas.ondblclick = startDrawing;
			canvas.onmouseup = stopDrawing;
			canvas.onmousemove = draw;			
		
		};																			// FUTURE Canvas/ Canvas in IN FRAME END
/* 
* ********************************************************* Java Script Валидация формы для регистрации **
*/
	
		// FUTURE FORM VALIDATE START
		
		// Если формы открыты в браузере или во фрейме (интерпретатор ругает нечитаемые события)
		if(window.parent.location.pathname !== "/doc/html5/frameset.html" 
	   		&& window.location.pathname === "/doc/html5/html5-forms.html") {

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

		if(window.parent.location.pathname !== "/doc/html5/frameset.html" 
	   		&& window.location.pathname === "/doc/html5/html5-media.html") {

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

/* 
* ********************************************************************************************************
* ********************************************************************************************** JQUERY **
* ********************************************************************************************************
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
}																	// Windows.onload

Modernizr.load([
	
	// FUTURES HTML5 Details/ Summary Support
	{	
		// Тестим summary в браузере
		test: Modernizr.summary,

		// Если поддержки нет, то ищем полифилл здесь
		nope : ['../../js/vendor/logifill-details-min.js']
	} 
]); 