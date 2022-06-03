var tg = new Vue({
	el:'#tg',
      	data:{
        	message:'Напишите сейчас!'
      	}
});
var vk = new Vue({
	el:'#vk',
      	data:{
        	message:'Напишите сейчас!'
      	}
});
var gmail = new Vue({
      	el:'#gmail',
      	data:{
        	message:'Напишите сейчас!'
      	}
});
var github = new Vue({
      	el:'#github',
      	data:{
        	message:'Оцените профиль!'
      	}
});
var launchpad = new Vue({
      	el:'#launchpad',
      	data:{
        	message:'Оцените профиль!'
      	}
});

var down = new Vue({
      	el:'#down_drop',
      	data:{
        	message:'Показать контакты!'
      	},
	methods:{
	down_drop: function (event){
		el = document.querySelector('footer');
		el.scrollIntoView({behavior: 'smooth'});
    		}
  	}
});
var preloader = new Vue({
	el: '.preloader',
	data: {
	seen: true
	},
});

var titles = ["Нейронные сети", "PictureInPicture", "TonKloud"];
var text = ["Разработанный мною проект по обучению нейронных сетей занял первые места в ряде региональных научно-практических конференций.", "Простая утилита для трансляции камеры в режиме 'Картинка в картинке'. В планах использование нейронных сетей.", "Запущено частное облачное хранилище. Этот проект показал, что даже маломощные системы могут приносить пользу при грамотном использовании."];
var links = ["https://ai.ivanvit.ru", "https://pip.ivanvit.ru", "http://cloud.ivanvit.ru/index.php/s/wTiYZbFwrEZWxDf"];

function getRandomInt(max){
	return Math.floor(Math.random() * max);
}
var card1 = getRandomInt(titles.length);
do{
	var card2 = getRandomInt(titles.length);
}while(card1 == card2);
do{
	var card3 = getRandomInt(titles.length);
}while(card1 == card3 || card2 == card3);
var card1 = new Vue({
	el: '#card1',
	data:{
		title: titles[card1],
		text: text[card1],
		link: links[card1]
	}
});
var card2 = new Vue({
	el: '#card2',
	data:{
		title: titles[card2],
		text: text[card2],
		link: links[card2]
	}
});
var card3 = new Vue({
	el: '#card3',
	data:{
		title: titles[card3],
		text: text[card3],
		link: links[card3]
	}
});