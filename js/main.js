/*jshint es5: true, evil: true*/

/**
 * @author aLLenka
 * @copyright Можно все :)
 * @version Будем считать, что 0.0.0, так как проект еще ни разу не был готов
 */

// FIXME Попытаться исправить JSLint
// TODO Подогнать размер автоматических фигур, градиентов и пр. под реальные размеры холста

/*
 * ********************************************************************************************************
 * ***************************************************************************************** JAVA SCRIPT **
 * ********************************************************************************************************
 */
// BOOKMARK Window.onload

/**
 * @callback {function} Anonimous
 * @listens {object} window
 * @event HTML/Frame objects:onload
 *
 * @summary Весь JS-код начнет выполняться после полной загрузки документа
 */
window.onload = (function() {

	/** @type {object} --------- Главное окно с фреймами в браузере */
	var mainWindow = window.parent.document;
	/** @type {object} --------- Фрейм в главном окне */
	var mainIFrame = mainWindow.getElementById('contentFrame');

	/** @type {HTML-Element} -- <textarea> дает возможность пользователю отредактировать JS-код перед выполнением */
	var codeStr = mainWindow.getElementById('codeString');
	/** @type {object} ------- JS-объект для манипуляций с картинкой в которую можно сохранить содержимое Canvas */
	var img = new Image();

	/** @type {function} ----- Идентификатор установки таймера для fallBalls() */
	var timeoutIDForFallBalls;
	/** @type {function} ----- Идентификатор установки таймера для drawSquare() */
	var timeoutIDForDrawSquare;

/*
* ********************************************************* Java Script Canvas **
*/

/**
 * Интерпретатор ругает отсутствие объектов из других окон,
 * поэтому при помощи if делаем что-то вроде пространства имен ...
 */
// BOOKMARK .......................................................... CANVAS

	/* Если в браузере Canvas ... */
	if(window.parent.location.pathname !== '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-canvas.html') {

// BOOKMARK DrawSquare()

		/* Находим Canvas и получаем контекст */

		/** @type {HTML-Element} ---- Найдем холст на странице */
		var canvas = document.getElementById('canvasField');
		/** @type {Object} ---------- Получим контекст */
		var context = canvas.getContext('2d');

		/* Определяем внешний вид для падающего квадрата */

		/** @type {number} ---------- Начальная X-координата падающего квадрата */
		var squarePositionX = 300;
		/** @type {number} ---------- Начальная Y-координата падающего квадрата */
		var squarePositionY = 10;
		/** @type {number} ---------- Ширина падающего квадрата */
		var squareWidth = 100;
		/** @type {number} ---------- Высота падающего квадрата */
		var squareHeight = 100;
		/** @type {string} ---------- Цвет рамки падающего квадрата */
		var squareBorderColor = 'darkslategray';
		/** @type {number} ---------- Ширина рамки падающего квадрата */
		var squareBorderWidth = 5;

		/** @type {number} ----- Средний таймаут для любой корректной анимации */
		var averageTimeout = 20;

		/**
		 * @function drawSquare
		 *
		 * @description ---- Очищаем холст
		 * ----------------- Если квадрат в пределах холста, рисуем квадрат
		 * ----------------- Если квадрат за пределами - обнуляем таймаут
		 * @summary -------- При открытии страницы в браузере появляется падающий квадрат
		 */
		var drawSquare = function() {

			/**
			 * @method clearRect объекта context
			 * @param {number} - X-координата верхнего левого угла очищаемого прямоугольника
			 * @param {number} - Y-координата верхнего левого угла очищаемого прямоугольника
			 * @param {number} - Ширина очищаемого прямоугольника (свойство width HTML-объекта canvas)
			 * @param {number} - Высота очищаемого прямоугольника (свойство height HTML-объекта canvas)
			 *
			 * @summary -------- Очищает прямоугольник с заданными координатами
			 */
			context.clearRect(0, 0, canvas.width, canvas.height);

			/**
			 * @method beginPath объекта context
			 * @summary ---------------- Сбрасывает предыдущие стили
			 */
			context.beginPath();

			/**
			 * @method rect объекта context
			 * @param {number} --- squarePositionX - X-координата верхнего левого угла прямоугольника
			 * @param {number} --- squarePositionY - Y-координата верхнего левого угла прямоугольника
			 * @param {number} --- squareWidth ----- Ширина прямоугольника
			 * @param {number} --- squareHeight ---- Высота прямоугольника
			 *
			 * @description ------ Рисует прямоугольник с заданными координатами
			 * @summary ---------- Рисуем квадрат в текущей позиции
			 */
			context.rect(squarePositionX, squarePositionY, squareWidth, squareHeight);

			/* Определяем свойства данного контекста */

			/** @property {string} объекта context - Устанавливаем цвет линии */
			context.strokeStyle = squareBorderColor;

			/** @property {number} объекта context - Устанавливаем ширину линии в пикселях */
			context.lineWidth = squareBorderWidth;

			/**
			 * @method stroke объекта context
			 * @summary ---------- Обрисовываем квадрат
			 */
			context.stroke();

			/**
			 * @type {number} - Y-координата падающего квадрата
			 * @summary ------- Перемещаем квадрат по Y-оси вниз
			 */
			squarePositionY += 1;

			/**
			 * @description -- Если текущая координата по Y-оси < высоты холста + ширина бордера квадрата ...
			 */
			if (squarePositionY < canvas.height + squareBorderWidth) {

				/**
				 * @method setTimeout
				 * @param {function} ------ drawSquare ----- рисует квадрат
				 * @param {number} -------- averageTimeout - таймаут для анимации
				 *
				 * @summary --------------- Устанавливаем таймаут для анимации
				 */
				setTimeout(drawSquare, averageTimeout);

			/* Иначе - прекращаем анимацию */
			} else {

				/**
				 * @method clearTimeout
				 * @param {function} ----- timeoutIDForDrawSquare - Идентификатор для повторяемой функции
				 *
				 * @summary -------------- Обнуляем таймаут
				 */
				clearTimeout(timeoutIDForDrawSquare);

			}

		};

// BOOKMARK DrawSquare END

		/**
		 * @callback setTimeout
		 * @param {function} ------------ drawSquare ----- Начнет рисовать падающий квадрат
		 * @param {number} -------------- averageTimeout - Количество миллисекунд до следующего запуска
		 *
		 * @summary --------------------- Первоначальная установка анимации падающего квадрата
		 */
		timeoutIDForDrawSquare = setTimeout(drawSquare, averageTimeout);
    }

/*
* ********************************************************* Java Script Storage **
*/
// BOOKMARK .......................................................... HTML5-STORAGE

	/* Если в браузере Хранилище ... */
	if (window.parent.location.pathname !== '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-storage.html') {

		/* Получаем инпуты */

		/** @type {HTML-Element} - <input> для ключа в Локальном хранилище */
		var keyLocal = document.getElementById('keyLocalData');
		/** @type {HTML-Element} - <input> для значения в Локальном хранилище */
		var dataLocal = document.getElementById('inputLocalData');
		/** @type {HTML-Element} - <input> для ключа в Сессионном хранилище */
		var keySession = document.getElementById('keySessionData');
		/** @type {HTML-Element} - <input> для значения в Сессионном хранилище */
		var dataSession = document.getElementById('inputSessionData');
		/** @type {HTML-Element} - <input> для drag'n'drop image */
		var inputFile = document.getElementById('fileInput');

		/* Получаем кнопки для манипуляций */

		/** @type {HTML-Element} - кнопка Save in Local */
		var saveInLocal = document.getElementById('saveInLocalStorage');
		/** @type {HTML-Element} - кнопка Save in Session */
		var saveInSession = document.getElementById('saveInSessionStorage');
		/** @type {HTML-Element} - кнопка Clear Local */
		var clearLocal = document.getElementById('clearLocalStorage');
		/** @type {HTML-Element} - кнопка Clear Session */
		var clearSession = document.getElementById('clearSessionStorage');
		/** @type {HTML-Element} - кнопка Save Birthday */
		var saveBirthButton = document.getElementById('saveBirthData');
		/** @type {HTML-Element} - кнопка Search In Local */
		var searchButton = document.getElementById('localSearchButton');

		/** @type {HTML-Element} - кнопка Show Local */
		var showLocal = document.getElementById('showLocalStorage');
		/** @type {HTML-Element} - кнопка Show Session */
		var showSession = document.getElementById('showSessionStorage');

		/* Получаем таблицы c данными из хранилищ */

		/** @type {HTML-Element} - таблица с данными локального хранилища */
		var localList = document.getElementById('localItemsList');
		/** @type {HTML-Element} - таблица с данными сессионного хранилища */
		var sessionList = document.getElementById('sessionItemsList');

		/** @type {HTML-Element} - fieldset для birthdayBook */
		var birthdayBook = document.getElementById('enterBirthday');
		/** @type {HTML-Element} - <input> для ввода имени */
		var nameField = document.getElementById('inputName');
		/** @type {HTML-Element} - <input> для ввода даты рождения */
		var birthField = document.getElementById('inputBirthDay');

		// ----------------------------------------------------------------- Сохраняем данные --
// BOOKMARK SaveData()

		/**
		 * @function saveLocalData
		 *
		 * @description - Сохраняет пару ключ-значение в Локальном хранилище
		 * @summary - Сохраняем данные в Локальном хранилище
		 */
		var saveLocalData = function () {

			/**
			 * @method setItem объекта localStorage
			 * @param {string} - Ключ, введенный в <input>
			 * @param {string} - Значение, введенное в <input>
			 *
			 * @description - Сохраняем пару ключ и значение в локальном хранилище
			 */
			localStorage.setItem(keyLocal.value, dataLocal.value);

		};

		/**
		 * @function saveSessionData
		 *
		 * @description - Сохраняет пару ключ-значение в Сессионном хранилище
		 * @summary - Сохраняем данные в Сессионном хранилище
		 */
		var saveSessionData = function () {

			/**
			 * @method setItem объекта sessionStorage
			 * @param {string} - Ключ, введенный в <input>
			 * @param {string} - Значение, введенное в <input>
			 *
			 * @description - Сохраняем пару ключ и значение в сессионном хранилище
			 */
			sessionStorage.setItem(keySession.value, dataSession.value);
		};

		// ----------------------------------------------------------------- Сохраняем Дату Рождения --
// BOOKMARK ShowBirthday()

		/**
		 * @function showBirthday
		 * @param {object} - объект с именем и датой рождения
		 *
		 * @description - Создаем HTML для вывода дат
		 * -------------- Считаем сколько дней осталось до дня рождения
		 * -------------- Если день рождения сегодня - дарим картинку
		 * -------------- Иначе, говорим когда праздник
		 * @summary - При сохранении объекта показывает сколько дней осталось до дня рождения
		 */
		var showBirthday = function(person) {

			/* Готовим HTML для вывода информации */

			/** @type {HTML-Element} - Создаем <span> для вsвода даты рождения */
			var dateDiv = document.createElement('span');
			/** ---------------------- Крепим созданный <span> в fieldset */
			birthdayBook.appendChild(dateDiv);

			/* Готовим объекты */

			/**
			 * @type {object} --- JS-объект восстановленный из Локального хранилища
			 *
			 * @description ----- Находим JSON-объект по полю name в Локальном хранилище
			 * ------------------ Преобразовываем его в Java Script-объект
			 * ------------------ Сохраняем в restoredPerson
			 */
			var restoredPerson = JSON.parse(localStorage.getItem(person.name));

			/* Готовим даты */

			/* @type {Date} ---- Сохраняем сегодняшнюю дату в переменную */
			var todayDate = new Date();
			/* @type {Date} ---- Сохраняем в переменную дату рождения объекта */
			var personDate = new Date(restoredPerson.dateOfBirth);

			/**
			 * @type {string} ------- Сегодняшняя дата в строковом представлении
			 * @param {Date} -------- Дата для преобразования
			 * @constructs
			 * @property {string} --- ru - локализация для преобразования
			 * @property {string} --- weekday - формат (свойство объекта Intl.DateTimeFormat)
			 * @property {string} --- year - формат (свойство объекта Intl.DateTimeFormat)
			 * @property {string} --- month - формат (свойство объекта Intl.DateTimeFormat)
			 * @property {string} --- day - формат (свойство объекта Intl.DateTimeFormat)
			 *
			 * @description --------- Oбъект Intl.DateTimeFormat конструирует строку из даты
			 */
			var todayString = new Intl.DateTimeFormat("ru", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			}).format(todayDate);

			/**
			 * @type {string} ------- День рождения объекта в строковом представлении
			 * @param {Date} -------- Дата для преобразования
			 * @constructs
			 * @property {string} --- ru - локализация для преобразования
			 * @property {string} --- weekday - формат (свойство объекта Intl.DateTimeFormat)
			 * @property {string} --- year - формат (свойство объекта Intl.DateTimeFormat)
			 * @property {string} --- month - формат (свойство объекта Intl.DateTimeFormat)
			 * @property {string} --- day - формат (свойство объекта Intl.DateTimeFormat)
			 *
			 * @description --------- Oбъект Intl.DateTimeFormat конструирует строку из даты
			 */
			var birthDate = new Intl.DateTimeFormat("ru", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			}).format(birthDate);

			/** @type {Date} ---------- Разница между сегодняшним днем и датой рождения в секундах */
			var difference = personDate - todayDate;
			/** @type {number} -------- Преобразовываем миллисекунды в дни */
			difference = Math.round(difference / 1000 / 60 / 60 / 24);

			/* Если разницы нет, или разница меньше 1 дня (24 часов) */
			if (difference === -1 || difference === 0) {

				/** @type {HTML Element} ------- Создаем картинку-подарок */
				var gift = document.createElement('img');
				/** @type {HTML Element} ------- Создаем <span> для поздравления */
				var textGift = document.createElement('span');

				/** @property {string} --------- Заносим в свойство src картинки ее физический адрес */
				gift.src = '../../img/gift.png';
				/** @type {string} ------------- Заносим в <span> текст поздравления */
				textGift.innerHTML = 'Happy Birthday<br />';
				/** @property {string} --------- Украшаем немного */
				textGift.className = 'dinamic';

				/** @method -------------------- Крепим картинку c текстом в fieldset */
				dateDiv.appendChild(gift);
				dateDiv.appendChild(textGift);

			/* Если день рождения был 2 дня назад или больше ... */
			} else if (difference < -1) {

				/* @property {string} ---------- Украшаем вывод информации по дате */
				dateDiv.className = 'dinamic';
				/* @property {string} ---------- Выводим информацию на экран */
				dateDiv.innerHTML =

					'Сегодня ' + todayString + '<br />' +
					'День рождения ' + restoredPerson.name + ' ' + birthDate + '<br />' +
					'Ваш день рождения был ' + Math.abs(difference) + ' дн. назад<br />';

			} else {

				/* @property {string} ---------- Украшаем вывод информации по дате */
				dateDiv.className = 'dinamic';
				/* @property {string} ---------- Выводим информацию на экран */
				dateDiv.innerHTML =

					'Сегодня ' + todayString + '<br />' +
					'День рождения ' + restoredPerson.name + ' ' + birthDate + '<br />' +
					'Будем праздновать через ' + difference + ' дн.<br />';

			}

		};

// BOOKMARK SaveBirthday()

		/**
		 * @function saveBirthday
		 *
		 * @description ---------- Создаем объект для хранения пары имя-дата рождения
		 * ----------------------- Сохраняем в объект данные
		 * ----------------------- Вызываем showBirthday(), чтобы подсчитать и показать сохраняемую информацию
		 * @summary -------------- Сохраняем объект в локальное хранилище
		 */
		var saveBirthday = function () {

			/**
			 * @type {object} -------- Создаём объект
			 * @property {string} ---- Имя объекта
			 * @property {Date} ------ Дата рождения
			 */
			var person = {
				'name': 'Имя',
				'dateOfBirth': "Дата рождения"
			};

			/** @property {string} --- person.name ----------- Имя сохраняемого объекта из <input> */
			person.name = nameField.value;
			/** @property {Date} ----- person.dateOfBirth ---- Дата рождения из <input> */
			person.dateOfBirth = birthField.value;
			/** @method объекта localStorage ----------------- Конвертируем в JSON и сoхраняем в Локальное хранилище */
			localStorage.setItem(person.name, JSON.stringify(person));

			/**
			 * @function showBirthday
			 * @param {object} - person - имя и дата рождения
			 *
			 * @summary ----------------- Подсчитывает даты и выводит информацию на экран
			 */
			showBirthday(person);
		};

		// ----------------------------------------------------------------- Показываем данные --
// BOOKMARK ShowLocalItems()

		/**
		 * @function showLocalItems
		 *
		 * @description ---------- Если в Локальном хранилище пустота ...
		 * ----------------------- Показываем, что здесь ничего нет
		 * ----------------------- Иначе - создаем динамическую табличку
		 * ----------------------- Циклом бежим по всем данным
		 * ----------------------- Если находим JSON-объект, то конвертируем его
		 * ----------------------- Заполняем ими табличку
		 * ----------------------- К каждой паре ключ-значение добавляем кнопку "Удалить"
		 * ----------------------- Вешаем на кнопку динамический обработчик на клик
		 * @summary -------------- Показываем в табличке содержимое локального хранилища
		 */
		var showLocalItems = function () {

			/* Очищаем табличку */
			localList.innerHTML = '';

			/* Если в Локальном хранилище пустота ... */
			if (localStorage.length === 0) {

				/* @type {HTML Element} - Создаем ряд */
				var noneItem = document.createElement('tr');
				/* @type {HTML Element} - Создаем ячейку */
				var noneTd = document.createElement('td');

				/* @property {string} ------ Пишем в нее, что все пусто */
				noneTd.innerHTML = "You have no items in your list!";
				/* @method элемента HTML --- Вставляем ячейку в ряд */
				noneItem.appendChild(noneTd);
				/* @method элемента HTML --- Вставляем ряд в пустой список */
				localList.appendChild(noneItem);

			}

			/* Если в Локальном хранилище что-то есть ... */
			if (localStorage.length > 0) {

				/* Пробегаем по всем элементам */
				for (var i = 0; i < localStorage.length; i++) {

					/* Присваиваем значения текущей пары во временные переменные */

					/** @type {string} ---------- Временная переменная для ключа */
					var key = localStorage.key(i);
					/** @type {object | string} - Временная переменная для значения (JSON-объект) */
					var data = localStorage.getItem(key);

					/* Создаем элементы таблички */

					/* @type {HTML Element} - Создаем ряд */
					var newItem = document.createElement('tr');
					/* @type {HTML Element} - Создаем ячейку для ключа */
					var tdKey = document.createElement('td');
					/* @type {HTML Element} - Создаем ячейку для значения */
					var tdValue = document.createElement('td');

					/* @type {HTML Element} - Создаем ячейку для удаления */
					var tdDel = document.createElement('td');
					/* @type {HTML Element} - Создаем кнопку для удаления */
					var del = document.createElement('input');
					/* @property {string} --- Адрес картинки для удаления */
					del.style.backgroundImage = "url('../../img/del.png')";

						del.type = 'button';
						del.value = 'Delete';
						del.style.backgroundRepeat = 'no-repeat';
						del.style.backgroundSize = 'contain';
						del.style.backgroundColor = 'white';

					/* @property {string} - Паттерн для фона таблицы */
					document.getElementById('storageData').style.backgroundImage = "url('http://www.subtlepatterns.com/patterns/white_leather.png')";

					/* Заполняем табличку */
					tdKey.innerHTML = key;
					/* Проверяем значение поля на наличие JSON-объекта */
					if (data.substr(0, 1) === '{') {

						/* Если да - то парсим */
						tdValue.innerHTML = JSON.parse(data).dateOfBirth;

					} else {
						/* Если значение - простая строка, тогда просто присваиваем */
						tdValue.innerHTML = data;
					}

					/* @method - Вставляем ряд в таблицу */
					localList.appendChild(newItem);
					/* @method - Вставляем в ряд ячейку с ключом */
					newItem.appendChild(tdKey);
					/* @method - Вставляем в ряд ячейку с датой рождения */
					newItem.appendChild(tdValue);
					/* @method - Вставляем в ячейку кнопку для удаления */
					tdDel.appendChild(del);
					/* @method - Вставляем ячейку с кнопкой в ряд */
					newItem.appendChild(tdDel);

					/* @property {string} Присваиваем key как свойство в кнопку (иначе - не доступен) */
					del.key = key;
					/**
					 * @method объекта localStorage - Удаляет данные из Локального хранилища
					 * @listens {HTML Element} ------ Кнопка Delete в таблице
					 * @event onclick:MouseEvent
					 *
					 * @description ----------------- Создаем динамический обработчик и вешаем его на кнопку удаления
					 */
					del.onclick = new Function('localStorage.removeItem(this.key)');

				} // FOR END

			} // IF END

		}; // SHOW LOCAL ITEMS END

// BOOKMARK ShowSessionItems()

		/**
		 * @function showSessionItems
		 *
		 * @description ---------- Если в Сессионном хранилище пустота ...
		 * ----------------------- Показываем, что здесь ничего нет
		 * ----------------------- Иначе - создаем динамическую табличку
		 * ----------------------- Циклом бежим по всем данным
		 * ----------------------- Заполняем ими табличку
		 * ----------------------- К каждой паре ключ-значение добавляем кнопку "Удалить"
		 * ----------------------- Вешаем на кнопку динамический обработчик на клик
		 * @summary -------------- Показываем в табличке содержимое Сессионного хранилища
		 */
		var showSessionItems = function () {

			/* Очищаем табличку */
			sessionList.innerHTML = '';

			/* Если в табличке пусто, показываем, что здесь ничего нет ... */
			if (sessionStorage.length === 0) {

				/** @type {HTML Element} ----- Создаем ряд */
				var noneItem = document.createElement('tr');
				/** @type {HTML Element} ----- Создаем ячейку */
				var noneTd = document.createElement('td');
				/** @property {HTML Element} - Пишем в нее, что здесь пусто */
				noneTd.innerHTML = "You have no items in temporary list!";
				/** @method ------------------ Клеим готовую ячейку в ряд */
				noneItem.appendChild(noneTd);
				/** @method ------------------ Клеим ряд в таблицу для хранилища сессий */
				sessionList.appendChild(noneItem);

			}

			/* Если в табличке что-то есть ... */
			if (sessionStorage.length > 0) {

				/* Циклом бежим по хранилищу ...*/
				for (var i = 0; i < sessionStorage.length; i++) {

					/* Присваиваем значения во временные переменные ... */
					/* @type {HTML Element} - Текущий ключ */
					var key = sessionStorage.key(i);
					/* @type {HTML Element} - И текущее значение */
					var data = sessionStorage.getItem(sessionStorage.key(i));

					/* Создаем табличку для показа найденных данных */
					/* @type {HTML Element} - Ряд */
					var newItem = document.createElement('tr');
					/* @type {HTML Element} - Ячейку для ключа */
					var tdKey = document.createElement('td');
					/* @type {HTML Element} - Ячейку для значения */
					var tdValue = document.createElement('td');
					/* @type {HTML Element} - Ячейку для кнопки DELETE */
					var tdDel = document.createElement('td');
					/* @type {HTML Element} - И саму кнопку DELETE */
					var del = document.createElement('input');
						del.type = 'button';
						del.value = 'Delete';
						del.style.backgroundRepeat = 'no-repeat';
						del.style.backgroundSize = 'contain';

					/* Добавим табличке фон ... */
					document.getElementById('storageData').style.backgroundImage = "url('http://www.subtlepatterns.com/patterns/white_leather.png')";
					del.style.backgroundImage = "url('../../img/del.png')";
					del.style.backgroundColor = 'white';

					/* Заполним табличку данными */

					/* @type {HTML Element} - Ключ из временной переменной */
					tdKey.innerHTML = key;
					/* @type {HTML Element} - Данные */
					tdValue.innerHTML = data;

					/* Вставляем таблицу в DOM */
					sessionList.appendChild(newItem);
					newItem.appendChild(tdKey);
					newItem.appendChild(tdValue);
					tdDel.appendChild(del);
					newItem.appendChild(tdDel);

					/* Текущий ключ в качестве свойства присваиваем в кнопку */
					del.key = key;
					/* Таким образом у нас получится повесить динамический обработчик */
					del.onclick = new Function('sessionStorage.removeItem(this.key)');

				} // FOR END

			} // IF END

		}; // SHOW SESSION ITEMS() END

		/**
		 * @function clearLocalStorage
		 * @summary Очистка Локального хранилища
		 */
		var clearLocalStorage = function () {
			localStorage.clear();
		};

		/**
		 * @function clearSessionStorage
		 * @summary Очистка Сессионного хранилища
		 */
		var clearSessionStorage = function () {
			sessionStorage.clear();
		};

// BOOKMARK Storage Event

		/**
		 * @function
		 * @iistens
		 * @event onstorage:Misc Events
		 *
		 * @description - Абсолютно бредовое событие
		 * -------------- Срабатывает (причем 2 раза) только если после изменения хранилища
		 * -------------- Открыть в браузере другую страницу того же сайта
		 * -------------- В качестве измененного ключа видит Modernizr
		 * @summary ----- Сплошной глюк ...
		 */
		var storageChanged = function (event) {
			alert('URL: ' + event.url + '\n' +
					'KEY: ' + event.key + '\n' +
					'OLD VALUE: ' + event.oldValue + '\n' +
					'NEW VALUE: ' + event.newValue + '\n' +
					'STORAGE AREA: ' + event.storageArea + '\n');
		};

// BOOKMARK SearchData()

		/**
		 * @function searchData
		 *
		 * @description - Ищет данные в локальном либо сессионном хранилище
		 * -------------- Вводим ключ для поиска в input для ключа
		 * -------------- Либо Локального, либо Сессионного хранилища
		 * -------------- В зависимости, где хотим искать (Имена и даты тоже можно)
		 * -------------- Жмем кнопку поиска - видим результат
		 * @summary - При сохранении объекта показывает сколько дней осталось до дня рождения
		 */
		var searchData = function () {

			/* Объявляем переменные здесь, чтобы были доступны из функций */

			/** @type {object} - Локальное или Сессионное хранилище */
			var searchField;
			/** @type {string} - Ключ поиска */
			var searchKey;
			/** @type {string} - Результат */
			var searchResult;

			/* Если в <input> Локального хранилища что-то есть ... */
			if (keyLocal.value !== '') {

				/** @type {object} - Значит в Локальном хранилище */
				searchField = window.localStorage;
				/* @type {string} -- Ищем по введенному в поле ключу */
				searchKey = keyLocal.value;
				/* @type {string} -- Данные, которые ему соответствуют */
				searchResult = dataLocal;

			}

			/* Если что-то есть в <input> Сесссионного хранилища ... */
			if (keySession.value !== '') {

				/** @type {object} - Значит будем искать в нем */
				searchField = window.sessionStorage;
				/* @type {string} -- Ищем по введенному в поле ключу */
				searchKey = keySession.value;
				/* @type {string} -- Данные, которые ему соответствуют */
				searchResult = dataSession;

			}

			/* Собственно поиск : Бежим по хранилищу ... */
			for (var i = 0; i < searchField.length; i++) {

				/* И просто сравниваем ключи ... */
				if (searchField.key(i) === searchKey) {

					/* Если найден JSON объект */
					if (searchField.getItem(searchKey).substr(0, 1) == '{') {

						/* @type {HTML Element} - Очищаем поле соответствующего хранилища ... */
						keyLocal.value = '';
						/* @type {HTML Element} - Заносим ключ в <input> для имени */
						nameField.value = searchKey;

						/* @type {string} - Конвертируем JSON и выдираем из него строку с датой */
						var obj = JSON.parse(searchField.getItem(nameField.value));
						/* @type {Date} --- Полученную строку превращаем в дату */
						var dtn = new Date(JSON.stringify(obj.dateOfBirth));

						/* Приводим эту дату к формату, который переварит input type='date' */
						var year = dtn.getFullYear();

						var month = dtn.getMonth();
						month = parseInt(month);
						month++;

						/* @type {number} - <input type='date' не понимает день и месяц без нолика */
						if (month <= 9) {

							/* Добавляем его для значений меньше 10 */
							month = '0' + month;
						}

						/* Аналогично с днями ... */
						var day = dtn.getDate();

						if (day <= 9) {
							day = '0' + day;
						}

						/* Теперь склеиваем в кучу полученные значения и показываем их */
						birthField.value = year + '-' + month + '-' + day;

					} else {

						/* Для не JSON-объектов все намного проще */
						searchResult.value = searchField.getItem(searchKey);

					}

				} // IF END

			} // FOR END

		}; // SEARCH DATA() END


/*
 * ********************************************************* Java Script FileAPI **
 */
// BOOKMARK .......................................................... DRAG'N'DROP

		/** @type {HTML Element} Ищем поле для вставки картинки */
		var dropBox = document.getElementById('dropBox');

		/**
		 * @function ignoreDrag
		 * @param event e:MouseEvents
		 * @listens
		 */
		var ignoreDrag = function (e) {

			/** Обеспечиваем, чтобы никто другой не получил это событие,
			 * пока мы выполняем операцию перетаскивания
			 */
			e.stopPropagation();
			e.preventDefault();

		};

		/**
		 * @function drop
		 * @param event e:MouseEvents
		 * @listens
		 */
		var drop = function (e) {

			/* Аннулируем это событие для всех других */
			e.stopPropagation();
			e.preventDefault();

			/* Получаем перемещенные файлы */
			var data = e.dataTransfer;
			var files = data.files;

			/* Передаем полученный файл функции для обработки файлов */
			processFiles(files);

		};

		/**
		 * @function processFiles
		 * @param files
		 */
		var processFiles = function (files) {

			var file = files[0];
			/* Запускаем файл-ридер */
			var reader = new FileReader();

			/**
			 * @function drop
			 * @param event e:MouseEvents
			 * @listens
			 */
			reader.onload = function(e) {

				/* Используем URL изображения для заполнения фона */
				dropBox.style.backgroundImage = "url('" + e.target.result + "')";
				dropBox.style.width = files[0].width;
				dropBox.style.height = files[0].style.height;

			};

			/* Начинаем считывать изображение */
			reader.readAsDataURL(file);

		};

// BOOKMARK STORAGE LISTENERS

		// Вешаем обработчики для хранилища
		window.onstorage = storageChanged;
		saveInLocal.addEventListener('click', saveLocalData, false);
		saveInSession.onclick = saveSessionData;
		showLocal.onclick = showLocalItems;
		showSession.onclick = showSessionItems;
		clearLocal.onclick = clearLocalStorage;
		clearSession.onclick = clearSessionStorage;
		saveBirthButton.onclick = saveBirthday;
		searchButton.onclick = searchData;
		inputFile.onchange = processFiles;
		dropBox.ondragenter = ignoreDrag;
		dropBox.ondragover = ignoreDrag;
		dropBox.ondrop = drop;

	} // STORAGE END

// BOOKMARK .......................................................... CANVAS IN FRAME

	/* Если в браузере фрейм, а во фрейме Canvas ... */
	if (window.parent.location.pathname === '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-canvas.html') {

		/* Если в браузере фрейм ... */
		if (window.parent.location.pathname === '/doc/html5/frameset.html') {

			/** @type {HTML Element} - Находим Canvas */
			var canvas = mainIFrame.contentDocument.getElementById('canvasField');
			/** @type {object} - Получаем Context */
			var context = canvas.getContext('2d');

/* --------------------------------------------------------------- Запустить Canvas -- */
// NOTE Почему в таком случае не работает обычный RUN??????

			/**
			 * @type {HTML Element} - Кнопка Запустить Canvas
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Считывает содержимое строки с кодом
			 * -------------- Запускает результат на выполнение в eval
			 */
			mainWindow.getElementById('runCanvasButton').onclick = function() {
				eval(codeStr.value);
			};

/* --------------------------------------------------------------- Очистить строку с кодом -- */

			/**
			 * @type {HTML Element} - Кнопка Сбросить код
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Обнуляет содержимое строки с кодом
			 */
			mainWindow.getElementById('clearCodeString').onclick = function() {
				codeStr.value = '';
			};


/* --------------------------------------------------------------- Начать новый путь -- */
// BOOKMARK CANVAS Begin Path()

			/**
			 * @type {HTML Element} - Кнопка Начать новый путь
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Сбрасывает предыдущие настройки
			 */
			mainWindow.getElementById('beginPath').onclick = function() {
				codeStr.value += "context.beginPath();\n";
			};

/* --------------------------------------------------------------- Закрыть путь -- */

			/**
			 * @type {HTML Element} - Кнопка Закрыть путь
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Сбрасывает текушие настройки
			 */
			mainWindow.getElementById('closePath').onclick = function() {
				codeStr.value += "context.closePath();\n";
			};

/* --------------------------------------------------------------- Перезагрузить холст -- */
// BOOKMARK CANVAS холст

			/**
			 * @type {HTML Element} - Кнопка Перезагрузить
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Очистить холст, оставив все настройки как было
			 */
			mainWindow.getElementById('reloadCanvas').onclick = function() {
				canvas.width = canvas.width;
			};

/* --------------------------------------------------------------- Восстановмть холст -- */
// FIXME Кнопка Восстановить - Don't working

			/**
			 * @type {HTML Element} - Кнопка Восстановить
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Должна бы восстанавливать предыдущие настройки
			 */
			mainWindow.getElementById('restoredCanvas').onclick = function() {
				context.restore();
			};

/* --------------------------------------------------------------- Сдвмнуть сетку -- */

			/**
			 * @type {HTML Element} - Кнопка Транслировать холст
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Сдвигает холст на 100px влево и вниз
			 */
			mainWindow.getElementById('moveCanvasButton').onclick = function() {
				codeStr.value += "context.translate(100,100);\n";
			};

/* --------------------------------------------------------------- Повернуть сетку -- */

			/**
			 * @type {HTML Element} - Кнопка  Повернуть Canvas
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Сдвигает холст на 5 радиан? влево и вниз
			 */
			mainWindow.getElementById('rotateCanvasButton').onclick = function() {
				codeStr.value += "context.rotate(5);\n";
			};

/* --------------------------------------------------------------- Начальная точка -- */
// BOOKMARK Canvas Lines

			/**
			 * @type {HTML Element} - Кнопка Начальная точка
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Ставит каретку на 300px по X-оси (вдоль) и на 100px по Y-оси (сверху вниз)
			 */
			mainWindow.getElementById('moveTo').onclick = function() {
				codeStr.value += "context.moveTo(300, 100);\n";
			};

/* --------------------------------------------------------------- Конечная точка -- */

			/**
			 * @type {HTML Element} - Кнопка Конечная точка
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Ставит каретку на 500px по X-оси (вдоль) и на 100px по Y-оси (сверху вниз)
			 */
			mainWindow.getElementById('lineTo').onclick = function() {
				codeStr.value += "context.lineTo(500, 100);\n";
			};

/* --------------------------------------------------------------- Ширина линии -- */

			/**
			 * @type {HTML Element} - Кнопка Ширина линии
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает ширину линии в 10px
			 */
			mainWindow.getElementById('lineWidth').onclick = function() {
				codeStr.value += "context.lineWidth = 10;\n";
			};

/* --------------------------------------------------------------- Цвет линии -- */

			/**
			 * @type {HTML Element} - Кнопка Цвет линии
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Линия будет красного цвета
			 */
			mainWindow.getElementById('strokeStyle').onclick = function() {
				codeStr.value += "context.strokeStyle = 'red';\n";
			};

/* --------------------------------------------------------------- Закруглить концы линии -- */

			/**
			 * @type {HTML Element} - Кнопка Закруглить
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Закругляет концы линии
			 */
			mainWindow.getElementById('lineCapRound').onclick = function() {
				codeStr.value += "context.lineCap = 'round';\n";
			};

/* --------------------------------------------------------------- Заквадратить концы линии -- */

			/**
			 * @type {HTML Element} - Кнопка Заквадратить
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Концы линии будут квадратными
			 */
			mainWindow.getElementById('lineCapSquare').onclick = function() {
				codeStr.value += "context.lineCap = 'square';\n";
			};

/* --------------------------------------------------------------- Соединить концы -- */

			/**
			 * @type {HTML Element} - Кнопка Соединить
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Соединяет начальную и конечную точки
			 */
			mainWindow.getElementById('stroke').onclick = function() {
				codeStr.value += "context.stroke();\n";
			};

/* --------------------------------------------------------------- Canvas-Текст -- */
// BOOKMARK Canvas Text

			/**
			 * @type {HTML Element} - Кнопка Текст
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует текст
			 */
			mainWindow.getElementById('text').onclick = function() {

				codeStr.value +=
					"context.textBaseline = 'top'; \
					context.font = 'bold 40px Verdana, sans-serif'; \
					context.fillStyle = 'violet'; \
					context.fillText('Hello World:)', 300, 100); \n";
			};

/* --------------------------------------------------------------- Контур текста -- */

			/**
			 * @type {HTML Element} - Кнопка Контур текста
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует текст, обведенный контуром
			 */
			mainWindow.getElementById('borderText').onclick = function() {

				codeStr.value +=
					"context.font = 'bold 40px Verdana, sans-serif'; \
					context.lineWidth = 1; \
					context.strokeStyle = 'red'; \
					context.strokeText('Hello World:)', 300, 100); \n";
			};

/* --------------------------------------------------------------- Canvas-Фигуры -- */
// BOOKMARK Canvas Shapes

/* --------------------------------------------------------------- Прямая линия -- */

			/**
			 * @type {HTML Element} - Кнопка Прямая линия
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует прямую линию
			 */
			mainWindow.getElementById('straightLine').onclick = function() {
				codeStr.value += "context.moveTo(300, 100);\ncontext.lineTo(700, 100);\ncontext.stroke();\n";
			};

/* --------------------------------------------------------------- Кривая -- */

			/**
			 * @type {HTML Element} - Кнопка Кривая
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует кривую
			 */
			mainWindow.getElementById('bezier').onclick = function() {
				codeStr.value +=
					"context.moveTo(300,500); \
					context.bezierCurveTo(200,1000,200,100,200,300); \
					context.stroke();\n";
			};

/* --------------------------------------------------------------- Дуга -- */

			/**
			 * @type {HTML Element} - Кнопка Дуга
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует дугу
			 */
			mainWindow.getElementById('arc').onclick = function() {
				codeStr.value +=
					"context.arc(500, 200, 100, 0.5*Math.PI, 1.5*Math.PI);\
					context.stroke();\n";
			};

/* --------------------------------------------------------------- Круг -- */

			/**
			 * @type {HTML Element} - Кнопка Круг
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует круг
			 */
			mainWindow.getElementById('round').onclick = function() {
				codeStr.value +=
					"context.arc(500, 200, 100, 0, 2*Math.PI);\
					context.stroke();\n";
			};

/* --------------------------------------------------------------- Залитый прямоугольник -- */

			/**
			 * @type {HTML Element} - Кнопка Залитый прямогольник
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует закрашенный прямоугольник
			 */
			mainWindow.getElementById('fillRect').onclick = function() {
				codeStr.value += "context.fillRect(300,50,800,450);\n";
			};

/* --------------------------------------------------------------- Незалитый прямоугольник -- */

			/**
			 * @type {HTML Element} - Кнопка Незалитый прямоугольник
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Рисует незакрашенный прямоугольник
			 */
			mainWindow.getElementById('strokeRect').onclick = function() {
				codeStr.value += "context.strokeRect(300,50,800,450);\n";
			};

/* --------------------------------------------------------------- Вершины фигур -- */
// BOOKMARK Вершины фигур

			/**
			 * @type {HTML Element} - Кнопка Закруглить вершины
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Закругляет вершины фигуры
			 */
			mainWindow.getElementById('lineJoinRound').onclick = function() {
				codeStr.value += "context.lineJoin = 'round';\n";
			};

			/**
			 * @type {HTML Element} - Кнопка Обрезать вершины
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Вершины фигуры будут уголком
			 */
			mainWindow.getElementById('lineJoinBever').onclick = function() {
				codeStr.value += "context.lineJoin = 'bevel';\n";
			};

/* --------------------------------------------------------------- Залить -- */

			/**
			 * @type {HTML Element} - Кнопка Залить
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Залить фигуру
			 */
			mainWindow.getElementById('fill').onclick = function() {
				codeStr.value += "context.fill();\n";
			};

/* --------------------------------------------------------------- Цвет заливки -- */
// BOOKMARK Canvas Colors

			/**
			 * @type {HTML Element} - Кнопка Цвет заливки
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Установить цвет заливки
			 */
			mainWindow.getElementById('fillStyle').onclick = function() {
				codeStr.value += "context.fillStyle = 'yellow';\n";
			};

/* --------------------------------------------------------------- Прозрачность -- */

			/**
			 * @type {HTML Element} - Кнопка Прозрачность
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает прозрачность
			 */
			mainWindow.getElementById('opasity').onclick = function() {
				codeStr.value += "context.globalAlpha = 0.5;\n";
			};

/* --------------------------------------------------------------- Цвет тени -- */
// BOOKMARK Canvas Shadows

			/**
			 * @type {HTML Element} - Кнопка Цвет тени
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает цвет для тени
			 */
			mainWindow.getElementById('shadowColor').onclick = function() {
				codeStr.value += "context.shadowColor = 'red';\n";
			};

/* --------------------------------------------------------------- Размытие тени -- */

			/**
			 * @type {HTML Element} - Кнопка Размытие тени
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает размытие тени в пикселах
			 */
			mainWindow.getElementById('shadowBlur').onclick = function() {
				codeStr.value += "context.shadowBlur = 20;\n";
			};

/* --------------------------------------------------------------- Расположение -- */

			/**
			 * @type {HTML Element} - Кнопка Расположение тени
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает сдвиг тени
			 */
			mainWindow.getElementById('shadowPosition').onclick = function() {
				codeStr.value += "context.shadowOffsetX = 10;\ncontext.shadowOffsetY = 10;\n";
			};

/* --------------------------------------------------------------- Создать градиент -- */
// BOOKMARK Canvas Градиенты

			/**
			 * @type {HTML Element} - Кнопка Создать градиент
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Создает линейный градиент
			 */
			mainWindow.getElementById('createGradient').onclick = function() {
				codeStr.value = "var gradient = context.createLinearGradient(300,50,800,450);\n";
			};

/* --------------------------------------------------------------- Добавить цвет -- */

			/**
			 * @type {HTML Element} - Кнопка Добавить цвет
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Добавляет цвет к градиенту
			 */
			mainWindow.getElementById('addColor').onclick = function() {
				codeStr.value += "gradient.addColorStop(0, 'magenta');\n";
			};

/* --------------------------------------------------------------- Залить градиентом -- */

			/**
			 * @type {HTML Element} - Кнопка Залить градиентом
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает градиентную заливку
			 */
			mainWindow.getElementById('fillGradient').onclick = function() {
				codeStr.value += "context.fillStyle = gradient;\n";
			};

/* --------------------------------------------------------------- Готовые градиенты -- */

/* --------------------------------------------------------------- Двухцветный линейный -- */

			/**
			 * @type {HTML Element} - Кнопка Двухцветный линейный
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает градиентную заливку
			 */
			mainWindow.getElementById('linear2').onclick = function() {
				codeStr.value +=
					"var gradient = context.createLinearGradient(300,50,800,450); \
					gradient.addColorStop(0, 'magenta'); \
					gradient.addColorStop(1, 'yellow'); \
					context.fillStyle = gradient; \
					context.fill();\n";
			};

/* --------------------------------------------------------------- Двухцветный радиальный -- */

			/**
			 * @type {HTML Element} - Кнопка Двухцветный радиальный
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает градиентную заливку
			 */
			mainWindow.getElementById('radial2').onclick = function() {
				codeStr.value +=
					"var gradient = context.createRadialGradient(100,10,150,238,50,890); \
					gradient.addColorStop(0, 'magenta'); \
					gradient.addColorStop(1, 'yellow'); \
					context.fillStyle = gradient; \
					context.fill();\n";
			};

/* --------------------------------------------------------------- Многоцветный линейный -- */

			/**
			 * @type {HTML Element} - Кнопка Многоцветный линейный
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает градиентную заливку
			 */
			mainWindow.getElementById('linearMany').onclick = function() {
				codeStr.value +=
					"var gradient = context.createLinearGradient(300,50,800,450); \
					gradient.addColorStop('0','magenta'); \
					gradient.addColorStop('.20','blue'); \
					gradient.addColorStop('.50','green'); \
					gradient.addColorStop('.80','yellow'); \
					gradient.addColorStop('1','red'); \
					context.fillStyle = gradient; \
					context.fill();\n";
			};

/* --------------------------------------------------------------- Многоцветный радиальный -- */

			/**
			 * @type {HTML Element} - Кнопка Многоцветный радиальный
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Устанавливает градиентную заливку
			 */
			mainWindow.getElementById('radialMany').onclick = function() {
				codeStr.value +=
					"var gradient =  context.createRadialGradient(100,10,150,238,50,890); \
					gradient.addColorStop('0','magenta'); \
					gradient.addColorStop('.25','blue'); \
					gradient.addColorStop('.50','green'); \
					gradient.addColorStop('.75','yellow'); \
					gradient.addColorStop('1.0','red'); \
					context.fillStyle = gradient; \
					context.fill();";
			}

// BOOKMARK Canvas IMAGES

/* --------------------------------------------------------------- Выбрать картинку -- */


			/** @type {object} - Создаем картинку для экспериментов */
			var canvasImage = new Image();

			/**
			 * @type {HTML Element} - Кнопка Выбрать картинку
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Выбираем картинку
			 */
			mainWindow.getElementById('selectPicture').onclick = function() {
				codeStr.value += "img.src='../../img/ok.png';\n";
			}

/* --------------------------------------------------------------- Загрузить картинку -- */

			/**
			 * @type {HTML Element} - Кнопка Загрузить картинку
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Загрузить картинку
			 * -------------- Выбираем и грузим двумя разными действиями
			 * -------------- Чтобы картинка успела загрузиться
			 * -------------- После того, как она получит src
			 */
			mainWindow.getElementById('insertPicture').onclick = function() {
				codeStr.value =
					"context.drawImage(img,500,50,500,500);\n";
			}

/* ---------------------------------------------------- Заполнить холст выбранными картинками -- */
// BOOKMARK Save Canvas()

			/**
			 * @type {HTML Element} - Кнопка Заполнить холст
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Загрузить картинку
			 */
			mainWindow.getElementById('fillCanvas').onclick = function() {
				codeStr.value =
					"context.drawImage(img, 50, 50); \
					var pattern = context.createPattern(img, 'repeat'); \
					context.fillStyle = pattern; \
					context.rect(0, 0, canvas.width, canvas.height); \
					context.fill();";
			}

/* --------------------------------------------------------------- Сохранить холст в файл -- */

			/**
			 * @type {HTML Element} - Кнопка Сохранить содержимое холста в файл
			 * @listens
			 * @event click:MouseEvents
			 *
			 * @description - Сохранить Canvas
			 */
			mainWindow.getElementById('saveCanvas').onclick = function() {

				/** @type {object} - Воспользуемся элементом <img> */
				var imageCopy = mainIFrame.contentDocument.getElementById('savedImageCopy');

				/** Переносим в картинку содержимое холста */
				imageCopy.src = canvas.toDataURL();
				/* @type {HTML Element} - Находим на странице div с нашей картинкой */
				var imageContainer = mainIFrame.contentDocument.getElementById('savedCopyContainer');
				/* Показываем <div> заодно с картинкой */
				imageCopy.style.display = 'inline-block';
				imageContainer.style.display = 'block';

				// FIXME Don't working
				context.save();
			} // saveCanvas

// BOOKMARK .......................................................... CANVAS RANDOM CIRCLE

/* --------------------------------------------------------------- Случайный круг -- */

			/**
			 * @constructs circle
			 * @type {object} x ---------------- случайный круг
			 * @property {number} x ------------ текущая x-координата
			 * @property {number} y ------------ текущая y-координата
			 * @property {number} dx ----------- индекс изменения абсциссы
			 * @property {number} dy ----------- индекс изменения ординаты
			 * @property {number} radius ------- радиус круга
			 * @property {string} color -------- цвет круга
			 * @property {string} borderColor -- цвет рамки
			 * @property {boolean} isSelected -- метка для круга, выбранного в текущий момент
			 */
			function Circle(x, y, dx, dy, radius, color, borderColor) {

				this.x = x;
				this.y = y;
				this.dx = dx;
				this.dy = dy;
				this.radius = radius;
				this.color = color;
				this.borderColor = borderColor;
				this.isSelected = false;

			} // Circle()

			/** @type {object} - Массив для хранения кругов */
			var circles = [];
			/**
			 * @type (HTML Element}
			 * @listens
			 * @event click:MouseEvent
			 *
			 * @summary Создаем случайный круг
			 */
			mainWindow.getElementById('randomRound').onclick = function() {

				/** Вешаем события здесь, чтобы они имелм доступ к функциям */
				canvas.onmouseclick = canvasClick;
				canvas.onmouseup = canvasClick;
				canvas.onmousedown = stopDragging;
				canvas.onmousemove = dragCircle;

				/**
				 * @function randomFromTo
				 * @param {number} from - Начало диапазона
				 * @param {number} to --- Конец диапазона
				 * @returns {Number} ---- Случайное число
				 *
				 * @summary ------------- Генерирует произвольные числа в заданном диапазоне
				 */
				function randomFromTo(from, to) {
					return Math.floor(Math.random() * (to - from + 1) + from);
				}

				/** @type {number} --- Радиус круга - случайное число от 10 до 60 */
				var randomRadius = randomFromTo(10, 60);
				/** @type {number} --- Введенное в <input> пользовательское число */
				var inputValue = parseFloat(mainWindow.getElementById('ballSize').value);
				/** @type {number} --- Если в <input> пользовательское значение, то устанавливаем его */
				var radius = (inputValue === 15) ? randomRadius : inputValue;
				/** @type {number} --- Случайная Х-координата положения круга */
				var x = randomFromTo(0, canvas.width);
				/** @type {number} --- Случайная Y-координата положения круга */
				var y = randomFromTo(0, canvas.height);
				/** @type {number} --- Случайное ускорение по X-оси */
				var dx = randomFromTo(0.1, 0.9);
				/** @type {number} --- Случайное ускорение по Y-оси */
				var dy = randomFromTo(0.1, 0.9);

				/** @type {object} --- Массив с цветами для выбора случайного цвета */
				var colors = [
					'red', 'green', 'blue', 'yellow', 'orange', 'rosybrown', 'magenta', 'brown', 'purple', 'pink',
					'coral', 'indianred', 'lime', 'seagreen', 'teal', 'cadetblue', 'steelblue', 'slategray',
					'blueviolet', 'crimson'
				];

				/** @type {string} - Выбираем случайный цвет для круга */
				var color = colors[randomFromTo(0, 20)];
				/** @type {string} - Выбираем случайный цвет для радиуса круга */
				var borderColor = colors[randomFromTo(0, 20)];

				/** @type {object} - Создаем круг */
				var circle = new Circle(x, y, dx, dy, radius, color, borderColor);

				/* Сохраняем круг в массив */
				circles.push(circle);

				/** Рисуем круги из массива */
				drawCircles();

				/** @function drawCircles - Рисует круг на холсте */
				function drawCircles() {

					/** @method clearRect - Очищает холст */
					context.clearRect(0, 0, canvas.width, canvas.height);

					/** Бежим по массиву */
					for (var i = 0; i < circles.length; i++) {

						/** Присваиваем текущий круг в переменную */
						var circle = circles[i];

						/** Устанавливаем прозрачность для кругов */
						context.globalAlpha = 0.65;
						/** Начинаем новый путь, чтобы круги рисовались разных цветов */
						context.beginPath();
						/** Рисуем текущий круг */
						context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
						/** @method fillStyle - Закрашиваем круг */
						context.fillStyle = circle.color;
						/** @method strokeStyle - Закрашиваем бордер */
						context.strokeStyle = circle.borderColor;

						/** Если круг выбран, то выделяем выбранный круг рамкой, чтобы показать выделение */
						if (circle.isSelected) {
							context.lineWidth = 7;
						} else {
							context.lineWidth = 3;
						}

						/** Закрашиваем круг */
						context.fill();
						/** Закрашиваем рамку */
						context.stroke();

					} // for

				} // drawCircles

				/** @type {object} - Выбранный круг */
				var previousSelectedCircle;

				/** @type {object} - Создаем звук для клика */
				var clickSound = new Audio('../../media/popup.mp3');

				/**
				 * @function canvasClick
				 * @listens
				 * @event click:mouseClick - клик по кругу
				 * @
				 * @description ------------ Проверяем, был ли щелчок по кругу
				 * @------------------------ Если да, то делаем круг выбранным и перерисовываем холст
				 * @summary ---------------- Проверяем клик
				 */
				function canvasClick(e) {

					// FIXME Попробовать сделать Canvas резиновым (e.clientX)

					/** @type {number} - Выясняем X-координату клика */
					var clickX = e.pageX - canvas.offsetLeft;
					/** @type {number} - Выясняем Y-координату клика */
					var clickY = e.pageY - canvas.offsetTop;

					/** Бежим по массиву с кругами и проверяем - попали ли по кругу */
					for (var i = circles.length - 1; i >= 0; i--) {

						/** Присваиваем текущий круг в переменную */
						var circle = circles[i];

						/**
						 * С помощью теоремы Пифагора вычисляем расстояние от
						 * точки, в которой щелкнули, до центра текущего круга
						 */
						var distanceFromCenter =
							Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));

						/** Если она меньше радиуса круга, значит кликнули внутри круга */
						if (distanceFromCenter <= circle.radius) {

							/** Тогда снимаем выбор с предыдущего круга и останавливаем анимацию */
							if (previousSelectedCircle != null) {
								previousSelectedCircle.isSelected = false;
								clearTimeout(timeoutIDForFallBalls);
							}

							/** Запоминаем выбранный круг в переменную */
							previousSelectedCircle = circle;

							/** Делаем текущий круг выбранным и перерисовываем круги */
							circle.isSelected = true;
							drawCircles();

							/** Разрешаем перетаскивание */
							isDragging = true;

							/** Играем звук */
							clickSound.play();

							/** Останавливаем анимацию */
							clearTimeout(timeoutIDForFallBalls);

						}
					} // if
				} // canvasClick(e)

				/** Запрещаем перетаскивание */
				var isDragging = false;

// BOOKMARK DragCircle()

				/**
				 * @function dragCircle
				 * @param {event} click:mouseEvent
				 * @description ------------ Проверяем, установлена ли возможность перетаскивания
				 * @------------------------ Если да, то обнуляем таймаут анимации
				 * @summary ---------------- Проверяем клик
				 */
				function dragCircle(e) {

					/** Проверка возможности перетаскивания */
					if (isDragging === true) {

						/** Прекращаем анимацию */
						clearTimeout(timeoutIDForFallBalls);

						/** Проверка попадания */
						if (previousSelectedCircle !== null) {

							/** Запоминаем координаты мыши */
							var x = e.pageX - canvas.offsetLeft;
							var y = e.pageY - canvas.offsetTop;

							/** Передвигаем круг к новым координатам */
							previousSelectedCircle.x = x;
							previousSelectedCircle.y = y;

							/** Перерисовываем холст */
							drawCircles();

						}
					}
				} // dragCircle()

				/** @function stopDragging - Остановка перетаскивания */
				function stopDragging() {
					isDragging = false;
				}
			}; // randomRound

// BOOKMARK Canvas FallBalls()

			/**
			 * @type (HTML Element}
			 * @listens
			 * @event click:MouseEvent
			 *
			 * @summary ------- Анимируем круги
			 */
			mainWindow.getElementById('animateRound').onclick = function fallBalls() {

				/** Очищаем холст */
				context.clearRect(0, 0, canvas.width, canvas.height);

				/** Перебираем наши мячики */
				for (var i = 0; i < circles.length; i++) {

					/** Перемещаем текущий мячик в новую позицию */
					var circle = circles[i];
					/** Учитываем случайное ускорение */
					circle.x += circle.dx;
					circle.y += circle.dy;

					/** Добавляем эффект "гравитации", который ускоряет падение мячика */
					if ((circle.y) < canvas.height) circle.dy += 0.22;

					/** Добавляем эффект "трения", который замедляет движение мячика */
					circle.dx = circle.dx * 0.998;

					/** Если мячик натолкнулся на край холста, отбиваем его */
					if ((circle.x + circle.radius > canvas.width) || (circle.x - circle.radius < 0)) {
						circle.dx = -circle.dx;
					}

					/** Если мячик упал вниз, отбиваем его, но слегка уменьшаем скорость */
					if ((circle.y + circle.radius > canvas.height) || (circle.y - circle.radius < 0)) {
						circle.dy = -circle.dy * 0.6;
					}

					/** Рисуем текущий мячик */
					context.globalAlpha = 0.65;
					context.beginPath();
					context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
					context.fillStyle = circle.color;
					context.strokeStyle = circle.borderColor;

					/** Если текущий мячик выбран, то рисуем ему рамку */
					if (circle.isSelected) {
						context.lineWidth = 7;
					} else {
						context.lineWidth = 3;
					}

					/** Запоминаем цвет и рамку в контекст */
					context.fill();
					context.stroke();
				}

				/** Повторяем процедуру для оставшихся мячиков */
				timeoutIDForFallBalls = setTimeout(fallBalls, 20);
			}

/* --------------------------------------------------------------- Очистить холст -- */

// BOOKMARK ClearCanvas

			/**
			 * @type (HTML Element}
			 * @listens
			 * @event click:MouseEvent
			 *
			 * @description ------- Очищаем холст
			 * @description ------- Удаляем круги из массива
			 * @description ------- Обнуляем таймаут
			 */
			mainWindow.getElementById('clearCanvas').onclick = function() {

				/** Все-все чистим */
				clearTimeout(timeoutIDForFallBalls);
				circles = [];
				context.clearRect(0, 0, canvas.width, canvas.height);

				/** События для рисования куда-то делись - подключаем их еще раз ?????????? */
				canvas.ondblclick = startDrawing;
				canvas.onmouseup = stopDrawing;
				canvas.onmousemove = draw;

			}
		} // Если в браузере фрейм

// BOOKMARK Canvas Drawing with mouse

		/** Запрещаем перетаскивание*/
		var isDrawing = false;

		/**
		 * @functiion startDrawing
		 * @listen
		 * @event dblclick:mouseEvent
		 * @
		 * @description - Начинаем рисовать мышкой
		 */
		function startDrawing(e) {

			/** Без var, чтобы все знали!!! */
			isDrawing = true;
			/** Новый путь, чтобы линия началась точно под мышкой */
			context.beginPath();

			/** Ставим точку - куда рисовать */
			context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
		} // StartDrawing end

		/**
		 * @functiion draw
		 * @listen
		 * @event mouseMove:mouseEvent
		 * @
		 * @description - Рисуем, пока мышка двигается по холсту
		 */
		function draw(e) {

			if (isDrawing === true) {

				// FIXME Попробовать сделать Canvas резиновым (e.clientX)

				/**
				 * Запоминаем текущие координаты указателя мыши относительно документа
				 * clientX/clientY определило бы координаты относительно окна???????????
				 */

				var x = e.pageX - canvas.offsetLeft;
				var y = e.pageY - canvas.offsetTop;

				/** Рисуем куда запомнили */
				context.lineTo(x, y);
				context.stroke();
			}
		} // Draw end

		/**
		 * @function stopDrawing
		 * @listens
		 * @event onmouseUp:mouseEvent
		 *
		 * @description Запрещаем рисование
		 */
		function stopDrawing() {
			isDrawing = false;
		} // stopDrawing()

		/** Подключим требуемые для рисования события */
		canvas.ondblclick = startDrawing;
		canvas.onmouseup = stopDrawing;
		canvas.onmousemove = draw;

	}; // Canvas/ Canvas in IN FRAME END

/*
 * ********************************************************* Java Script Валидация формы для регистрации **
 */

// BOOKMARK .......................................................... FORM VALIDATE

	/** Если формы открыты в браузере, а не во фрейме */
	if (window.parent.location.pathname !== '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-forms.html') {

		/** @type {HTML Element} - Форма для регистрации */
		var registrationForm = document.querySelector('form[name="registrationForm"]'),
			/** @type {HTML Element} - Поле для ввода имени */
			name = document.querySelector('input[name="nameField"]'),
			/** @type {HTML Element} - Поле для ввода телефона */
			tel = document.querySelector('input[name="phoneField"]'),
			/** @type {HTML Element} - Поле для ввода почты */
			email = document.querySelector('input[name="emailField"]'),
			/** @type {HTML Element} - Прогресс - будет показывать статус заполнения полей */
			progress = document.querySelector('progress[name="progressField"]');

		/** Будем считать корректно заполненные поля*/
		var count = 0;

// BOOKMARK Стилизация полей

		/**
		 * @function showValid
		 * @param {HTML Element}
		 *
		 * @summary - Показываем корректно заполненное поле
		 */
		function showValid(element) {
			element.style.border = '2px dashed green';
		};

		/**
		 * @function showInvalid
		 * @param {HTML Element}
		 *
		 * @summary - Показываем некорректно заполненное поле
		 */
		function showInvalid(element) {
			element.style.border = '2px dashed red';
		};

		/**
		 * @function updateFormProgress
		 * @param {number} - Количество коректно заполненных полей
		 *
		 * @summary - Обновляем значение прогресса
		 */
		function updateFormProgress(count) {
			progress.value = Math.floor((100 / 70) * count);
		}

// BOOKMARK Проверка всех полей


		/**
		 * @function checkField
		 * @param {HTML Element} - Проверяемое поле
		 * @param {string} ------- Паттерн для проверки
		 * @param {number} ------- Сообщение об ошибке для пользователя
		 *
		 * @description ---------- Сравниваем содержимое поля с паттерном
		 * ----------------------- Если они равны ...
		 * -------------------------- Инкрементируем счетчик правильно заполненных полей
		 * -------------------------- Показываем корректно заполненное поле
		 * ----------------------- Иначе ...
		 * -------------------------- Показываем некорректно заполненное поле
		 * @summary ----------------- Проверяем корректность заполнения всех полей
		 */
		function checkField(element, regexp, errorMessage) {

			/** type {string} - Запоминаем значение поля в переменную */
			var value = element.value;

			/** @method test - Проверяем совпадение с регулярным выражением */
			if (regexp.test(value)) {

				/** Если да, то обводим элемент зелененьким */
				showValid(element);

				/** Инкрементируем счетчик правильных ответов */
				count++;

				/** Обновляем значение прогресса */
				updateFormProgress(count);

			} else {

				/** Иначе показываем, что пользователь неправ */
				showInvalid(element);
				// FIXME Спозиционировать сообщение об ошибке и показать его

			}
		}

// BOOKMARK Проверяем поля по отдельности

/* --------------------------------------------------------------- Проверяем корректность заполнения имени */

		// FIXME У меня не получилось вынести ErrorMessage, element и Regexp в отдельные переменные,
		// чтобы проверять их в одной функции, поэтому пока что так :(

		/**
		 * @function validName
		 * @description ---------- Проверяем значение имени
		 * ----------------------- Если они равны ...
		 * @description ---------- Инкрементируем счетчик правильно заполненных полей
		 * @description ---------- Показываем корректно заполненное поле
		 * @description ---------- Иначе ...
		 * @description ---------- Показываем некорректно заполненное поле
		 * @summary -------------- Проверяем корректность заполнения имени
		 */
		function validName() {

			/** @type {HTML Element} Запоминаем проверяемый элемент */
			var element = this,
				/** И присваиваем соответствующее сообщение об ошибке */
				errMessage = 'Имя задано неверно';

			/**
			 * Пропускаем только латинские или русские буквы и пробел между первым и вторым словом
			 * (если второе слово есть). Оба слова могут начинаться с большой буквы
			 */
            var regexp = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/;

			/** Запускаем проверку */
			checkField(element, regexp, errMessage);
		};

/* --------------------------------------------------------------- Проверяем корректность введенного телефона */

		/**
		 * @function validTel
		 * @description ---------- Проверяем введенный телефон
		 * ----------------------- Если он корректный
		 * @description ------------- Инкрементируем счетчик правильно заполненных полей
		 * @description ------------- Показываем корректно заполненное поле
		 * @description ---------- Иначе ...
		 * @description ------------- Показываем некорректно заполненное поле
		 * @summary ----------------- Проверяем корректность заполнения телефона
		 */
        function validTel() {

			/** @type {HTML Element} Запоминаем проверяемый элемент */
			var element = this,
				/** И присваиваем соответствующее сообщение об ошибке */
				errorMessage = 'Номер задан неправильно';

			/** Пропускаем номер строго в формате (012) 345-67-89 */
			var regexp = /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;

			/** Запускаем проверку */
			checkField(element, regexp, errorMessage);
		};

		/**
		 * @function validEmail
		 * @description ---------- Проверяем введенную почту
		 * ----------------------- Если все в порядке
		 * @description ------------- Инкрементируем счетчик правильно заполненных полей
		 * @description ------------- Показываем корректно заполненное поле
		 * @description ---------- Иначе ...
		 * @description ------------- Показываем некорректно заполненное поле
		 * @summary ----------------- Проверяем корректность заполнения телефона
		 */
        function validEmail() {

			/** @type {HTML Element} Запоминаем проверяемый элемент */
			var element = this,
				/** И присваиваем соответствующее сообщение об ошибке */
				errorMessage = 'Email задан неправильно';

			/**
			 * Пропускаем до 15 символов a-z0-9_- перед собачкой,
			 * Также это может быть до 4 слов, разделенных точками.
			 * Затем собачка и имя домена (1 - 15 символов).
			 * Затем доменная зона - от 2 до 6 латинских букв
			 */
			var regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/;

			/** Запускаем проверку */
			checkField(element, regexp, errorMessage);
		};

/* --------------------------------------------------------------- Вешаем обработчики на проверяемые поля -- */

		/** Вешаем обработчики */
		/** @event onchange - Если изменится значение поля имени */
		if (name) name.onchange = validName;
		/** @event onchange - Если изменится значение поля ввода телефона */
		if (tel) tel.onchange = validTel;
		/** @event onchange - Если изменится значение поля ввода почты */
		if (email) email.onchange = validEmail;
	} // FORM VALIDATE END

/*
 * ********************************************************* Java Script Media **
 */
// BOOKMARK .......................................................... MEDIA

	/** Если в браузере открыт плейер */
	if (window.parent.location.pathname !== "/doc/html5/frameset.html" && window.location.pathname === "/doc/html5/html5-media.html") {

/* --------------------------------------------------------------- Находим HTML5-плейер -- */

		/** @type {HTML Element} - Нам понадобится кино */
		var html5Video = document.querySelector('video');

/* --------------------------------------------------------------- Находим HTML5-кнопки -- */

		/** @type {HTML Element} - И кнопки, чтобы мы могли что-то с ним сделать */
		var playButton = document.getElementById('play');
		var pauseButton = document.getElementById('pause');
		var stopButton = document.getElementById('stop');
		var muteButton = document.getElementById('mute');
		var fasterButton = document.getElementById('faster');
		var slowerButton = document.getElementById('slower');
		var nsButton = document.getElementById('normalSpeed');
		var volumeText = document.getElementById('volumeText');

		/** @type {HTML Element} - и прогресс, чтобы мы видели сколько видео осталось посмотреть */
		var videoProgress = document.getElementById('videoProgress');

/* --------------------------------------------------------------- Вешаем обработчики -- */

		/** @event click:mouseEvent */
		playButton.addEventListener('click', play);
		/** @event click:mouseEvent */
		pauseButton.addEventListener('click', pause);
		/** @event click:mouseEvent */
		stopButton.addEventListener('click', stop);
		/** @event click:mouseEvent */
		muteButton.addEventListener('click', muteOrUnmute);
		/** @event click:mouseEvent */
		fasterButton.addEventListener('click', speedUp);
		/** @event click:mouseEvent */
		slowerButton.addEventListener('click', slowDown);
		/** @event click:mouseEvent */
		nsButton.addEventListener('click', normalSpeed);
		/** @event change:mouseEvent */
		volumeCtrl.addEventListener('change', updateVolume);

		/** @event change:mediaElement */
		html5Video.addEventListener('timeupdate', updateVideoProgress);

/* --------------------------------------------------------------- Определяем функции -- */

		/** @function play */
		function play() {
			html5Video.play();
		}

		/** @function pause */
		function pause() {
			html5Video.pause();
		}

		/** @function stop */
		function stop() {

			html5Video.pause();
			/** @property {number} - Обнуляем время */
			html5Video.currentTime = 0;
		}

		/** @event change - обновляем значение прогресса */
		html5Video.volumechange = function(e) {

			/** Сначала запоминаем состояние */
			muteButton.value = html5Video.muted ? 'Muted' : 'Unmuted';

			/** Затем передаем его в ползунок */
			volumeCtrl.value = html5Video.volume;
		}

		/** @function muteOrUnmute - Если звук включен - тогда выключаем и наоборот*/
		function muteOrUnmute() {
			html5Video.muted = !html5Video.muted;
		}

		/** @function  updateVolume - Приравниваем высоту звука к положению ползунка */
		function updateVolume() {

			// FIXME Volume Text выводится с дикими 8-ю цифрами после запятой

			/** Звук видео равен положению ползунка */
			html5Video.volume = volumeCtrl.value;
			/** Показываем цифровое значение высоты звука */
			volumeText.value = volumeCtrl.value;
		}

		/** @function speedUp - Быстрее */
		function speedUp() {

			html5Video.play();
			html5Video.playbackRate += 0.5;
		}

		/** @function slowDown - Медленнее */
		function slowDown() {

			html5Video.play();
			html5Video.playbackRate -= 0.5;
		}

		/** @function normalSpeed - Нормальная скорость */
		function normalSpeed() {

			html5Video.play();
			html5Video.playbackRate = 1;
		}

		// FIXME Попытка округлить показатель высоты звука в прогресс оказалась неудачной
		function updateVideoProgress() {

			videoProgress.value = html5Video.currentTime / html5Video.duration * 100;

		}
	}
});

/*
 * ********************************************************************************************************
 * ********************************************************************************************** JQUERY **
 * ********************************************************************************************************
 */

$(document).ready(function(e) {

// BOOKMARK .......................................................... JQUERY

// BOOKMARK Кнопки управления фреймами

	/** Кнопка TryIT - Запустить содержимое кодовой строки на выполнение в eval */
	$('#runButton').click(function() {
		var code = '';
		code = window.parent.$('#codeString').val();
		eval('window.parent.' + code);
	});

	/** Кнопка Reload - Перезагрузить окно браузера */
	$('#reloadButton').click(function() {
		var code = $('#codeString').val();
		window.parent.location.reload();
	});

});

/**
 * ********************************************************************************************* Polifills
 */

// Полифиллы определены внизу, чтобы успели загрузиться файлы скриптов

// ВOOKMARKS .......................................................... POLIFILLS

// BOOKMARK MODERNIZR                                                                    // Windows.onload

Modernizr.load([

	/** FUTURES HTML5 Details/ Summary Support */
	{
		/** Тестим summary в браузере */
		test: Modernizr.summary,

		// FIXME - Проверить работает ли вообще это чудо-диво
		/** Если поддержки нет, то ищем полифилл здесь */
		nope: ['../../js/vendor/logifill-details-min.js']
	}
]);
