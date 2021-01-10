window.addEventListener("DOMContentLoaded", () => {
	//// Tabs

	const tabs = document.querySelectorAll(".tabheader__item"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabsParent = document.querySelector(".tabheader__items");

	function hideTabsContent() {
		tabsContent.forEach((item) => {
			item.style.display = "none";
		});

		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabsContent(i = 0) {
		tabsContent[i].style.display = "block";
		tabsContent[i].classList.add("fade");
		tabs[i].classList.add("tabheader__item_active");
	}

	hideTabsContent();
	showTabsContent();
	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});

	////Timer

	const deadline = "2021-12-31";

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(".timer", deadline);

	//Modal

	const modalTrigger = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal"),
		modalCloseBtn = document.querySelector("[data-close]");

	function openModal() {
		modal.style.display = "block";
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach((item, index) => {
		item.addEventListener("click", () => {
			openModal();
		});
	});

	function closeModal() {
		modal.style.display = "none";
	}

	modalCloseBtn.addEventListener("click", () => {
		closeModal();
	});

	modal.addEventListener("click", (event) => {
		if (event.target == modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.code === "Escape") {
			closeModal();
		}
	});

	////Auto
	const modalTimerId = setTimeout(openModal, 10000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);

	////Food menu
	class FoodMenu {
		constructor(src, alt, title, descr, price, parent) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parent);
		}

		render() {
			const element = document.createElement("div");
			element.classList.add('menu__item');
			element.innerHTML = `
			<div class ="menu__item">
				<img src =${this.src} alt=${this.alt}>
				<h3 class ="menu__item-subtitle">${this.title}</h3> 
				<div class ="menu__item-descr">${this.descr}</div> 
				<div class ="menu__item-divider"></div> 
				<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div> 
				<div class="menu__item-total"><span>${this.price}</span> грн/день </div> 
				</div> 
			</div>
			`;
			this.parent.append(element);
		}
	}

	const cardOne = new FoodMenu(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт оптимальной ценой и высоким качеством!',
		'229',
		'.menu .container'
	);
	cardOne.render();

	const cardTwo = new FoodMenu(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		550,
		'.menu .container'
	);
	cardTwo.render();

	const cardThree = new FoodMenu(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		430,
		'.menu .container'
	);
	cardThree.render();

});