
/* TABS 
================================================================================*/

window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items')

          function hideTabContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
          }
        function showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add('tabheader__item_active');
        }
        
        hideTabContent();
        showTabContent();
       // console.log(event.target);
        tabsParent.addEventListener('click', (event) =>{
            const target = event.target;
           
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                 if (target == item) {
                     hideTabContent();
                     showTabContent(i);
                 }
                })
            }
 
            });
            /* TIMER
================================================================================*/

      const deadLine = '2021-09-21';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds       
         };
        }

         function getZero(num) {
             if(num >= 0 && num < 10) {
                 return  `0${num}`;
             } else {
                 return num
             }
         }
   

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
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
    setClock('.timer', deadLine);


    /* MODAL 
    =========================================================*/
     //  modal.classList.add('hide');
           // modal.classList.remove('show');
            //   modal.classList.add('show');
                //   modal.classList.remove('hide');

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


          function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }

          modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal);
          });
          

          function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        modal.addEventListener('click',(e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') { 
               closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }
          const modalTimerId = setTimeout(openModal, 50000);

          window.addEventListener('scroll', showModalByScroll);

          /* Использование классов для карточек
====================================================== */
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) { // получаем параметры
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH(); 
    }

    changeToUAH() {
        this.price = this.price * this.transfer; 
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = ` // создаем верстку
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}

new MenuCard(   // помещаем на страницу
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render();


/* База данных 
=======================================================*/


const forms = document.querySelectorAll('form');
    const message = {
        loading: '../img/slider/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { //  перебор форм 
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {  // submit - событие при нажатии
            e.preventDefault();

            let statusMessage = document.createElement('img'); //Добавляю элемент для оповещения пользователя
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = `                 // (наверху) оповещение пользователя
            display: block;
            margin:0 auto;
            `;                               
            
            form.insertAdjacentElement('afterend', statusMessage); // подсталяю класс
        
           

           // Трансформация в JSON
            const formData = new FormData(form);  //определенная форма для общения с бэком

             const object = {};
            formData.forEach(function(value, key){ // сформироваои обьект при помощи перебора для конвертации JSON
                object[key] = value;
           });
           

            fetch('server.php', {    // куда отправить данные
                method: 'POST',          // каким образом
                 headers: {                                     //заголовок для отпрвку на JSON
                    'Content-type':'application/json'
                }, 
                body:JSON.stringify(object)  // что отправить
            })
            .then(data => {  // дата это атрибут который стоит указывать (Fromdata)
                console.log(data);
                showThanksModal(message.success);  // показываем если данные отправились
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure); // в случае неудачи отправки данных
            }).finally(() => {
                form.reset();   //не обязательно выполнять (в данный мрент нужно)
            })
        });
    }

    function showThanksModal(message) {  // Создаем доп. модальное окно
        const prevModalDialog = document.querySelector('.modal__dialog'); // для вывода благодарности за форму

        prevModalDialog.classList.add('hide'); // скрываем модалку
        openModal(); // функция топит за открытие модальных окон

        const thanksModal = document.createElement('div'); // замена модальных окон
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `    
        <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
`;

        document.querySelector('.modal').append(thanksModal); // добавляем все на страницу
        setTimeout(() =>{ 
            thanksModal.remove();// удаляем проделаную работу 
            prevModalDialog.classList.add('show'); 
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }; 

    /* Slider
    ======================================= */

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next= document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

        let slideIndex = 1;
        let offset = 0; // отступ

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else{
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length + '%'; // ширина нашего слайда
        slidesField.style.display = 'flex'; // записывем свойства для слайдера
        slidesField.style.transition = '0.9s all';

        slidesWrapper.style.overflow = 'hidden' // скрываем невидимые фото
        
        slides.forEach(slide => {
            slide.style.width = width; // все слайды одинаковой ширины
        });

        slider.style.position = 'relative';

        const indicators = document.createElement('ol');
        dots = [];

        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = ` 
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
        slider.append(indicators);

        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1); // указываем к какомуц слайду будет отгосится
            dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
            if( i == 0) { // первая точка
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);  // для синхронизации точки со слайдом
        }

        next.addEventListener('click', () => {
            if(offset == +width.slice(0, width.length -2) * (slides.length - 1)) { // '500px' // убираем 'px'
                offset = 0;
            } else {
                offset += +width.slice(0, width.length -2) // когда нажимаем вперед добавляется сдлайд  идет смещение
            };
            slidesField.style.transform = `translateX(-${offset}px)`// сдвигаем слайд
            if(slideIndex == slides.length) { // работа с цифрами 
                slideIndex = 1; 
            } else {
                slideIndex++;
            }

            if(slides.length < 10) {  // работа с цифрами 
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');  // синхронизируем точки со слайдом
            dots[slideIndex - 1].style.opacity = '1';
        });
        prev.addEventListener('click', () => {
            if(offset == 0) { // поменяли 
                offset = +width.slice(0, width.length -2) * (slides.length - 1)
            } else {
                offset -= +width.slice(0, width.length -2) // когда нажимаем вперед отнимаем сдлайд  идет смещение
            };
            slidesField.style.transform = `translateX(-${offset}px)`// сдвигаем слайд

            if(slideIndex == 1) { // работа с цифрами 
                slideIndex = slides.length; 
            } else {
                slideIndex--;
            }
            if(slides.length < 10) {  // работа с цифрами 
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';  // синхронизируем точки со слайдом

        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => { // Приводим точки в функционал
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = +width.slice(0, width.length -2) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;
 
                if(slides.length < 10) {  // работа с цифрами 
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = '1';

            });
        });

        // вариант 1

      /*   showSlides(slideIndex); // вызывем функцию
        // работа на цтфрамии
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else{
            total.textContent = slides.length;
        }

        function showSlides(n) {    // делаем слайд loop
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            // скрываем слайд
            slides.forEach((item) => item.style.display = 'none');

            slides[slideIndex - 1].style.display = 'block'; // показывем нужный слацд // обязательно -1
            
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else{
                current.textContent = slideIndex;
            }
        }

            // изменяем на 1 единицу 
        function plusSlides(n) {
            showSlides(slideIndex += n) 
        };
        prev.addEventListener('click', function(){
            plusSlides(-1);
        });
    
        next.addEventListener('click', function(){
            plusSlides(1);
        }); */

        

});
 





