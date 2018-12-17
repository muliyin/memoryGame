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
	/*翻开卡片数重置为0*/
	count = 0;
	/*判断翻开卡片的图标是否一致，不一致延迟1.5s合上卡片*/
	if (cardIcon1 !== cardIcon2) {
		setTimeout(function () {
			openCard1.classList.remove('open');
			openCard2.classList.remove('show');
			openCard2.classList.remove('open');
			openCard1.classList.remove('show');
		}, 1500)
	} else {
		/*一致则记录*/
		matchedCount ++;
		if (matchedCount === 8){
			/*清除计时器*/
			clearInterval(startTime);
		}
	}
}

/*点击卡片的监听事件*/
function clickCard(event) {
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
		target.classList.add('open');
		target.classList.add('show');
		moves++;
		count += 1;
		document.querySelector('#game .moves').textContent = moves;
	}
	if (count === 2) {
		closeCard();
		if (moves === 24 || moves === 40){
			removeStars();
		}
	}
}

/*游戏成功*/
function win() {

	window.open('win.html','newwindow','height = 400, width = 600, top = 100, left = 400, toolbar = 0, menubar = 0, scrollbars = 0, resizable = no, location = no, status = no');


}

function showResults() {
	document.querySelector('#totalMove').textContent = moves;
	document.querySelector('#totalTime').textContent = document.querySelector('.time').textContent;
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

