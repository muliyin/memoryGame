/*
 * 创建一个包含所有卡片的数组
 */
let moves = 0;  /*记录总移动数*/
let openCard1;  /*翻开的卡片1*/
let openCard2;  /*翻开的卡片2*/
let cardIcon1;  /*翻开卡片1的图标*/
let cardIcon2;  /*翻开卡片2的图标*/
let count = 0;  /*翻开卡片计数*/
let matchedCount = 0;/*记录翻开的卡片对数*/
let totalTime = 0;  /*记录总时长*/
let begin = false;   /*判断用户是否开始游戏*/
let startTime;
let windowLeft = (screen.width - 300)/2;    /*弹出窗口左边距*/
let windowTop = (screen.height - 250)/2;    /*弹出窗口上边距*/

/*刷新页面重新开始游戏*/
function restartGame() {
	window.location.reload();
}

/*洗牌，对图标数组进行洗牌，赋值给页面上的卡片*/
function changeCard() {
	/*存放一组图标*/
	let cardsOptions = ['icon-magic', 'icon-camera', 'icon-food', 'icon-gift', 'icon-coffee', 'icon-key', 'icon-github', 'icon-google-plus'];
	/*复制图标，存放两组图标*/
	cardsOptions = [...cardsOptions, ...cardsOptions];
	/*调用洗牌函数*/
	shuffle(cardsOptions);
	let allCards = document.querySelectorAll('.deck i');
	/*把图标依次赋给卡片*/
	for (let item of allCards) {
		item.className = cardsOptions.shift();
	}
}

changeCard();
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

function ccc() {
	alert('游戏暂停中，请继续');
}

/*合上卡片*/
function closeCard() {
	/*有两张卡片翻开时设计不可点击*/
	begin = false;
	/*翻开卡片数重置为0*/
	count = 0;
	/*判断翻开卡片的图标是否一致，不一致延迟1.5s合上卡片*/
	if (cardIcon1 !== cardIcon2) {
		setTimeout(function () {
			openCard1.classList.remove('open','show');
			openCard2.classList.remove('open','show');
			/*恢复点击*/
			begin = true;
		}, 1500)
	} else {
		begin = true;
		openCard1.classList.remove('open','show');
		openCard2.classList.remove('open','show');
		openCard1.classList.add('match');
		openCard2.classList.add('match');
		/*一致则记录*/
		matchedCount ++;
		if (matchedCount === 8){
			sessionStorage.setItem('totalMove',JSON.stringify(moves));
			sessionStorage.setItem('totalTime',JSON.stringify(document.querySelector('#game .time').textContent));
			win();
			/*清除计时器*/
			clearInterval(startTime);
		}
	}
}

/*点击卡片的监听事件*/
function clickCard(event) {
	if (begin === true){
		let target = event.target;
		/*根据计数count判断现在翻开的是第一张还是第二张牌*/
		if (count === 0) {
			openCard1 = target;
			cardIcon1 = openCard1.childNodes[1].className
		} else if (count === 1) {
			openCard2 = target;
			cardIcon2 = openCard2.childNodes[1].className
		}
		/*判断点击的是否为li卡片，以及卡片是否为合上状态*/
		if (target.nodeName === 'LI' && target.classList.length === 1) {
			/*li增加class，卡片处于翻开状态*/
			target.classList.add('open','show');
			count += 1;
			if (count === 2 ){
				moves++;
			}
			document.querySelector('#game .moves').textContent = moves;
		}
		if (count === 2) {
			closeCard();
			if (moves === 12 || moves === 20){
				removeStars();
			}
		}
	}

}

/*游戏成功*/
function win() {
	window.open('win.html','newwindow','height = 250, width = 300, left = '+windowLeft+',top = '+windowTop+',toolbar = no, menubar = no, scrollbars = no, resizable = no, location = no, status = no');
}

/*展示游戏结果*/
function showResults() {
	document.querySelector('#totalMove').textContent = JSON.parse(sessionStorage.getItem('totalMove'));
	document.querySelector('#totalTime').textContent = JSON.parse(sessionStorage.getItem('totalTime'));
	let totalMove = JSON.parse(sessionStorage.getItem('totalMove'));
	if (totalMove > 19){
		document.querySelector('#totalStars').firstElementChild.remove();
		document.querySelector('#totalStars').firstElementChild.remove();
	} else if (totalMove > 11){
		document.querySelector('#totalStars').firstElementChild.remove();
	}
}

/*移除星星*/
function removeStars() {
	document.querySelector('#game .stars').firstElementChild.remove();
}

/*计时器*/
function startCountTime(){
	document.querySelector('#game .time').textContent ++;
}

/*整个卡片区域增加click监听*/
let cards = document.querySelector('.deck');
cards.addEventListener('click', clickCard);

/*再玩一次*/
function playAgain(){
	window.close();
	opener.location.reload();
}

/*退出游戏*/
function outGame() {
	window.close();
}

/*判断游戏状态是否为开始*/
function checkBegin() {
	if (begin === false) {
		document.querySelector('.start').setAttribute('disabled',true);
		console.log(document.querySelector('.start').attributes);
		startTime = setInterval(startCountTime,1000);
	}
	begin = true;
}