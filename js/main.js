/* jshint es5: true, evil: true */

/**
 * @author aLLenka
 * @copyright Можно все :)
 * @version Будем считать, что 0.0.0, так как проект еще ни разу не был готов
 */

// JSDOC -./node_modules/.bin/jsdoc js/main.js
// FIXME Попытаться исправить JSLint
// TODO Подогнать размер автоматических фигур, градиентов и пр. под реальные размеры холста

/*
 * ********************************************************************************************************
 * ***************************************************************************************** JAVA SCRIPT **
 * ********************************************************************************************************
 */
// BOOKMARK Window.onload

/**
 * @summary Весь JS-код начнет выполняться после полной загрузки документа
 * @see {@link https://developer.mozilla.org/ru/docs/Web/API/GlobalEventHandlers/onload}
 */
window.onload = (function() {

	/**
	 * @summary Главное окно с фреймами в браузере
	 * @name mainWindow
	 * @type {object}
	 */
	var mainWindow = window.parent.document;

	/**
	 * @summary Фрейм в главном окне
	 * @name mainIFrame
	 * @type {object}
	 */
	var mainIFrame = mainWindow.getElementById('contentFrame');

	/**
	 * @summary &lt;textarea&gt; - Здесь можно отредактировать JS-код перед выполнением
	 * @name codeStr
	 * @type {object}
	 */
	var codeStr = mainWindow.getElementById('codeString');

	/**
	 * @summary JS-объект для манипуляций с изображением
	 * @name img
	 * @type {object}
	 */
	var img = new Image();

	/**
	 * @summary Идентификатор установки таймера для fallBalls()
	 * @name timeoutIDForFallBalls
	 * @type {function}
	 */
	var timeoutIDForFallBalls;

	/**
	 * @summary Идентификатор установки таймера для drawSquare()
	 * @name timeoutIDForDrawSquare
	 * @type {function}
	 */
	var timeoutIDForDrawSquare;

/*
* ********************************************************* Java Script Canvas **
*/

/**
 * Интерпретатор ругает отсутствие объектов из других окон,
 * поэтому при помощи if делаем что-то вроде пространства имен ...
 */
// BOOKMARK .......................................................... CANVAS

	/** Если в браузере Canvas ... */
	if(window.parent.location.pathname !== '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-canvas.html') {

// BOOKMARK DrawSquare()

		/** Находим Canvas и получаем Context */

		/**
		 * @summary Холст
		 * @name canvas
		 * @type {object}
		 */
		var canvas = document.getElementById('canvasField');

		/**
		 * @summary Контекст рисования
		 * @name context
		 * @type {Object}
		 */
		var context = canvas.getContext('2d');

		/* Определяем внешний вид для падающего квадрата */

		/**
		 * @summary Начальная X-координата падающего квадрата
		 * @name squarePositionX
		 * @type {number}
		 */
		var squarePositionX = 300;

		/**
		 * @summary Начальная Y-координата падающего квадрата
		 * @name squarePositionY
		 * @type {number}
		 */
		var squarePositionY = 10;

		/**
		 * @summary Ширина падающего квадрата
		 * @name squareWidth
		 * @type {number}
		 */
		var squareWidth = 100;

		/**
		 * @summary Высота падающего квадрата
		 * @name squareHeight
		 * @type {number}
		 */
		var squareHeight = 100;

		/**
		 * @summary Цвет рамки падающего квадрата
		 * @name squareBorderColor
		 * @type {string}
		 */
		var squareBorderColor = 'darkslategray';

		/**
		 * @summary Ширина рамки падающего квадрата
		 * @name squareBorderWidth
		 * @type {number}
		 */
		var squareBorderWidth = 5;

		/**
		 * @summary Средний таймаут для любой корректной анимации
		 * @name averageTimeout
		 * @type {number}
		 */
		var averageTimeout = 20;

		/**
		 * @summary При открытии страницы в браузере появляется падающий квадрат
		 * @name drawSquare
		 * @type {function}
		 * @description Если квадрат в пределах холста, рисуем квадрат
		 * Если квадрат за пределами - обнуляем таймаут
		 */
		var drawSquare = function() {

			/**
		 	 * @summary Полностью очищает холст
			 * @property {method} - clearRect - Очищает прямоугольник с заданными координатами
			 * @param {number} - x - X-координата верхнего левого угла очищаемого прямоугольника
			 * @param {number} - y - Y-координата верхнего левого угла очищаемого прямоугольника
			 * @param {number} - width - Ширина очищаемого прямоугольника (свойство width HTML-объекта canvas)
			 * @param {number} - height - Высота очищаемого прямоугольника (свойство height HTML-объекта canvas)
			 * @static
			 */
			context.clearRect(0, 0, canvas.width, canvas.height);

			/**
			 * @summary Сбрасывает предыдущие стили
			 * @property {method} beginPath - Сбрасывает предыдущие стили
			 * @type {method}
			 * @static
			 */
			context.beginPath();

			/**
			 * @summary Рисует падающий квадрат
			 * @property {method} - rect - Рисует квадрат c заданными координатами в текущей позиции
			 * @param {number} - squarePositionX - X-координата верхнего левого угла прямоугольника
			 * @param {number} - squarePositionY - Y-координата верхнего левого угла прямоугольника
			 * @param {number} - squareWidth - Ширина прямоугольника
			 * @param {number} - squareHeight - Высота прямоугольника
			 * @static
			 */
			context.rect(squarePositionX, squarePositionY, squareWidth, squareHeight);

			/** Определяем свойства данного контекста */

			/**
			 * @summary Устанавливает цвет для рамки круга
			 * @property {string} - strokeStyle - Устанавливает цвет линии
			 * @static
			 */
			context.strokeStyle = squareBorderColor;

			/**
			 * @summary Устанавливает ширину рамки круга
			 * @property {number} lineWidth - Устанавливает ширину линии
			 * @static
			 */
			context.lineWidth = squareBorderWidth;

			/**
			 * @summary Обрисовываем квадрат
			 * @property {method} stroke - Обрисовывает линию
			 * @static
			 */
			context.stroke();

			/**
			 * @summary Перемещаем квадрат по Y-оси вниз
			 * @type {number}
			 */
			squarePositionY += 1;

			/**
			 * @summary - Если текущая координата по Y-оси < высоты холста + ширина бордера квадрата ...
			 */
			if (squarePositionY < canvas.height + squareBorderWidth) {

				/**
				 * @summary Устанавливаем таймаут для анимации
				 * @callback setTimeout
				 * @memberof window
				 * @param {function} - drawSquare - рисует квадрат
				 * @param {number} - averageTimeout - таймаут для анимации
				 */
				setTimeout(drawSquare, averageTimeout);

			/** Иначе - прекращаем анимацию */
			} else {

				/**
				 * @summary Обнуляем таймаут для анимации			 *
				 * @callback clearTimeout
				 * @memberof window
				 * @param {function} - timeoutIDForDrawSquare - Идентификатор для повторяемой функции
				 */
				clearTimeout(timeoutIDForDrawSquare);

			}
		};

// BOOKMARK DrawSquare END

		/**
		 * @summary Первоначальная установка анимации падающего квадрата
		 * @name timeoutIDForDrawSquare
		 * @callback setTimeout
		 * @param {function} - drawSquare - Начнет рисовать падающий квадрат
		 * @param {number} - averageTimeout - Количество миллисекунд до следующего запуска
		 *
		 */
		timeoutIDForDrawSquare = setTimeout(drawSquare, averageTimeout);
    }

/*
* ********************************************************* Java Script Storage **
*/
// BOOKMARK .......................................................... HTML5-STORAGE

	/** Если в браузере страница с хранилищем ... */
	if (window.parent.location.pathname !== '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-storage.html') {

		/** Получаем инпуты */

		/**
		 * @summary &lt;input&gt для ввода ключа в Локальное хранилище
		 * @name keyLocal
		 * @type {object}
		 */
		var keyLocal = document.getElementById('keyLocalData');

		/**
		 * @summary &lt;input&gt для ввода ключа в Локальное хранилище
		 * @name dataLocal
		 * @type {object}
		 */
		var dataLocal = document.getElementById('inputLocalData');

		/**
		 * @summary &lt;input&gt для ввода ключа в Сессионное хранилище
		 * @name keySession
		 * @type {object}
		 */
		var keySession = document.getElementById('keySessionData');

		/**
		 * @summary &lt;input&gt для ввода значения в Сессионное хранилище
		 * @name dataSession
		 * @type {object}
		 */
		var dataSession = document.getElementById('inputSessionData');

		/**
		 * @summary &lt;input&gt для drag'n'drop image
		 * @name dataSession
		 * @type {object}
		 */
		var inputFile = document.getElementById('fileInput');

		/** Получаем кнопки для манипуляций */

		/**
		 * @summary Кнопка Save in Local
		 * @name saveInLocal
		 * @type {object}
		 */
		var createWebDbButton = document.getElementById('createWebDb');

		/**
		 * @summary Кнопка Read data from Storage
		 * @name saveInLocal
		 * @type {object}
		 */
		var readFromStorageToDbButton = document.getElementById('readFromStorageToDb');

		/**
		 * @summary Кнопка Save in WEB SQL DB
		 * @name saveDataInWebDB
		 * @type {object}
		 */
		var saveDataInWebDB = document.getElementById('saveInWebDB');

		/**
		 * @summary Кнопка Drop Table WEB DB
		 * @name saveDataInWebDB
		 * @type {object}
		 */
		var dropTableWebDB = document.getElementById('dropTableFromWebDb');

		/**
		 * @summary Кнопка Show WEB DB
		 * @name showWebDbButton
		 * @type {object}
		 */
		var showWebDbButton = document.getElementById('showWebDbData');

		/**
		 * @summary Кнопка Save in Local
		 * @name saveInLocal
		 * @type {object}
		 */
		var saveInLocal = document.getElementById('saveInLocalStorage');

		/**
		 * @summary Кнопка Save in Session
		 * @name saveInSession
		 * @type {object}
		 */
		var saveInSession = document.getElementById('saveInSessionStorage');

		/**
		 * @summary Кнопка Clear Local
		 * @name clearLocal
		 * @type {object}
		 */
		var clearLocal = document.getElementById('clearLocalStorage');

		/**
		 * @summary Кнопка Clear Session
		 * @name clearSession
		 * @type {object}
		 */
		var clearSession = document.getElementById('clearSessionStorage');

		/**
		 * @summary Кнопка Save Birthday
		 * @name saveBirthButton
		 * @type {object}
		 */
		var saveBirthButton = document.getElementById('saveBirthData');

		/**
		 * @summary Кнопка Search In Local
		 * @name searchButton
		 * @type {object}
		 */
		var searchButton = document.getElementById('localSearchButton');

		/**
		 * @summary Кнопка Show Local
		 * @name showLocal
		 * @type {object}
		 */
		var showLocal = document.getElementById('showLocalStorage');

		/**
		 * @summary Кнопка Show Session
		 * @name showSession
		 * @type {object}
		 */
		var showSession = document.getElementById('showSessionStorage');

		/** Получаем таблицы c данными из хранилищ */

		/**
		 * @summary Динамическая таблица для данных из хранилищ {@link itemsList}
		 * @name itemsList
		 * @type {object}
		 */
		var itemsList = document.getElementById('storageItems');

		/**
		 * @summary &lt;fieldset&gt; для Birthday Book
		 * @name birthdayBook
		 * @type {object}
		 */
		var birthdayBook = document.getElementById('enterBirthday');

		/**
		 * @summary &lt;input&gt; для ввода имени
		 * @name nameField
		 * @type {object}
		 */
		var nameField = document.getElementById('inputName');

		/**
		 * @summary &lt;input&gt; для ввода даты рождения
		 * @name birthField
		 * @type {object}
		 */
		var birthField = document.getElementById('inputBirthDay');

		// ----------------------------------------------------------------- Сохраняем данные --
// BOOKMARK SaveData()

		/**
		 * @summary - Сохраняет данные в хранилищaх
		 * @name saveData
		 * @type {function}
		 */
		var saveData = function () {

			/**
			 * @summary Хранилище по умолчанию будет Локальным
			 * @name storage
			 * @type {object}
			 */
			var storage = localStorage, storageKey, storageValue;

			if (event.target.id == "saveInLocalStorage") {

      			storage = localStorage;
      			storageKey = keyLocal;
      			storageValue = dataLocal;

				/**
				 * @summary Сохраняет данные в локальном хранилище
				 * @property {method} - setItem - Сохраняет пару ключ и значение в локальном хранилище
				 * @param {string} - keyLocal.value - Ключ, введенный в &lt;input&gt;
				 * @param {string} - dataLocal.value - Значение, введенное в &lt;input&gt;
				 * @static
				 */
				storage.setItem(keyLocal.value, dataLocal.value);

      		} 

      		if(event.target.id == "saveInSessionStorage") {

  				storage = sessionStorage;
  				storageKey = keyLocal;
      			storageValue = dataLocal;

				/**
				 * @summary Сохраняет данные в локальном хранилище
				 * @property {method} - setItem - Сохраняет пару ключ и значение в локальном хранилище
				 * @param {string} - keyLocal.value - Ключ, введенный в &lt;input&gt;
				 * @param {string} - dataLocal.value - Значение, введенное в &lt;input&gt;
				 * @static
				 */
				storage.setItem(keyLocal.value, dataLocal.value);

      		} 

      		if(event.target.id == "saveInWebDB") {

      			db.transaction(function (t) {
      				t.executeSql("INSERT INTO local_list (local_key, local_value) VALUES (?, ?)", [keyLocal.value, dataLocal.value]);
      			});
      		}

		};

		// ----------------------------------------------------------------- Сохраняем Дату Рождения --
// BOOKMARK ShowBirthday()

		/**
		 * @summary При сохранении объекта показывает сколько дней осталось до дня рождения
		 * @name showBirthday
		 * @type {function}
		 * @param {object} - person - объект с именем и датой рождения
		 *
		 * @description Создаем HTML для вывода дат
		 * Считаем сколько дней осталось до дня рождения
		 * Если день рождения сегодня - дарим картинку
		 * Иначе, говорим когда праздник
		 */
		var showBirthday = function(person) {

			/** Готовим HTML для вывода информации */

			/**
			 * @summary Создаем динамический &lt;span&gt; для ввода даты рождения
			 * @name dateDiv
			 * @type {object}
			 */
			var dateDiv = document.createElement('span');

			/**
			 * @summary Крепим созданный &lt;span&gt; в &lt;fieldset&gt;
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @param {object} dateDiv - динамический &lt;span&gt; для ввода даты рождения
			 * @static
			 */
			birthdayBook.appendChild(dateDiv);

			/** Готовим объекты */

			/**
			 * @summary JS-объект из Локального хранилища
			 * @name restoredPerson
			 * @type {object}
			 * @description Находим JSON-объект по полю name в Локальном хранилище,
			 * Преобразовываем его в JS-объект
			 * Сохраняем в restoredPerson
			 */
			var restoredPerson = JSON.parse(localStorage.getItem(person.name));

			/** Готовим даты */

			/**
			 * @summary Сохраняем сегодняшнюю дату в переменную
			 * @name todayDate
			 * @type {Date}
			 */
			var todayDate = new Date();

			/**
			 * @summary Сохраняем в переменную дату рождения объекта
			 * @name personDate
			 * @type {Date}
			 */
			var personDate = new Date(restoredPerson.dateOfBirth);

			/**
			 * @summary Сегодняшняя дата в строковом представлении
			 * @name todayString
			 * @type {string}
			 * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat} for further information
			 */
			var todayString = new Intl.DateTimeFormat('ru', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}).format(todayDate);

			/**
			 * @summary День рождения объекта в строковом представлении
			 * @name birthDate
			 * @type {string}
			 * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat} for further information
			 */
			var birthDate = new Intl.DateTimeFormat("ru", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			}).format(birthDate);

			/**
			 * @summary Разница между сегодняшним днем и датой рождения в секундах
			 * @name difference
			 * @type {number}
			 */
			var difference = personDate - todayDate;

			/**
			 * @summary Преобразовываем миллисекунды в дни
			 * @type {number}
			 */
			difference = Math.round(difference / 1000 / 60 / 60 / 24);

			/** Если разницы нет, или разница меньше 1 дня (24 часов) */
			if (difference === -1 || difference === 0) {

				/**
				 * @summary Создаем &lt;img&gt; - картинку-подарок
				 * @name gift
				 * @type {object}
				 * @property {string} src - Физический адрес картинки-подарка
				 */
				var gift = document.createElement('img');

				/**
				 * @summary Заносим в свойство src картинки ее физический адрес
				 * @property {string} src - Физический адрес картинки-подарка
				 * @static
				 */
				gift.src = '../../img/gift.png';

				/**
				 * @summary Создаем &lt;span&gt; для поздравления
				 * @name textGift
				 * @type {object}
				 * @property {string} src - &lt;span&gt; для поздравления
				 */
				var textGift = document.createElement('span');

				/**
				 * @summary Заносим в &lt;span&gt; текст поздравления
				 * @property {string} innerHTML - Заносит текст в HTML
				 * @static
				 */
				textGift.innerHTML = 'Happy Birthday<br />';

				/**
				 * @summary Добавляет класс 'dinamic'
				 * @property {string} - className - Присваивает класс HTML-объекту
				 * @static
				 */
				textGift.className = 'dinamic';


				/**
				 * @summary Крепит картинку c текстом в fieldset
				 * @property {method} - appendChild - Вставляет HTML-объект в DOM
				 * @static
				 */
				dateDiv.appendChild(gift);
				dateDiv.appendChild(textGift);

			/** Если день рождения был 2 дня назад или больше ... */
			} else if (difference < -1) {

				/**
				 * @summary Добавляет класс dinamic
				 * @property {string} - className - Присваивает класс HTML-объекту
				 * @static
				 */
				dateDiv.className = 'dinamic';

				/**
				 * @summary Выводим информацию о дате рождения на экран
				 * @property {string} innerHTML - Заносит текст в HTML
				 * @static
				 */
				dateDiv.innerHTML =

					'Сегодня ' + todayString + '<br />' +
					'День рождения ' + restoredPerson.name + ' ' + birthDate + '<br />' +
					'Ваш день рождения был ' + Math.abs(difference) + ' дн. назад<br />';

			/** Иначе (день рождения был +- 24 часа) ... */
			} else {

				/**
				 * @summary Добавляет класс dinamic
				 * @property {string} - className - Присваивает класс HTML-объекту
				 * @static
				 */
				dateDiv.className = 'dinamic';

				/**
				 * @summary Выводим информацию о дате рождения на экран
				 * @property {string} innerHTML - Заносит текст в HTML
				 * @static
				 */
				dateDiv.innerHTML =

					'Сегодня ' + todayString + '<br />' +
					'День рождения ' + restoredPerson.name + ' ' + birthDate + '<br />' +
					'Будем праздновать через ' + difference + ' дн.<br />';

			}
		};

// BOOKMARK SaveBirthday()

		/**
		 * @summary Сохраняет объект и показывает сколько дней осталось до дня рождения
		 * @name saveBirthday
		 * @type {function}
		 * @description Создаем объект для хранения пары имя-дата рождения
		 * Сохраняем в объект данные
		 * Вызываем showBirthday(), чтобы подсчитать и показать сохраняемую информацию
		 * @summary  Сохраняем объект в локальное хранилище
		 */
		var saveBirthday = function () {

			/**
			 * @summary Создаем объект для сохранения имени и даты рождения
			 * @name person
			 * @type {object}
			 * @property {string} - name - Имя объекта
			 * @property {Date} - dateOfBirth - Дата рождения объекта
			 */
			var person = {
				'name': 'Имя',
				'dateOfBirth': "Дата рождения"
			};

			/**
			 * @summary Считывает имя объекта из HTML
			 * @property {string} name - Имя объекта
			 * @static
			 */
			person.name = nameField.value;

			/**
			 * @summary Считывает дату рождения объекта из из HTML
			 * @property {Date} dateOfBirth - Дата рождения объекта
			 * @static
			 */
			person.dateOfBirth = birthField.value;

			/**
			 * @summary Конвертируем в JSON и сoхраняем в Локальное хранилище
			 * @property {method} setItem - Сохраняет пару ключ-значение в Локальном хранилище
			 * @param {string} - person.name - Имя объекта
			 * @param {string} - JSON.stringify(person) - JSON-объект, преобразованный в строку
			 * @static
			 */
			localStorage.setItem(person.name, JSON.stringify(person));

			/**
			 * @summary Подсчитывает даты и выводит информацию на экран
			 * @param {object} - person - имя и дата рождения
			 */
			showBirthday(person);
		};

		// ----------------------------------------------------------------- Показываем данные --
// BOOKMARK ShowItems()

		/*
		 * @name showItems
		 * @type {function}
		 *
		 * @description Если в Локальном/ Сессионном хранилище/ WEB SQL DB пустота ...
		 * Показываем, что здесь ничего нет
		 * Иначе - создаем динамическую табличку {@link itemsList}
		 * Циклом бежим по всем данным
		 * Если находим JSON-объект, то конвертируем его
		 * Заполняем ими табличку {@link itemsList}
		 * К каждой паре ключ-значение добавляем кнопку "Удалить"
		 * Вешаем на кнопку динамический обработчик на клик
		 * @summary Показываем в табличке {@link itemsList} содержимое локального хранилища
		 */
		var showItems = function () {

			/**
			 * @summary Очищает {@link itemsList}
			 * @property {string} innerHTML - Вставляет текст в HTML
			 * @static
			 */
			itemsList.innerHTML = '';


			/**
			 * @summary Переменные для хранилища, ключа и значения, 
			 * и тела функции для динамического обработчика
			 *
			 */
			var storage, key, data, funcString;

			if (event.target.id === "showLocalStorage" || event.target.id === "showSessionStorage") { 

				/** @summary Выясняем что показывать */
			if (event.target.id === "showLocalStorage") {

      			storage = localStorage;
      			funcString = 'localStorage.removeItem(this.key)';
      		}
			if(event.target.id === "showSessionStorage") {

  				storage = sessionStorage;
  				funcString = 'sessionStorage.removeItem(this.key)';
  			}

  			/** Если в Локальном хранилище пустота ... */
			if (storage.length === 0) {

				createEmptyRow("storage", "Storage is Empty");
			}

			/** Если в Локальном хранилище что-то есть ... */
			if (storage.length > 0) {

				/** Пробегаем по всем элементам */
				for (var i = 0; i < storage.length; i++) {

					/** Присваиваем значения текущей пары во временные переменные */

					/**
					 * @summary Временная переменная для ключа
					 * @name key
					 * @type {string}
					 */
					key = storage.key(i);

					/**
					 * @summary Временная переменная для значения (JSON-объект)
					 * @name data
					 * @type {object | string}
					 */
					data = storage.getItem(key);

					/** Создаем и заполняем элементы таблички {@link itemsList} */
					var table = createTable(itemsList, key, data, funcString);				

				} // FOR END

			} // IF END
		} else if(event.target.id ==="showWebDbData") {

  				showWebDb(funcString);
  			}

		}; // SHOW ITEMS END

		/**
		 * @summary Показывает все записи BD
		 * @name showWebDb
		 * @type {function}
		 */
		var showWebDb = function(funcString) {

			db.transaction(function(t) {
				db = openDatabase("storage_date", "1.0", "Web SQL Storage Demo Database", 1*1024*1024);
				t.executeSql("SELECT * FROM local_list", [], function(tx, result) {

					if(result.rows.length === 0) {createEmptyRow('', 'Sorry, but db is empty');}
					for(var i = 0; i < result.rows.length; i++) {
						var idn = result.rows.item(i)['local_key'];
						funcString = "db = openDatabase('storage_date', '1.0', 'Web SQL Storage Demo Database', '1*1024*1024'), db.transaction(function (t){t.executeSql('DELETE FROM local_list WHERE local_key = (?)', ['" + idn + "'])})";
						createTable(itemsList, result.rows.item(i)['local_key'], result.rows.item(i)['local_value'], '('+ funcString + ')');
					}}, null);
				}); 
			};

		/**
		 * @summary Создает ряд с сообщением о том, что в хранилище пусто
		 * @name createEmptyRow
		 * @type {function}
		 */
		var createEmptyRow = function(storageName, message) {

			/** Аргументы по умолчанию */
			var name = (storageName) ? storageName : 'list';
			var msg = (message) ? message : 'You have no items in your ' + name;
			
			/**
			 * @summary Создает ряд для {@link itemsList}
			 * @name noneItem
			 * @type {object}
			 */
			var noneItem = document.createElement('tr');

			/**
			 * @summary Создаем ячейку для {@link itemsList}
			 * @name noneTd
			 * @type {object}
			 */
			var noneTd = document.createElement('td');

			/**
			 * @summary Показываем, что в Локальном хранилище нет данных
			 * @property {string} innerHTML - Вставляет текст в HTML
			 * @static
			 */
			noneTd.innerHTML = message;

			/**
			 * @summary Крепит ячейку в ряд
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			noneItem.appendChild(noneTd);

			/**
			 * @summary Крепит ряд в {@link itemsList}
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			itemsList.appendChild(noneItem);
		}

		/** 
		* @description Создает ряд таблицы с тремя ячейками
		* для динамического показа содержимого.
		* Третья ячейка - кнопка "Удалить" с динамическим обработчиком
		* @name createTable
		* @type {function}
		* @param {object} itemsList Существующая HTML-Таблица
		* @param {string} key 1-я ячейка - Значение ключа 
		* @param {string} value 2-я ячейка - Значение значения. С проверкой значения на JSON и парсингом в строку
		* @return {object} 
		*/
		var createTable = function(itemsList, key, data, funcString) {

			/**
			 * @summary Возвращаемый объект с html/css для таблицы показа содержимого
			 * @name htmlTable
			 * @property {object} tr ряд для таблицы
			 * @property {object} tdKey ячейка для ключа
			 * @property {object} tdDel ячейка для кнопки "Удалить"
			 * @return {object} заполненный значениями
			 */
			var htmlTable = {};
			/**
			 * @summary Создает новый ряд для {@link itemsList}
			 * @property {object} tr ряд для таблицы
			 * @property {object} tdValue ячейка для значения
			 */
			htmlTable.tr = document.createElement('tr');

			/**
			 * @summary Создает ячейку для ключа
			 * @property {object} tdKey ячейка для ключа
			 */
			htmlTable.tdKey = document.createElement('td');
			htmlTable.tdKey.innerHTML = key;

			/**
			 * @summary Создает ячейку для значения
			 * @property {object} tdValue ячейка для значения
			 */
			htmlTable.tdValue = document.createElement('td');

			/** Проверяем значение поля на наличие JSON-объекта */
			if (data.substr(0, 1) === '{') {

				/** Если да - то парсим */
				htmlTable.tdValue.innerHTML = JSON.parse(data).dateOfBirth;

			} else {

				/**
				 * @description Если значение {@link data} - простая строка,
				 * тогда присваиваем значение в ячейку {@link tdValue}
				 * @property {string} innerHTML - Вставляет текст в HTML
				 * @static
				 */
				htmlTable.tdValue.innerHTML = data;
			}

			/**
			 * @summary Крепит Вставляем ряд {@link newItem} в таблицу {@link itemsList}
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			itemsList.appendChild(htmlTable.tr);

			/**
			 * @summary Крепит в ряд ячейку с ключом {@link tdKey}
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			htmlTable.tr.appendChild(htmlTable.tdKey);

			/**
			 * @summary Крепит в ряд ячейку с датой рождения {@link tdValue}
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			htmlTable.tr.appendChild(htmlTable.tdValue);

			/**
			 * @summary Создает ячейку для удаления
			 * @property {object} tdDel ячейка для кнопки "Удалить"
			 */
			htmlTable.tdDel = document.createElement('td');

			/**
			 * @summary Создает кнопку для удаления
			 * @property {object} tdDel Кнопка "Удалить"
			 */
			htmlTable.del = document.createElement('input');

			/**
			 * @summary Крепит в ряд в ячейку кнопку для удаления {@link del}
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			htmlTable.tdDel.appendChild(htmlTable.del);

			/**
			 * @summary Крепит ячейку {@link tdDel} с кнопкой в ряд
			 * @property {method} - appendChild - Вставляет HTML-объект в DOM
			 * @static
			 */
			htmlTable.tr.appendChild(htmlTable.tdDel);

			/**
			 * @description Присваиваем {@link key} как свойство в кнопку {@link del}
			 * (иначе - не доступно)
			 * @property {string} - key -
			 * @static
			 */
			/** @property {string} Присваиваем key как свойство в кнопку (иначе - не доступен) */
			htmlTable.del.key = key;

			/**
			 * @summary Удаляет данные из текущей строки из Локального хранилища
			 * @listens click:mouseEvent
			 * @description Создаем динамический обработчик и вешаем его на кнопку удаления
			 */
			htmlTable.del.onclick = new Function(funcString);

			

			/**
			 * @summary Стилизуем кнопку для удаления
			 * @property {method} style - Добавляет CSS-свойства к HTML-Элементу
			 */
			htmlTable.del.style.backgroundImage = "url('../../img/del.png')";

			/** @property {string} - type - Это кнопка */
			htmlTable.del.type = 'button';
			/** @property {string} - value - На ней написано Delete */
			htmlTable.del.value = 'Delete';
			/** @property {string} - backgroundRepeat - Фон не повторяется */
			htmlTable.del.style.backgroundRepeat = 'no-repeat';
			/** @property {string} - backgroundSize - Картинка по размеру фона */
			htmlTable.del.style.backgroundSize = 'contain';
			/** @property {string} - backgroundColor - Фон кнопки белого цвета */
			htmlTable.del.style.backgroundColor = 'orange';

			/** @property {string} backgroundImage - Паттерн для фона таблицы {@link itemsList} */
			document.getElementById('storageData').style.backgroundImage = "url('http://www.subtlepatterns.com/patterns/white_leather.png')";

			return htmlTable;
		}

		/**
		 * @summary Очистка Локального хранилища
		 * @name clearLocalStorage
		 * @type {function}
		 */
		var clearLocalStorage = function () {
			localStorage.clear();
		};

		/**
		 * @summary Очистка Сессионного хранилища
		 * @name clearSessionStorage
		 * @type {function}
		 */
		var clearSessionStorage = function () {
			sessionStorage.clear();
		};

// BOOKMARK Storage Event

		/**
		 * @summary Сплошной глюк ...
		 * @name storageChanged
		 * @type {function}
		 * @iistens onstorage:Misc Events
		 *
		 * @description Абсолютно бредовое событие
		 * Срабатывает (причем 2 раза) только если после изменения хранилища
		 * Открыть в браузере другую страницу того же сайта
		 * В качестве измененного ключа видит Modernizr
		 */
		/*var storageChanged = function (event) {
			alert('URL: ' + event.url + '\n' +
					'KEY: ' + event.key + '\n' +
					'OLD VALUE: ' + event.oldValue + '\n' +
					'NEW VALUE: ' + event.newValue + '\n' +
					'STORAGE AREA: ' + event.storageArea + '\n');
		};*/

// BOOKMARK SearchData()

		/**
		 * @summary - Ищет данные в локальном либо сессионном хранилище
		 * @name searchData
		 * @type {function}
		 * @description Вводим ключ для поиска в &lt;input&gt;
		 * (можно имена и даты)
		 * для ключа либо Локального, либо Сессионного хранилища
		 * (в зависимости, от того, где хотим искать)
		 * Жмем кнопку поиска - видим результат
		 */
		var searchData = function () {

			/** Объявляем переменные здесь, чтобы были доступны из функций */

			/**
			 * @summary Локальное или Сессионное хранилище
			 * @name searchField
			 * @type {object}
			 */
			var searchField;

			/**
			 * @name searchKey
			 * @summary Ключ поиска
			 * @type {string}
			 */
			var searchKey;

			/**
			 * @name searchResult
			 * @summary Результат
			 * @type {string}
			 */
			var searchResult;

			/** Если в <input> Локального хранилища что-то есть ... */
			if (keyLocal.value !== '') {

				/**
				 * @description Если в &lt;input&gt; для Локального хранилища есть данные,
				 * то в поле для поиска запоминаем объект Локального хранилища
				 * @type {object}
				 */
				searchField = window.localStorage;

				/**
				 * @summary Ищем по введенному в поле ключу
				 * @type {string}
				 */
				searchKey = keyLocal.value;

				/**
				 * @summary Данные, которые ему соответствуют
				 * @type {string}
				 */
				searchResult = dataLocal;

			}

			/** Если что-то есть в &lt;input&gt; Сесссионного хранилища ... */
			if (keySession.value !== '') {

				/**
				 * @description Если в &lt;input&gt; для Сессионного хранилища есть данные,
				 * то в поле для поиска запоминаем объект Сессионного хранилища
				 * @type {object}
				 */
				searchField = window.sessionStorage;

				/**
				 * @summary Ищем по введенному в поле ключу
				 * @type {string}
				 */
				searchKey = keySession.value;

				/**
				 * @summary Данные, которые ему соответствуют
				 * @type {string}
				 */
				searchResult = dataSession;

			}

			/** Собственно поиск : Бежим по хранилищу ... */
			for (var i = 0; i < searchField.length; i++) {

				/** И просто сравниваем ключи ... */
				if (searchField.key(i) === searchKey) {

					/** Если найден JSON объект */
					if (searchField.getItem(searchKey).substr(0, 1) == '{') {

						/**
						 * @summary Очищаем значение
						 * @property {string} - value - Значение, содержащееся в Локальном хранилище
						 */
						keyLocal.value = '';

						/**
						 * @summary Показываем значение ключа поиска из &lt;input&gt;-a для имени
						 * @property {string} - value - Значение, содержащееся в Локальном хранилище
						 */
						nameField.value = searchKey;

						/**
						 * @summary Конвертируем JSON и достаем из него строку с датой
						 * @name obj
						 * @type {string}
						 */
						var obj = JSON.parse(searchField.getItem(nameField.value));

						/**
						 * @summary Полученную строку превращаем в дату
						 * @name dtn
						 * @type {Date}
						 */
						var dtn = new Date(JSON.stringify(obj.dateOfBirth));

						/**
						 * @summary Приводим год к формату, который переварит input type='date'
						 * @name year
						 * @type {Data}
						 */
						var year = dtn.getFullYear();

						/**
						 * @summary Приводим месяц к формату, который переварит input type='date'
						 * @name month
						 * @type {Data}
						 */
						var month = dtn.getMonth();

						/**
						 * @summary Преобразовываем месяц в число и инкрементируем его
						 * @name month
						 * @type {number}
						 */
						month = parseInt(month);

						/** В Java Script месяцы отсчитываются от 0 */
						month++;

						/** <input type='date' не понимает день и месяц без нолика */
						if (month <= 9) {

							/** Добавляем его для значений меньше 10 */
							month = '0' + month;
						}

						/** Аналогично с днями ... */
						var day = dtn.getDate();

						if (day <= 9) {
							day = '0' + day;
						}

						/** Теперь склеиваем в кучу полученные значения и показываем их */
						birthField.value = year + '-' + month + '-' + day;

					} else {

						/** Для не JSON-объектов все намного проще */
						searchResult.value = searchField.getItem(searchKey);

					}

				} // IF END

			} // FOR END

		}; // SEARCH DATA() END


/*
 * ********************************************************* Java Script FileAPI **
 */
// BOOKMARK .......................................................... DRAG'N'DROP

		/**
		 * @summary Поле для вставки картинки
		 * @name dropBox
		 * @type {object}
		 */
		var dropBox = document.getElementById('dropBox');

		/**
		 * @summary Запрещаем всплывание
		 * @name ignoreDrag
		 * @type {function}
		 * @param {event} e:mouseEvent Событие перетаскивания
		 * @description Обеспечиваем, чтобы никто другой не получил это событие,
		 * пока мы выполняем операцию перетаскивания
		 */
		var ignoreDrag = function (e) {

			e.stopPropagation();
			e.preventDefault();

		};

		/**
		 * @summary Получаем перемещенные файлы и передаем их на обработку
		 * @name drop
		 * @type {function}
		 * @param {event} e:mouseEvent Событие drop
		 */
		var drop = function (e) {

			/** Аннулируем это событие для всех других */
			e.stopPropagation();
			e.preventDefault();

			/** Получаем перемещенные файлы */
			var data = e.dataTransfer;
			var files = data.files;

			/** Передаем полученный файл функции для обработки файлов */
			processFiles(files);

		};

		/**
		 * @summary Обрабатывает дропнутые файлы
		 * @name processFiles
		 * @type {function}
		 * @param {Array.<file>} files Массив с дропнутыми файлами (если их несколько)
		 */
		var processFiles = function (files) {

			/**
			 * @summary Первый элемент массива с дропнутыми файлами
			 * @name file
			 * @type {Array.<file>}
			 */
			var file = files[0];

			/**
			* @summary Запускаем файл-ридер
			* @name reader
			* @type {object}
			*/
			var reader = new FileReader();

			/**
			 * @listens onload:documentEvent
			 * @type {object}
			 * @listens onload:DocumentEvent
			 * @param event e:MouseEvents
			 * @summary После полной загрузки ридера заполняем фон изображением
			 */
			reader.onload = function(e) {

				/** Используем URL изображения для заполнения фона */
				dropBox.style.backgroundImage = "url('" + e.target.result + "')";
				dropBox.style.width = files[0].width;
				dropBox.style.height = files[0].style.height;

			};

			/** Начинаем считывать изображение */
			reader.readAsDataURL(file);

		};

/*
* ********************************************************* WEB DATA BASE **
*/
// BOOKMARK .......................................................... WEB DATA BASE
		
		/**
		 * @summary База данных
		 * @name db
		 * @type {function}
		 */
		var db;

		/**
		 * @summary Создает базу данных
		 * @name createWebDb
		 * @type {function}
		 */
		var createWebDb = function() {

			/**
			 * @summary Создаем базу данных
			 * @type {object}
			 * @name db
			 */
			db = openDatabase("storage_date", "1.0", "Web SQL Storage Demo Database", 1*1024*1024);

			/**
			 * @summary Создает таблицы
			 * @property {function} transaction Обращение к базе данных
			 */
			db.transaction(
				function(t) { // This is the callback with "t" as the transaction object
					t.executeSql("CREATE TABLE IF NOT EXISTS local_list(local_key NOT NULL, local_value)");
				}
			);

			return db;
		}

		/**
		 * @summary Удаляет таблицу local_list
		 * @name dropWebDb
		 * @type {function}
		 */
		var dropWebDb = function() {

			/**
			 * @summary Удаление таблицы
			 * @property {function} transaction Обращение к базе данных
			 */
			db.transaction(
				function(t) { // This is the callback with "t" as the transaction object
					t.executeSql('DROP TABLE local_list');
				}
			);

			return db;
		}

		/**
		 * @summary Счетчик рекурсивных обращений
		 * @name i
		 * @type {number}
		 */
		var i = 0;

		/**
		 * @summary Считывает информацию из локального хранилища
		 * @name readStorageData
		 * @type {function}
		 * @param {string} Ключ в локальном хранилище
		 * @param {string} Значение в локальном хранилище
		 */
		function readStorageData(local_key, local_value) {

			/**
			 * @summary Вносит значения в базу данных
			 * @property {function} transaction Обращение к базе данных
			 */
			db.transaction(function(t) {

				var lKey = localStorage.key(i);
				var lValue = localStorage.getItem(lKey);

				// FEATURES - Борьба с асинхронными запросами к WEB DB при помощи рекурсии
				/** Выполняем SQL запрос на добавление записи в таблицу */
				t.executeSql("INSERT INTO local_list (local_key, local_value) VALUES (?, ?)", [lKey, lValue],
					function() {

						// FEATURES - Странное использование i
						if(++i < localStorage.length) {
							readStorageData(local_key, local_value);
						}
						else return;
					}
				);

			});
		}

// BOOKMARK STORAGE LISTENERS

		/** Вешаем обработчики для хранилища */

		/** 
		 * @summary Работает, но закомментировано, потому что мешает
		 * @listens onstorage:storageEvent Изменение Локального хранилища 
		 */
		//window.onstorage = storageChanged;
		/** @listens click:mouseEvent Нажатие на кнопку Create WEB SQL DB */
		createWebDbButton.onclick = createWebDb;
		/** @listens click:mouseEvent Нажатие на кнопку Read From Storage to DB */
		readFromStorageToDbButton.onclick = readStorageData;
		/** @listens click:mouseEvent Нажатие на кнопку Save In WEB SQL DB */
		saveDataInWebDB.onclick = saveData;
		/** @listens click:mouseEvent Нажатие на кнопку Drop Table */
		dropTableWebDB.onclick = dropWebDb;
		/** @listens click:mouseEvent Нажатие на кнопку Show DB */
		showWebDbButton.onclick = showItems;

		/** @listens click:mouseEvent Нажатие на кнопку Save In Local */
		saveInLocal.onclick = saveData;
		/** @listens click:mouseEvent Нажатие на кнопку Save In Session */
		saveInSession.onclick = saveData;
		/** @listens click:mouseEvent Нажатие на кнопку Show Local */
		showLocal.onclick = showItems;
		/** @listens click:mouseEvent Нажатие на кнопку Show Session */
		showSession.onclick = showItems;
		/** @listens click:mouseEvent Нажатие на кнопку Сlear Local */
		clearLocal.onclick = clearLocalStorage;
		/** @listens click:mouseEvent Нажатие на кнопку Сlear Session */
		clearSession.onclick = clearSessionStorage;
		/** @listens click:mouseEvent Нажатие на кнопку Save Birthday */
		saveBirthButton.onclick = saveBirthday;
		/** @listens click:mouseEvent Нажатие на кнопку Search */
		searchButton.onclick = searchData;
		/** @listens onchange:DOM-Event Загрузка файла в &lt;input&gt; */
		inputFile.onchange = processFiles;
		/** @listens ondragenter:DOM-Event Начало перетаскивания */
		dropBox.ondragenter = ignoreDrag;
		/** @listens ondragover:DOM-Event Перетаскивание файлов */
		dropBox.ondragover = ignoreDrag;
		/** @listens ondrop:DOM-Event Дроп */
		dropBox.ondrop = drop;

	} // STORAGE END

// BOOKMARK .......................................................... CANVAS IN FRAME

	/** Если в браузере фрейм, а во фрейме Canvas ... */
	if (window.parent.location.pathname === '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-canvas.html') {

		/** Если в браузере фрейм ... */
		if (window.parent.location.pathname === '/doc/html5/frameset.html') {

			/**
			 * @summary Находим Canvas
			 * @name canvas
			 * @type {object}
			 */
			var canvas = mainIFrame.contentDocument.getElementById('canvasField');

			/**
			 * @summary Получаем Context
			 * @name context
			 * @type {object}
			 */
			var context = canvas.getContext('2d');

/** --------------------------------------------------------------- Запустить Canvas -- */
// NOTE Почему в таком случае не работает обычный RUN??????

			/**
			 * @summary Кнопка Запустить Canvas
			 * @listens click:MouseEvents
			 *
			 * @description - Считывает содержимое строки с кодом
			 * и запускает результат на выполнение в eval
			 */
			mainWindow.getElementById('runCanvasButton').onclick = function() {
				eval(codeStr.value);
			};

/* --------------------------------------------------------------- Очистить строку с кодом -- */

			/**
			 * @summary Кнопка Сбросить код
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Обнуляет содержимое строки с кодом
			 */
			mainWindow.getElementById('clearCodeString').onclick = function() {
				codeStr.value = '';
			};


/* --------------------------------------------------------------- Начать новый путь -- */
// BOOKMARK CANVAS Begin Path()

			/**
			 * @summary Кнопка Начать новый путь
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Сбрасывает предыдущие настройки
			 */
			mainWindow.getElementById('beginPath').onclick = function() {
				codeStr.value += "context.beginPath();\n";
			};

/* --------------------------------------------------------------- Закрыть путь -- */

			/**
			 * @summary Кнопка Закрыть путь
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Сбрасывает текушие настройки
			 */
			mainWindow.getElementById('closePath').onclick = function() {
				codeStr.value += "context.closePath();\n";
			};

/* --------------------------------------------------------------- Перезагрузить холст -- */
// BOOKMARK CANVAS холст

			/**
			 * @summary - Кнопка Перезагрузить
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Очистить холст, оставив все настройки как было
			 */
			mainWindow.getElementById('reloadCanvas').onclick = function() {
				canvas.width = canvas.width;
			};

/* --------------------------------------------------------------- Восстановмть холст -- */
// FIXME Кнопка Восстановить - Don't working

			/**
			 * @summary - Кнопка Восстановить
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Должна бы восстанавливать предыдущие настройки
			 */
			mainWindow.getElementById('restoredCanvas').onclick = function() {
				context.restore();
			};

/* --------------------------------------------------------------- Сдвмнуть сетку -- */

			/**
			 * @summary - Кнопка Транслировать холст
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Сдвигает холст на 100px влево и вниз
			 */
			mainWindow.getElementById('moveCanvasButton').onclick = function() {
				codeStr.value += "context.translate(100,100);\n";
			};

/* --------------------------------------------------------------- Повернуть сетку -- */

			/**
			 * @summary - Кнопка  Повернуть Canvas
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Сдвигает холст на 5 радиан? влево и вниз
			 */
			mainWindow.getElementById('rotateCanvasButton').onclick = function() {
				codeStr.value += "context.rotate(5);\n";
			};

/* --------------------------------------------------------------- Начальная точка -- */
// BOOKMARK Canvas Lines

			/**
			 * @summary - Кнопка Начальная точка
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Ставит каретку на 300px по X-оси (вдоль) и на 100px по Y-оси (сверху вниз)
			 */
			mainWindow.getElementById('moveTo').onclick = function() {
				codeStr.value += "context.moveTo(300, 100);\n";
			};

/* --------------------------------------------------------------- Конечная точка -- */

			/**
			 * @summary - Кнопка Конечная точка
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Ставит каретку на 500px по X-оси (вдоль) и на 100px по Y-оси (сверху вниз)
			 */
			mainWindow.getElementById('lineTo').onclick = function() {
				codeStr.value += "context.lineTo(500, 100);\n";
			};

/* --------------------------------------------------------------- Ширина линии -- */

			/**
			 * @summary - Кнопка Ширина линии
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Устанавливает ширину линии в 10px
			 */
			mainWindow.getElementById('lineWidth').onclick = function() {
				codeStr.value += "context.lineWidth = 10;\n";
			};

/* --------------------------------------------------------------- Цвет линии -- */

			/**
			 * @summary - Кнопка Цвет линии
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Линия будет красного цвета
			 */
			mainWindow.getElementById('strokeStyle').onclick = function() {
				codeStr.value += "context.strokeStyle = 'red';\n";
			};

/* --------------------------------------------------------------- Закруглить концы линии -- */

			/**
			 * @summary - Кнопка Закруглить
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Закругляет концы линии
			 */
			mainWindow.getElementById('lineCapRound').onclick = function() {
				codeStr.value += "context.lineCap = 'round';\n";
			};

/* --------------------------------------------------------------- Заквадратить концы линии -- */

			/**
			 * @summary - Кнопка Заквадратить
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Концы линии будут квадратными
			 */
			mainWindow.getElementById('lineCapSquare').onclick = function() {
				codeStr.value += "context.lineCap = 'square';\n";
			};

/* --------------------------------------------------------------- Соединить концы -- */

			/**
			 * @summary - Кнопка Соединить
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Соединяет начальную и конечную точки
			 */
			mainWindow.getElementById('stroke').onclick = function() {
				codeStr.value += "context.stroke();\n";
			};

/* --------------------------------------------------------------- Canvas-Текст -- */
// BOOKMARK Canvas Text

			/**
			 * @summary - Кнопка Текст
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Контур текста
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Прямая линия
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Рисует прямую линию
			 */
			mainWindow.getElementById('straightLine').onclick = function() {
				codeStr.value += "context.moveTo(300, 100);\ncontext.lineTo(700, 100);\ncontext.stroke();\n";
			};

/* --------------------------------------------------------------- Кривая -- */

			/**
			 * @summary - Кнопка Кривая
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Дуга
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Круг
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Залитый прямогольник
			 * @type {HTML-Eleement}
			 * @listens click:MouseEvents
			 *
			 * @description - Рисует закрашенный прямоугольник
			 */
			mainWindow.getElementById('fillRect').onclick = function() {
				codeStr.value += "context.fillRect(300,50,800,450);\n";
			};

/* --------------------------------------------------------------- Незалитый прямоугольник -- */

			/**
			 * @summary - Кнопка Незалитый прямоугольник
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Рисует незакрашенный прямоугольник
			 */
			mainWindow.getElementById('strokeRect').onclick = function() {
				codeStr.value += "context.strokeRect(300,50,800,450);\n";
			};

/* --------------------------------------------------------------- Вершины фигур -- */
// BOOKMARK Вершины фигур

			/**
			 * @summary - Кнопка Закруглить вершины
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Закругляет вершины фигуры
			 */
			mainWindow.getElementById('lineJoinRound').onclick = function() {
				codeStr.value += "context.lineJoin = 'round';\n";
			};

			/**
			 * @summary - Кнопка Обрезать вершины
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Вершины фигуры будут уголком
			 */
			mainWindow.getElementById('lineJoinBever').onclick = function() {
				codeStr.value += "context.lineJoin = 'bevel';\n";
			};

/* --------------------------------------------------------------- Залить -- */

			/**
			 * @summary - Кнопка Залить
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Залить фигуру
			 */
			mainWindow.getElementById('fill').onclick = function() {
				codeStr.value += "context.fill();\n";
			};

/* --------------------------------------------------------------- Цвет заливки -- */
// BOOKMARK Canvas Colors

			/**
			 * @summary - Кнопка Цвет заливки
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Установить цвет заливки
			 */
			mainWindow.getElementById('fillStyle').onclick = function() {
				codeStr.value += "context.fillStyle = 'yellow';\n";
			};

/* --------------------------------------------------------------- Прозрачность -- */

			/**
			 * @summary - Кнопка Прозрачность
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Устанавливает прозрачность
			 */
			mainWindow.getElementById('opasity').onclick = function() {
				codeStr.value += "context.globalAlpha = 0.5;\n";
			};

/* --------------------------------------------------------------- Цвет тени -- */
// BOOKMARK Canvas Shadows

			/**
			 * @summary - Кнопка Цвет тени
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Устанавливает цвет для тени
			 */
			mainWindow.getElementById('shadowColor').onclick = function() {
				codeStr.value += "context.shadowColor = 'red';\n";
			};

/* --------------------------------------------------------------- Размытие тени -- */

			/**
			 * @summary - Кнопка Размытие тени
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Устанавливает размытие тени в пикселах
			 */
			mainWindow.getElementById('shadowBlur').onclick = function() {
				codeStr.value += "context.shadowBlur = 20;\n";
			};

/* --------------------------------------------------------------- Расположение -- */

			/**
			 * @summary - Кнопка Расположение тени
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Устанавливает сдвиг тени
			 */
			mainWindow.getElementById('shadowPosition').onclick = function() {
				codeStr.value += "context.shadowOffsetX = 10;\ncontext.shadowOffsetY = 10;\n";
			};

/* --------------------------------------------------------------- Создать градиент -- */
// BOOKMARK Canvas Градиенты

			/**
			 * @summary - Кнопка Создать градиент
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Создает линейный градиент
			 */
			mainWindow.getElementById('createGradient').onclick = function() {
				codeStr.value = "var gradient = context.createLinearGradient(300,50,800,450);\n";
			};

/* --------------------------------------------------------------- Добавить цвет -- */

			/**
			 * @summary - Кнопка Добавить цвет
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Добавляет цвет к градиенту
			 */
			mainWindow.getElementById('addColor').onclick = function() {
				codeStr.value += "gradient.addColorStop(0, 'magenta');\n";
			};

/* --------------------------------------------------------------- Залить градиентом -- */

			/**
			 * @summary - Кнопка Залить градиентом
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Устанавливает градиентную заливку
			 */
			mainWindow.getElementById('fillGradient').onclick = function() {
				codeStr.value += "context.fillStyle = gradient;\n";
			};

/* --------------------------------------------------------------- Готовые градиенты -- */

/* --------------------------------------------------------------- Двухцветный линейный -- */

			/**
			 * @summary - Кнопка Двухцветный линейный
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Двухцветный радиальный
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Многоцветный линейный
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Многоцветный радиальный
			 * @type {object}
			 * @listens click:MouseEvents
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


			/**
			 * @summary Создаем картинку для экспериментов
			 * @name canvasImage
			 * @type {object}
			 */
			var canvasImage = new Image();

			/**
			 * @summary - Кнопка Выбрать картинку
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Выбираем картинку
			 */
			mainWindow.getElementById('selectPicture').onclick = function() {
				codeStr.value += "img.src='../../img/ok.png';\n";
			}

/* --------------------------------------------------------------- Загрузить картинку -- */

			/**
			 * @summary - Кнопка Загрузить картинку
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Выбираем и грузим двумя разными действиями,
			 * чтобы картинка успела загрузиться
			 * после того, как она получит src
			 */
			mainWindow.getElementById('insertPicture').onclick = function() {
				codeStr.value =
					"context.drawImage(img,500,50,500,500);\n";
			}

/* ---------------------------------------------------- Заполнить холст выбранными картинками -- */
// BOOKMARK Save Canvas()

			/**
			 * @summary - Кнопка Заполнить холст
			 * @type {object}
			 * @listens click:MouseEvents
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
			 * @summary - Кнопка Сохранить содержимое холста в файл
			 * @type {object}
			 * @listens click:MouseEvents
			 *
			 * @description - Сохранить Canvas
			 */
			mainWindow.getElementById('saveCanvas').onclick = function() {

				/**
				 * @summary Контейнер для сохранения изображения
				 * @name imageCopy
				 * @type {object}
				 */
				var imageCopy = mainIFrame.contentDocument.getElementById('savedImageCopy');

				/** @property {string} src - Переносим в картинку содержимое холста */
				imageCopy.src = canvas.toDataURL();

				/**
				 * @summary &lt;div&gt; с картинкой для сохранения canvas
				 * @name imageContainer
				 * @type {object}
				 */
				var imageContainer = mainIFrame.contentDocument.getElementById('savedCopyContainer');

				/** @property {string} style - Показываем &lt;div&gt; заодно с картинкой */
				imageCopy.style.display = 'inline-block';
				/** @property {string} style - Позиционируем &lt;div&gt; с картинкой */
				imageContainer.style.display = 'block';

				// FIXME Don't working
				context.save();
			} // saveCanvas

// BOOKMARK .......................................................... CANVAS RANDOM CIRCLE

/* --------------------------------------------------------------- Случайный круг -- */

			/**
			 * @constructor Circle
			 * @type {object}
			 * @property {number} x Текущая x-координата
			 * @property {number} y Текущая y-координата
			 * @property {number} dx Индекс изменения абсциссы
			 * @property {number} dy Индекс изменения ординаты
			 * @property {number} radius Радиус круга
			 * @property {string} color Цвет круга
			 * @property {string} borderColor Цвет рамки
			 * @property {boolean} isSelected Метка для круга, выбранного в текущий момент
			 * @returns {Circle}
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

			/**
			 * @summary Массив для хранения кругов
			 * @name circles
			 * @type {Array<Circle>}
			 */
			var circles = [];

			/**
			 * @summary Кнопка Случайный круг
			 * @listens click:MouseEvent
			 * @type {object}
			 */
			mainWindow.getElementById('randomRound').onclick = function() {

				/** Вешаем события здесь, чтобы они имелм доступ к функциям */

				/** @listens onmouseclick:mouseEvent Клик на Canvas */
				canvas.onmouseclick = canvasClick;
				/** @listens onmouseup:mouseEvent отКлик на Canvas */
				canvas.onmouseup = canvasClick;
				/** @listens onmousedown:mouseEvent Выход из Canvas */
				canvas.onmousedown = stopDragging;
				/** @listens onmousemove:mouseEvent Движение мыши */
				canvas.onmousemove = dragCircle;

				/**
				 * @summary - Генерирует произвольные числа в заданном диапазоне
				 * @name randomFromTo
				 * @type {function}
				 * @param {number} from - Начало диапазона
				 * @param {number} to - Конец диапазона
				 * @returns {number} - Случайное число
				 */
				function randomFromTo(from, to) {
					return Math.floor(Math.random() * (to - from + 1) + from);
				}

				/**
				 * @summary Радиус круга - Случайное число от 10 до 60
				 * @name randomRadius
				 * @type {number}
				 */
				var randomRadius = randomFromTo(10, 60);

				/**
				 * @summary Введенное в &lt;input&gt; пользовательское число
				 * @name inputValue
				 * @type {number}
				 */
				var inputValue = parseFloat(mainWindow.getElementById('ballSize').value);

				/**
				 * @summary Если в &lt;input&gt; пользовательское значение, то устанавливаем его
				 * @name radius
				 * @type {number}
				 */
				var radius = (inputValue === 15) ? randomRadius : inputValue;

				/**
				 * @summary Случайная Х-координата положения круга
				 * @name x
				 * @type {number}
				 */
				var x = randomFromTo(0, canvas.width);

				/**
				 * @summary Случайная Y-координата положения круга
				 * @name y
				 * @type {number}
				 */
				var y = randomFromTo(0, canvas.height);

				/**
				 * @summary Случайное ускорение по X-оси
				 * @type {number}
				 */
				var dx = randomFromTo(0.1, 0.9);

				/**
				 * @summary Случайное ускорение по Y-оси
				 * @name dy
				 * @type {number}
				 */
				var dy = randomFromTo(0.1, 0.9);

				/**
				 * @summary Массив с цветами для выбора случайного цвета
				 * @name colors
				 * @type {Array.<string>}
				 */
				var colors = [
					'red', 'green', 'blue', 'yellow', 'orange', 'rosybrown', 'magenta', 'brown', 'purple', 'pink',
					'coral', 'indianred', 'lime', 'seagreen', 'teal', 'cadetblue', 'steelblue', 'slategray',
					'blueviolet', 'crimson'
				];

				/**
				 * @summary Выбираем случайный цвет для круга
				 * @name color
				 * @type {string}
				 */
				var color = colors[randomFromTo(0, 20)];

				/**
				 * @summary Выбираем случайный цвет для радиуса круга
				 * @name borderColor
				 * @type {string}
				 */
				var borderColor = colors[randomFromTo(0, 20)];

				/**
				 * @summary Создаем круг
				 * @name circle
				 * @type {Circle}
				 */
				var circle = new Circle(x, y, dx, dy, radius, color, borderColor);

				/** @property {method} push - Сохраняем круг в массив */
				circles.push(circle);

				/** Рисуем круги из массива */
				drawCircles();

				/**
				 * @summary - Рисует круг на холсте
				 * @name drawCircles
				 * @type {function}
				 */
				function drawCircles() {

					/** @property {method} clearRect - Очищает холст */
					context.clearRect(0, 0, canvas.width, canvas.height);

					/** Бежим по массиву */
					for (var i = 0; i < circles.length; i++) {

						/**
						 * @summary Присваиваем текущий круг в переменную
						 * @name circle
						 * @type {Circle}
						 */
						var circle = circles[i];

						/**
						 * @summary Устанавливаем прозрачность для кругов
						 * @property {number} globalAlpha
						 */
						context.globalAlpha = 0.65;

						/**
						 * @summary Начинает новый путь
						 * @property {method} beginPath Новый путь, чтобы круги рисовались разных цветов
						 */
						context.beginPath();

						/**
						 * @summary Рисует дугу
						 * @property {method} arc Рисует текущий круг
						 */
						context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

						/**
						 * @summary Устанавливает цвет заливки
						 * @property {method} fillStyle Закрашивает круг
						 */
						context.fillStyle = circle.color;

						/**
						 * @summary Устанавливает цвет линии
						 * @property {method} strokeStyle Закрашиваем бордер
						 */
						context.strokeStyle = circle.borderColor;

						/**
						 * Если круг выбран, то выделяем выбранный круг рамкой,
						 * чтобы показать выделение
						 */
						if (circle.isSelected) {

							context.lineWidth = 7;

						} else {

							context.lineWidth = 3;
						}

						/**
						 * @summary Заливает холст
						 * @property {method} strokeStyle Закрашивает круг
						 */
						context.fill();

						/**
						 * @summary Закрашивает линию
						 * @property {method} strokeStyle Закрашивает рамку
						 */
						context.stroke();

					} // for

				} // drawCircles

				/**
				 * @summary Выбранный круг
				 * @name previousSelectedCircle
				 * @type {Circle}
				 */
				var previousSelectedCircle;

				/**
				 * @summary Создаем звук для клика
				 * @name clickSound
				 * @type {object}
				 */
				var clickSound = new Audio('../../media/popup.mp3');

				/**
				 * @name canvasClick
				 * @type {function}
				 * @param click:mouseClick
				 *
				 * @description Проверяем был ли клик по кругу или по холсту.
				 * Если по кругу, то делаем круг выбранным и перерисовываем холст
				 */
				function canvasClick(e) {

					// FIXME Попробовать сделать Canvas резиновым (e.clientX)

					/**
					 * @summary Выясняем X-координату клика
					 * @name clickX
					 * @type {number}
					 */
					var clickX = e.pageX - canvas.offsetLeft;

					/**
					 * @summary Выясняем Y-координату клика
					 * @name clickY
					 * @type {number}
					 */
					var clickY = e.pageY - canvas.offsetTop;

					/** Бежим по массиву с кругами и проверяем - попали ли по кругу */
					for (var i = circles.length - 1; i >= 0; i--) {

						/**
						 * @summary Присваиваем текущий круг в переменную
						 * @name circle
						 * @type {Circle}
						 */
						var circle = circles[i];

						/**
						 * @description С помощью теоремы Пифагора вычисляем расстояние от
						 * точки, в которой щелкнули, до центра текущего круга
						 * @name distanceFromCenter
						 * @type {number}
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

							/**
							 * @summary Запоминаем выбранный круг в переменную
							 * @type {Circle}
							 */
							previousSelectedCircle = circle;

							/**
							 * @summary Делаем текущий круг выбранным и перерисовываем круги
							 * @property {boolean} isSelected Выбран или не выбран круг
							 */
							circle.isSelected = true;

							/** Рисуем текущий круг */
							drawCircles();

							/** Разрешаем перетаскивание */
							isDragging = true;

							/** @property {method} play Играем звук */
							clickSound.play();

							/**
							 * @summary Обнуляет таймаут для анимации			 *
							 * @callback clearTimeout
							 * @memberof window
							 * @param {function} - timeoutIDForFallBalls - id для повторяемой функции
							 */
							clearTimeout(timeoutIDForFallBalls);

						}
					} // if
				} // canvasClick(e)

				/**
				 * @summary Запрещаем перетаскивание
				 * @name isDragging
				 * @type {boolean}
				 */
				var isDragging = false;

// BOOKMARK DragCircle()

				/**
				 * @summary Двигаем круг
				 * @name dragCircle
				 * @param {event} click:mouseEvent Клик по кругу
				 * @description Проверяем, установлена ли возможность перетаскивания.
				 * Если да, то обнуляем таймаут анимации,
				 * вычисляем координаты мыши и передвигаем к ним круг
				 */
				function dragCircle(e) {

					/** Проверка возможности перетаскивания */
					if (isDragging === true) {

						/** Прекращаем анимацию */
						clearTimeout(timeoutIDForFallBalls);

						/** Проверка попадания */
						if (previousSelectedCircle !== null) {

							/** Запоминаем координаты мыши */

							/**
							 * @summary x-координата выбранного круга
							 * @name x
							 * @type {number}
							 */
							var x = e.pageX - canvas.offsetLeft;
							/**
							 * @summary y-координата выбранного круга
							 * @name y
							 * @type {number}
							 */
							var y = e.pageY - canvas.offsetTop;

							/** @property {number} x x-координата мыши */
							previousSelectedCircle.x = x;
							/** @property {number} y y-координата мыши */
							previousSelectedCircle.y = y;

							/** Перерисовываем холст */
							drawCircles();

						}
					}
				} // dragCircle()

				/**
				 * @summary Остановка перетаскивания
				 * @name stopDragging
				 * @type {function}
				 */
				function stopDragging() {
					isDragging = false;
				}
			}; // randomRound

// BOOKMARK Canvas FallBalls()

			/**
			 * @summary Кнопка Анимировать круги
			 * @type {object}
			 * @listens click:MouseEvent
			 */
			mainWindow.getElementById('animateRound').onclick = function fallBalls() {

				/** @property {method} clearRect - Очищает холст */
				context.clearRect(0, 0, canvas.width, canvas.height);

				/** Перебираем наши мячики */
				for (var i = 0; i < circles.length; i++) {

					/** Перемещаем текущий мячик в новую позицию */

					/**
					 * @summary Запоминаем текущий круг в переменную
					 * @name circle
					 * @type Circle
					 */
					var circle = circles[i];

					/** Учитываем случайное ускорение */

					/** @property {number} x Текущая x-координата круга */
					circle.x += circle.dx;
					/** @property {number} y Текущая y-координата круга */
					circle.y += circle.dy;

					/** Добавляем эффект "гравитации", который ускоряет падение мячика */

					if ((circle.y) < canvas.height) {

						/** @property {number} y Текущая y-координата круга */
						circle.dy += 0.22;
					}

					/** Добавляем эффект "трения", который замедляет движение мячика */

					/** @property {number} dx Коэффициент ускорения круга */
					circle.dx = circle.dx * 0.998;

					/** Если мячик натолкнулся на край холста, отбиваем его */
					if ((circle.x + circle.radius > canvas.width) || (circle.x - circle.radius < 0)) {

						/** @property {number} dx Коэффициент ускорения круга */
						circle.dx = -circle.dx;
					}

					/** Если мячик упал вниз, отбиваем его, но слегка уменьшаем скорость */
					if ((circle.y + circle.radius > canvas.height) || (circle.y - circle.radius < 0)) {

						/** @property {number} dy Коэффициент ускорения круга */
						circle.dy = -circle.dy * 0.6;
					}

					/** Рисуем текущий мячик */

					/** @property {number} globalAlpha Коэффициент прозрачности круга */
					context.globalAlpha = 0.65;
					/** @property {method} beginPath Начинает новый путь */
					context.beginPath();
					/** @property {method} arc Рисует круг */
					context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
					/** @property {method} fillStyle Устанавливаем цвет для круга */
					context.fillStyle = circle.color;
					/** @property {method} strokeStyle Устанавливаем цвет для рамки */
					context.strokeStyle = circle.borderColor;

					/** Если текущий мячик выбран, то рисуем ему толстую рамку */
					if (circle.isSelected) {

						/** @property {number} lineWidth Устанавливаем ширину рамки */
						context.lineWidth = 7;

					/** Если нет, то рисуем ему тонкую рамку */
					} else {

						/** @property {number} lineWidth Устанавливаем ширину рамки */
						context.lineWidth = 3;
					}

					/** Запоминаем цвет и рамку в контекст */

					/** @property {method} fill Закрашивает круг */
					context.fill();
					/** @property {method} stroke Закрашивает рамку */
					context.stroke();
				}

				/** Повторяем процедуру для оставшихся мячиков */
				timeoutIDForFallBalls = setTimeout(fallBalls, 20);
			}

/* --------------------------------------------------------------- Очистить холст -- */

// BOOKMARK ClearCanvas

			/**
			 * @summary Очищаем холст
			 * @type {object}
			 * @listens click:MouseEvent			 *
			 * @description Удаляем круги из массива
			 * Обнуляем таймаут
			 */
			mainWindow.getElementById('clearCanvas').onclick = function() {

				/** @property {function} clearTimeout Обнуляет таймаут для fallBalls */
				clearTimeout(timeoutIDForFallBalls);

				/** Очищает массив */
				circles = [];

				/** @property {function} clearRect Полностью очищает Canvas */
				context.clearRect(0, 0, canvas.width, canvas.height);

				/** События для рисования куда-то делись - подключаем их еще раз ?????????? */

				/**
				 * @type {object}
				 * @listens ondblclick:mouseEvent
				 */
				canvas.ondblclick = startDrawing;

				/**
				 * @type {object}
				 * @listens onmouseup:mouseEvent
				 */
				canvas.onmouseup = stopDrawing;

				/**
				 * @type {object}
				 * @listens onmousemove:mouseEvent
				 */
				canvas.onmousemove = draw;

			}
		} // Если в браузере фрейм

// BOOKMARK Canvas Drawing with mouse

		/**
		 * @summary Запрещаем перетаскивание
		 * @name isDrawing
		 * @type {boolean}
		 */
		var isDrawing = false;

		/**
		 * @summary Устанавливает точку - куда рисовать
		 * @name startDrawing
		 * @type {function}
		 * @param {event} e dblclick:mouseEvent Двойной клик по холсту
		 */
		function startDrawing(e) {

			/**
			 * @summary Возможность рисования
			 * Без var, чтобы все знали!!!
			 * @name isDrawing
			 * @type {boolean}
			 */
			isDrawing = true;

			/** @property {function} beginPath Начинаем путь точно под мышкой */
			context.beginPath();

			/** @property {function} moveTo Устанавливаем координаты - куда рисовать */
			context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

		} // StartDrawing end

		/**
		 * @summary Рисует мышкой по холсту
		 * @name draw
		 * @type {function}
		 * @param {event} e mouseMove:mouseEvent Движение мыши
		 */
		function draw(e) {

			/** Если рисовать можно ... */
			if (isDrawing === true) {

				// FIXME Попробовать сделать Canvas резиновым (e.clientX)

				/**
				 * Запоминаем текущие координаты указателя мыши относительно документа
				 * clientX/clientY определило бы координаты относительно окна???????????
				 */

				/**
				 * @summary Запоминаем x-координату мыши
				 * @name x
				 * @type {number}
				 */
				var x = e.pageX - canvas.offsetLeft;

				/**
				 * @summary Запоминаем y-координату мыши
				 * @name y
				 * @type {number}
				 */
				var y = e.pageY - canvas.offsetTop;

				/** Рисуем куда запомнили */
				context.lineTo(x, y);
				context.stroke();
			}
		} // Draw end

		/**
		 * @summary Запрещаем рисование
		 * @name stopDrawing
		 * @type {function}
		 */
		function stopDrawing() {
			isDrawing = false;
		} // stopDrawing()

		/** Подключим требуемые для рисования события */

		/** @listen ondblclick:mouseEvent Начинает рисование мышкой */
		canvas.ondblclick = startDrawing;
		/** @listen onmouseup:mouseEvent Заканчивает рисование мышкой */
		canvas.onmouseup = stopDrawing;
		/** @listen onmouseup:mouseEvent Заканчивает рисует мышкой */
		canvas.onmousemove = draw;

	}; // Canvas/ Canvas in IN FRAME END

/*
 * ********************************************************* Java Script Валидация формы для регистрации **
 */

// BOOKMARK .......................................................... FORM VALIDATE

	/** Если формы открыты в браузере, а не во фрейме */
	if (window.parent.location.pathname !== '/doc/html5/frameset.html' && window.location.pathname === '/doc/html5/html5-forms.html') {

		/**
		 * @summary Форма для регистрации
		 * @name registrationForm
		 * @type {object}
		 */
		var registrationForm = document.querySelector('form[name="registrationForm"]'),
			/**
			 * @summary Поле для ввода имени
			 * @name name
			 * @type {object}
			 */
			name = document.querySelector('input[name="nameField"]'),
			/**
			 * @summary Поле для ввода телефона
			 * @name tel
			 * @type {object}
			 */
			tel = document.querySelector('input[name="phoneField"]'),
			/**
			 * @summary Поле для ввода почты
			 * @name email
			 * @type {object}
			 */
			email = document.querySelector('input[name="emailField"]'),
			/**
			 * @summary Cтатус заполнения полей
			 * @name progress
			 * @type {object}
			 */
			progress = document.querySelector('progress[name="progressField"]');

		/**
		 * @summary Количество корректно заполненных полей
		 * @name count
		 * @type {number}
		 */
		var count = 0;

// BOOKMARK Стилизация полей

		/**
		 * @summary Показывает корректно заполненное поле
		 * @name showValid
		 * @type {function}
		 * @param {object} element &lt;input&gt; с введенными данными
		 */
		function showValid(element) {
			element.style.border = '2px dashed green';
		};

		/**
		 * @summary Показывает некорректно заполненное поле
		 * @name showInValid
		 * @type {function}
		 * @param {object} element &lt;input&gt; с введенными данными
		 */
		function showInvalid(element) {
			element.style.border = '2px dashed red';
		};

		/**
		 * @summary Обновляет значение прогресса
		 * @name updateFormProgress
		 * @type {function}
		 * @param {number} count Количество коректно заполненных полей
		 */
		function updateFormProgress(count) {
			progress.value = Math.floor((100 / 70) * count);
		}

// BOOKMARK Проверка всех полей

		/**
		 * @summary Проверяет корректность заполнения всех полей
		 * @name checkField
		 * @type {function}
		 * @param {object} element &lt;input&gt; с введенными данными
		 * @param {string} regexp Паттерн для проверки
		 * @param {string} errorMessage Сообщение об ошибке для пользователя
		 * @description Сохраняем element и его значение в локальное хранилище
		 * Сравниваем содержимое поля с паттерном
		 * Если они равны ...
		 * Инкрементируем счетчик правильно заполненных полей
		 * Показываем корректно заполненное поле
		 * Иначе ...
		 * Показываем некорректно заполненное поле
		 */
		function checkField(element, regexp, errorMessage) {

			/**
			 * @summary Запоминаем значение поля в переменную
			 * @name value
			 * @type {string}
			 */
			var value = element.value;

			/**
			 * @summary Сохраняем input и значение в хранилище
			 * @name localStorage
			 * @type object
			 * @property {function} setItem Записывает содержимое &lt;inut&gt; в хранилище
			 */
			localStorage.setItem(element.name, value)

			/** Проверяем совпадение с регулярным выражением */
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
		 * @summary Проверяет корректность заполнения имени
		 * @name validName
		 * @type {function}
		 * @description Проверяем значение имени
		 * Если они равны ...
		 * Инкрементируем счетчик правильно заполненных полей
		 * Показываем корректно заполненное поле
		 * Иначе ...
		 * Показываем некорректно заполненное поле
		 */
		function validName() {

			/**
			 * @summary Запоминаем проверяемый элемент
			 * @name element
			 * @type {object}
			 */
			var element = this,
				/** И присваиваем соответствующее сообщение об ошибке */
				errMessage = 'Имя задано неверно';

			/** @summary Восстанавливаем введенную ранее в &lt;input&gt; информацию */
			if (!localStorage.getItem(element.name)) {

				/** Если в хранилище такого ключа нет */
				element.value = '';

			} else {
				/** Если есть , то записываем значение из хранилища в input */
				element.value = localStorage.getItem(element.name);
			}

			/**
			 * @summary Регулярное выражение для проверки
			 * @name regexp
			 * @type {string}
			 * @description Пропускаем только латинские или русские буквы
			 * и пробел между первым и вторым словом (если оно есть).
			 * Оба слова могут начинаться с большой буквы
			 */
            var regexp = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/;

			/** Запускаем проверку */
			checkField(element, regexp, errMessage);
		};

/* --------------------------------------------------------------- Проверяем корректность введенного телефона */

		/**
		 * @summary Проверяем введенный телефон
		 * @name validTel
		 * @type {function}
		 * @description Проверяем введенный телефон
		 * Если он корректный ...
		 * Инкрементируем счетчик правильно заполненных полей
		 * Показываем корректно заполненное поле
		 * Иначе ...
		 * Показываем некорректно заполненное поле
		 */
        function validTel() {

			/**
			 * @summary Запоминаем проверяемый элемент
			 * @name element
			 * @type {object}
			 */
			var element = this,
				/** И присваиваем соответствующее сообщение об ошибке */
				errorMessage = 'Номер задан неправильно';

			/**
			 * @summary Регулярное выражение для проверки
			 * @name regexp
			 * @type {string}
			 * @description Пропускаем номер строго в формате (012) 345-67-89
			 */
			var regexp = /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;

			/** Запускаем проверку */
			checkField(element, regexp, errorMessage);
		};

		/**
		 * @summary Проверяем введенную почту
		 * @name validEmail
		 * @type {function}
		 * @description Проверяем введенную почту
		 * Если все в порядке
		 * Инкрементируем счетчик правильно заполненных полей
		 * Показываем корректно заполненное поле
		 * Иначе ...
		 * Показываем некорректно заполненное поле
		 */
        function validEmail() {

			/**
			 * @summary Запоминаем проверяемый элемент
			 * @name element
			 * @type {object}
			 */
			var element = this,
				/** И присваиваем соответствующее сообщение об ошибке */
				errorMessage = 'Email задан неправильно';

			/**
			 * @summary Регулярное выражение для проверки
			 * @name regexp
			 * @type {string}
			 * @description Пропускаем до 15 символов a-z0-9_- перед собачкой,
			 * Также это может быть до 4 слов, разделенных точками.
			 * Затем собачка и имя домена (1 - 15 символов).
			 * Затем доменная зона - от 2 до 6 латинских букв
			 */
			var regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/;

			/** Запускаем проверку */
			checkField(element, regexp, errorMessage);
		};

		/**
		 * @summary Запрещает отправку данных из формы в оффлайне
		 * Данные в хранилище все равно будут сохраненны в хранилище
		 * во время валидации полей, которая сработает на onchange
		 * @name submitData
		 * @type {function}
		 */
		var submitData = function() {

			/** Если мы в оффлайне ... */
			if (!navigator.onLine) {
				return false;
			}
		}

/* --------------------------------------------------------------- Вешаем обработчики на проверяемые поля -- */

		/** Вешаем обработчики */
		/** @listen onchange:mouseEvent - Если изменится значение поля имени */
		if (name) name.onchange = validName;
		/** @listen onchange:mouseEvent - Если изменится значение поля ввода телефона */
		if (tel) tel.onchange = validTel;
		/** @listen onchange:mouseEvent - Если изменится значение поля ввода почты */
		if (email) email.onchange = validEmail;
		/** @listen submit:formEvent - В оффлайн режиме запрещаем submit */
		window.addEventListener('submit', submitData, false);
	} // FORM VALIDATE END

/*
 * ********************************************************* Java Script Media **
 */
// BOOKMARK .......................................................... MEDIA

	/** Если в браузере открыт плейер */
	if (window.parent.location.pathname !== "/doc/html5/frameset.html" && window.location.pathname === "/doc/html5/html5-media.html") {

/* --------------------------------------------------------------- Находим HTML5-плейер -- */

		/**
		 * @summary HTML5 плейер
		 * @name html5Video
		 * @type {object}
		 */
		var html5Video = document.querySelector('video');

/* --------------------------------------------------------------- Находим HTML5-кнопки -- */

		/**
		 * @summary Кнопка Play
		 * @name playButton
		 * @type {object}
		 */
		var playButton = document.getElementById('play');

		/**
		 * @summary Кнопка Pause
		 * @name pauseButton
		 * @type {object}
		 */
		var pauseButton = document.getElementById('pause');

		/**
		 * @summary Кнопка Stop
		 * @name stopButton
		 * @type {object}
		 */
		var stopButton = document.getElementById('stop');

		/**
		 * @summary Кнопка Mute
		 * @name muteButton
		 * @type {object}
		 */
		var muteButton = document.getElementById('mute');

		/**
		 * @summary Кнопка Faster
		 * @name fasterButton
		 * @type {object}
		 */
		var fasterButton = document.getElementById('faster');

		/**
		 * @summary Кнопка Slower
		 * @name slowerButton
		 * @type {object}
		 */
		var slowerButton = document.getElementById('slower');

		/**
		 * @summary Кнопка Normal Speed
		 * @name nsButton
		 * @type {object}
		 */
		var nsButton = document.getElementById('normalSpeed');

		/**
		 * @summary Текстовый показатель громкости
		 * @name volumeText
		 * @type {object}
		 */
		var volumeText = document.getElementById('volumeText');

		/**
		 * @summary Прогресс-Бар показывает длительность просмотра
		 * @name videoProgress
		 * @type {object}
		 */
		var videoProgress = document.getElementById('videoProgress');

/* --------------------------------------------------------------- Вешаем обработчики -- */

		/** @listen click:mouseEvent - Нажатие на кнопку Play */
		playButton.addEventListener('click', play);
		/** @listen click:mouseEvent - Нажатие на кнопку Pause */
		pauseButton.addEventListener('click', pause);
		/** @listen click:mouseEvent - Нажатие на кнопку Stop */
		stopButton.addEventListener('click', stop);
		/** @listen click:mouseEvent - Нажатие на кнопку Mute */
		muteButton.addEventListener('click', muteOrUnmute);
		/** @listen click:mouseEvent - Нажатие на кнопку Faster */
		fasterButton.addEventListener('click', speedUp);
		/** @listen click:mouseEvent - Нажатие на кнопку Slower */
		slowerButton.addEventListener('click', slowDown);
		/** @listen click:mouseEvent - Нажатие на кнопку Normal Speed */
		nsButton.addEventListener('click', normalSpeed);
		/** @listen change:mouseEvent - Изменение значения ProgressBar */
		volumeCtrl.addEventListener('change', updateVolume);

		/** @listen change:mediaElement - Изменение времени просмотра */
		html5Video.addEventListener('timeupdate', updateVideoProgress);

/* --------------------------------------------------------------- Определяем функции -- */

		/**
		 * @summary Начать просмотр
		 * @name play
		 * @type {function}
		 */
		function play() {
			html5Video.play();
		}

		/**
		 * @summary Приостановить просмотр
		 * @name pause
		 * @type {function}
		 */
		function pause() {
			html5Video.pause();
		}

		/**
		 * @summary Остановить просмотр
		 * @name stop
		 * @type {function}
		 */
		function stop() {

			/** @property {function} pause Останавливаем просмотр */
			html5Video.pause();
			/** @property {number} currentTime Обнуляем время */
			html5Video.currentTime = 0;
		}

		/**
		 * @property {function} volumechange  Изменение громкости
		 * @param {event} e change:mediaEvent Изменение громкости
		 */
		html5Video.volumechange = function(e) {

			/** @property {boolean} value Запоминаем в кнопку есть звук или нет */
			muteButton.value = html5Video.muted ? 'Muted' : 'Unmuted';

			/** @property {string} value Передаем значение в ползунок */
			volumeCtrl.value = html5Video.volume;
		}

		/**
		 * @summary Если звук включен - тогда выключает и наоборот
		 * @name muteOrUnmute
		 * @type {function}
		 */
		function muteOrUnmute() {
			html5Video.muted = !html5Video.muted;
		}

		/**
		 * @summary Приравнивает высоту звука к положению ползунка
		 * @name updateVolume
		 * @type {function}
		 */
		function updateVolume() {

			// FIXME Volume Text выводится с дикими 8-ю цифрами после запятой

			/** @property volume Уровень звука видео равен положению ползунка */
			html5Video.volume = volumeCtrl.value;
			/** @property value Показывает цифровое значение высоты звука */
			volumeText.value = volumeCtrl.value;
		}

		/**
		 * @summary Ускорение просмотра
		 * @name speedUp
		 * @type {function}
		 */
		function speedUp() {

			/** @property {function} play Проигрывание видео */
			html5Video.play();
			/** @property {number} playbackRate Индекс скорости просмотра */
			html5Video.playbackRate += 0.5;
		}

		/**
		 * @summary Замедление скорости просмотра
		 * @name slowDown
		 * @type {function}
		 */
		function slowDown() {

			/** @property {function} play Проигрывание видео */
			html5Video.play();
			/** @property {number} playbackRate Индекс скорости просмотра */
			html5Video.playbackRate -= 0.5;
		}

		/**
		 * @summary Нормальная скорость просмотра
		 * @name normalSpeed
		 * @type {function}
		 */
		function normalSpeed() {

			/** @property {function} play Проигрывание видео */
			html5Video.play();
			/** @property {number} playbackRate Индекс скорости просмотра */
			html5Video.playbackRate = 1;
		}

		// FIXME Попытка округлить показатель высоты звука в прогресс оказалась неудачной
		/**
		 * @summary Рассчет цифрового значения уровня звука
		 * @name updateVideoProgress
		 * @type {function}
		 */
		function updateVideoProgress() {

			/** @property value Уровень звука в progressBar */
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

	/**
	 * @summary - Кнопка TryIT
	 * @type {object}
	 * @listens click:MouseEvents
	 *
	 * @description - Запускает содержимое кодовой строки на выполнение в eval
	 */
	$('#runButton').click(function() {

		/**
		 * @summary Переменная для строки кода
		 * @name code
		 * @type {string}
		 */
		var code = '';
		code = window.parent.$('#codeString').val();
		eval('window.parent.' + code);
	});

	/**
	 * @summary - Кнопка Reload
	 * @type {object}
	 * @listens click:MouseEvents
	 *
	 * @description - Перезагружает окно браузера
	 */
	$('#reloadButton').click(function() {

		/**
		 * @summary Переменная для строки кода
		 * @name code
		 * @type {string}
		 */
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
/**
 * @summary CSS and JavaScript loader *
 * @returns {object} Modernizr
 * @see {@link http://modernizr.com/docs/#installing} for more details
 */
Modernizr.load([
	{
		/**
		 * @summary Проверка поддержки summary в браузере
		 * @property {function} test - Проверяет поддержку HTML5 и CSS3 возможностей
		 */
		test: Modernizr.summary,

		// FIXME - Проверить работает ли вообще это чудо-диво
		/**
		 * @summary Если поддержки нет, то ищем полифилл здесь
		 * @property {function} nope - Загружает указанный скрипт
		 */
		nope: ['../../js/vendor/logifill-details-min.js']
	}
]);
