/*
* *********************************************************************************************Polifills
*/




/* 
* ********************************************************* Java Script Валидация формы для регистрации **
*/

window.onload = function() {
	
	var registrationForm = document.querySelector('form[name="registrationForm"]'),
		name = registrationForm.querySelector('input[name="nameField"]'),		
		tel = registrationForm.querySelector('input[name="phoneField"]'),		
		email = registrationForm.querySelector('input[name="emailField"]'),
		progress = registrationForm.querySelector('progress[name="progressField"]');
		
	var count = 0;
	
	/* ------------------------------------------------ Стилизация заполненных полей -- */
	
	/* Показываем некорректно заполненное поле */
	function showValid(element) {		
		element.style.border = '2px dashed green';		
	};
	
	/* Показываем корректно заполненное поле */
	function showInvalid(element) {
		element.style.border = '2px dashed red';	
	};
	
	/* Обновляем значение progress */
	function updateProgress(count) {
		progress.value = Math.floor((100 / 70) * count);
	}
	
	/* ------------------------------------------------ Общая функция проверки полей -- */
	
	/* Проверяем корректность заполнения полей */
	function checkField(element, regexp, errorMessage) {
		
		var value = element.value;
		
		/* Совпадение с регулярным выражением */
		if (regexp.test(value)) {					
			showValid(element);
			
			// Инкрементируем счетчик правильных ответов
			count++;			
			// Обновляем значение progres
			updateProgress(count);
			
		} else {
			showInvalid(element);
		}
	};
	
	/* ------------------------------------------------ Проверяем поля по отдельности -- */
	
	/* ....................................... Проверяем корректность заполнения имени */
	
	function validName() {
		
		var element = this,
			errMessage = 'Имя задано неверно';
		
		// Пропускаем только латинские или русские буквы и пробел между первым и вторым словом 
		// (если второе слово есть). Оба слова могут начинаться с большой буквы
		var regexp = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/;
		
		// Запускаем проверку
		checkField(element, regexp, errMessage);
	};
	
	/* ..................................... Проверяем корректность введенного телефона */
	
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
	
	/* ------------------------------------------------ Вешаем обработчики на проверяемые поля -- */
	
	/* Вешаем обработчики */
	if(name) name.onchange = validName;
	if(tel) tel.onchange = validTel;
	if(email) email.onchange = validEmail;
	
	/* ------------------------------------------------ Обновляем значение прогресс -- */
	
};

/* 
* *********************************************************  **
*/

// Give Modernizr.load a string, an object, or an array of strings and objects
Modernizr.load([
	// Presentational polyfills
	{
		// Logical list of things we would normally need
		test: Modernizr.summary,
	 
		// Modernizr.load loads css and javascript by default
		nope : ['../../js/vendor/logifill-details-min.js']
	} 
]);
