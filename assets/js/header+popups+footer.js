
function AddBurgerListener(burger, menu) {
	burger.addEventListener('click', ()=>{
		if (burger.classList.contains('active'))
			menu.style = '';
		else
			menu.style = 'max-height: ' + menu.scrollHeight + 'px';
		burger.classList.toggle('active');
	});
	window.addEventListener('resize', ()=>{burger.classList.remove('active');menu.style = '';}, {passive: true})
}

AddBurgerListener(document.querySelector('.menu-burger'), document.querySelector('.lnavigation-wrap .lnavigation-wrap-main'))
AddBurgerListener(document.querySelector('.lfixed__menu .burger'), document.querySelector('.lnavigation-wrap-main_fixed'))

function hidepopup() {
	let popup = document.querySelector('.popup.open');
	popup.classList.remove('open');
	setTimeout(() => popup.classList.remove('sending'), 300);
	popup.querySelector('.load').classList.remove('accept', 'error');
}

document.querySelectorAll('.close-popup, .load__ok').forEach(btn=>btn.addEventListener('click', hidepopup));

document.querySelectorAll('.popuplink').forEach(link=>link.addEventListener('click',(e)=>{
	e.preventDefault();
	let popup = document.querySelector(link.getAttribute('href'));
	if (popup.id == 'promotion') pselect.value = ucFirst(promotionnames[promotionlinks.findIndex(el=>el==link)]);
	if (popup.id == 'tariff') tselect.value = ucFirst(tarifnames[tariflinks.findIndex(el=>el==link)]);

	popup.classList.add('open'); 
}));

document.querySelectorAll('.popup').forEach(popup=>popup.addEventListener('click', hidepopup));
document.querySelectorAll('.popup__content').forEach(popup=>popup.addEventListener('click', (e)=>e.stopPropagation()));

let popupmenu = document.querySelector('.lfixed__menu');
pageYOffset>200?popupmenu.classList.add('fixed'):popupmenu.classList.remove('fixed');
window.addEventListener('scroll', ()=>pageYOffset>200?popupmenu.classList.add('fixed'):popupmenu.classList.remove('fixed'), {passive: true});

function showerror(el,code) {
	el.classList.add('error');
	console.log(code);
	el.querySelector('.load__error .load__message').innerHTML = 'Что-то пошло не так.<br>Код ошибки: ' + code;
}

function send(event, php, formtype){
	event.preventDefault();
	let popup = document.querySelector('.popup.open'), content = popup.querySelector('.popup__content'), load = popup.querySelector('.load');
	
	content.style.setProperty('height', content.scrollHeight + 'px');
	requestAnimationFrame(()=>popup.classList.add('sending'));
	
	let data = new FormData(event.target);
	data.append('formtype', formtype);

	fetch(php, { method: 'POST', body: data })
	.then(response => response.ok?load.classList.add('accept'):showerror(load,response.status))
	.catch(error => showerror(load,error));

}

document.querySelectorAll('.load__repeat').forEach(btn=>btn.addEventListener('click', ()=>{
	let popup = document.querySelector('.popup.open'), form = popup.querySelector('form'), load = popup.querySelector('.load');
	load.classList.remove('error');
	form.dispatchEvent(new Event('submit'));
}))

